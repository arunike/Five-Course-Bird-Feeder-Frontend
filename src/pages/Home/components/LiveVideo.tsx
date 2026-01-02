import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, List } from 'antd';
// @ts-ignore
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// @ts-ignore
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';

interface LiveVideoProps {
    onBirdDetected?: (prediction: any) => void;
}

const LiveVideo: React.FC<LiveVideoProps> = ({ onBirdDetected }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const [isStreaming, setIsStreaming] = useState(false);
    const [useRecorded, setUseRecorded] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string>("");
    const [videoList, setVideoList] = useState<any[]>([]);
    const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
    const [speciesModel, setSpeciesModel] = useState<mobilenet.MobileNet | null>(null);

    const fetchVideoList = () => {
        fetch('http://localhost:8080/api/v1/video/list')
            .then(res => res.json())
            .then(data => setVideoList(data))
            .catch(err => console.error("Error fetching video list:", err));
    };

    // Load Models
    useEffect(() => {
        const loadModels = async () => {
            try {
                console.log("Loading COCO-SSD model...");
                const loadedModel = await cocoSsd.load();
                setModel(loadedModel);
                console.log("COCO-SSD loaded.");

                console.log("Loading MobileNet model...");
                const loadedSpeciesModel = await mobilenet.load();
                setSpeciesModel(loadedSpeciesModel);
                console.log("MobileNet loaded.");
            } catch (err) {
                console.error("Failed to load models:", err);
            }
        };
        loadModels();
    }, []);

    // Detection Loop
    useEffect(() => {
        if (!isStreaming || !model || !videoRef.current || useRecorded) return;

        let animationId: number;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        const detectFrame = async () => {
            if (video.readyState === 4 && canvas) {
                // Resize canvas to match video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                try {
                    const threshold = parseFloat(localStorage.getItem('detectionThreshold') || '0.6');
                    const predictions = await model.detect(video, undefined, threshold);

                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        const font = "16px sans-serif";
                        ctx.font = font;
                        ctx.textBaseline = "top";

                        // We can't use forEach with async nicely, so use normal loop
                        for (const prediction of predictions) {
                            const [x, y, width, height] = prediction.bbox;

                            // Check for bird
                            if (prediction.class === 'bird' && prediction.score > 0.6) {
                                let labelText = prediction.class;

                                // CLASSIFY SPECIES
                                if (speciesModel) {
                                    try {
                                        const tensor = tf.browser.fromPixels(video);
                                        const startY = Math.max(0, Math.floor(y));
                                        const startX = Math.max(0, Math.floor(x));
                                        const cropHeight = Math.min(video.videoHeight - startY, Math.floor(height));
                                        const cropWidth = Math.min(video.videoWidth - startX, Math.floor(width));

                                        if (cropHeight > 0 && cropWidth > 0) {
                                            const cropped = tensor.slice([startY, startX, 0], [cropHeight, cropWidth, 3]);

                                            // @ts-ignore
                                            const speciesPreds = await speciesModel.classify(cropped);
                                            if (speciesPreds && speciesPreds.length > 0) {
                                                labelText = `${speciesPreds[0].className.split(',')[0]} (${Math.round(speciesPreds[0].probability * 100)}%)`;
                                                prediction.class = speciesPreds[0].className.split(',')[0];
                                                prediction.score = speciesPreds[0].probability;
                                            }
                                            cropped.dispose();
                                        }
                                        tensor.dispose();
                                    } catch (err) {
                                        // Silent fail
                                        console.error("Species prediction error:", err);
                                    }
                                }

                                ctx.strokeStyle = "#00FFFF";
                                ctx.lineWidth = 4;
                                ctx.strokeRect(x, y, width, height);

                                // Draw Label
                                ctx.fillStyle = "#00FFFF";
                                const textWidth = ctx.measureText(labelText).width;
                                ctx.fillRect(x, y, textWidth + 4, 20);
                                ctx.fillStyle = "#000000";
                                ctx.fillText(labelText, x, y);

                                if (onBirdDetected) {
                                    onBirdDetected(prediction);
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.error("Detection error:", e);
                }
            }
            animationId = requestAnimationFrame(detectFrame);
        };

        detectFrame();

        return () => {
            cancelAnimationFrame(animationId);
            const ctx = canvas?.getContext('2d');
            ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
        };
    }, [isStreaming, model, speciesModel, useRecorded, onBirdDetected]);

    // Fetch recorded video URL/List from backend
    useEffect(() => {
        if (useRecorded) {
            fetchVideoList();

            if (!recordedVideoUrl) {
                fetch('http://localhost:8080/api/v1/video/latest')
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.url) {
                            setRecordedVideoUrl(data.url);
                        }
                    })
                    .catch(err => console.error("Error fetching recorded video:", err));
            }
        }
    }, [useRecorded]);

    // Webcam Logic
    useEffect(() => {
        if (useRecorded) return;

        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsStreaming(true);
                }
            } catch (err) {
                console.error("Error accessing webcam:", err);
                setUseRecorded(true);
            }
        };

        startVideo();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [useRecorded]);

    const toggleSource = () => {
        setUseRecorded(!useRecorded);
        setIsStreaming(false);
    };

    const startRecording = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });

                // Upload to backend
                const formData = new FormData();
                formData.append("file", blob, `recording_${Date.now()}.webm`);

                fetch('http://localhost:8080/api/v1/video/upload', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Video uploaded successfully");
                            alert("Video uploaded to backend!");
                            setUseRecorded(true);
                            setRecordedVideoUrl("");
                            fetchVideoList();
                        } else {
                            console.error("Upload failed");
                        }
                    })
                    .catch(err => console.error("Error uploading:", err));
            };

            mediaRecorder.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleDelete = (filename: string) => {
        if (confirm(`Are you sure you want to delete ${filename}?`)) {
            fetch(`http://localhost:8080/api/v1/video/delete/${filename}`, { method: 'GET' })
                .then(res => {
                    if (res.ok) {
                        fetchVideoList();
                        if (recordedVideoUrl.includes(filename)) {
                            setRecordedVideoUrl("");
                        }
                    } else {
                        alert("Failed to delete video");
                    }
                })
                .catch(err => console.error("Error deleting:", err));
        }
    };

    const handlePlay = (url: string) => {
        setRecordedVideoUrl(url);
    };

    return (
        <Card title={useRecorded ? "Recorded Video Library" : "Live Bird Feeder Stream"} bordered>
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto', aspectRatio: '16/9', background: '#000' }}>
                {useRecorded ? (
                    <video
                        key={recordedVideoUrl}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
                        src={recordedVideoUrl}
                        controls
                        autoPlay
                    />
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <canvas
                            ref={canvasRef}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        />
                        {!model || !speciesModel ? (
                            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '2px 5px', fontSize: '10px' }}>
                                Loading Models...
                            </div>
                        ) : (
                            <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '2px 5px', fontSize: '10px' }}>
                                System Ready
                            </div>
                        )}
                        {isRecording && (
                            <div style={{ position: 'absolute', top: 10, right: 10, background: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold', animation: 'pulse 1s infinite' }}>
                                REC
                            </div>
                        )}
                    </>
                )}
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button onClick={toggleSource}>
                    Switch to {useRecorded ? "Live Stream" : "Recorded Video"}
                </Button>

                {!useRecorded && (
                    !isRecording ? (
                        <Button onClick={startRecording} danger type="primary">
                            Start Recording
                        </Button>
                    ) : (
                        <Button onClick={stopRecording} danger>
                            Stop Recording
                        </Button>
                    )
                )}
            </div>

            {useRecorded && (
                <div style={{ marginTop: '1rem' }}>
                    <h4>My Recordings</h4>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', padding: '5px' }}>
                        {videoList.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#999' }}>No recordings yet.</p>
                        ) : (
                            videoList.map((vid: any) => (
                                <div key={vid.filename} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px', borderBottom: '1px solid #f0f0f0' }}>
                                    <span
                                        style={{ cursor: 'pointer', color: recordedVideoUrl === vid.url ? 'blue' : 'black', fontWeight: recordedVideoUrl === vid.url ? 'bold' : 'normal' }}
                                        onClick={() => handlePlay(vid.url)}
                                    >
                                        {vid.filename}
                                    </span>
                                    <div>
                                        <Button size="small" type="link" onClick={() => handlePlay(vid.url)}>Play</Button>
                                        {localStorage.getItem('role') === 'admin' && (
                                            <Button size="small" danger type="text" onClick={() => handleDelete(vid.filename)}>Delete</Button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
};

export default LiveVideo;
