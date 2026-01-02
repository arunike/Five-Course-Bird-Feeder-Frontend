import React, { memo, useState, useCallback, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouterProps } from 'react-router-dom';
import LiveVideo from './components/LiveVideo';
import ObservationsSummary from './components/ObservationsSummary';

interface Observation {
  id: number;
  species: string;
  time: string;
  count: number;
  timestamp?: number;
  username?: string;
}

const HomePage: React.FC<BrowserRouterProps> = () => {
  const [observations, setObservations] = useState<Observation[]>([]);

  // Fetch observations from backend on load
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/observations/list')
      .then(res => res.json())
      .then(data => setObservations(data))
      .catch(err => console.error("Error fetching observations:", err));
  }, []);

  const handleBirdDetected = useCallback((prediction: any) => {
    const species = prediction.class === 'bird' ? 'Bird (Unidentified)' : prediction.class;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Send to backend
    // Backend handles grouping logic!
    const username = localStorage.getItem('username') || 'Guest';
    const newObs = {
      species: species.charAt(0).toUpperCase() + species.slice(1),
      time: timeString,
      timestamp: Date.now(),
      count: 1,
      username: username
    };

    fetch('http://localhost:8080/api/v1/observations/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObs)
    })
      .then(res => res.json())
      .then(updatedObs => {
        fetch('http://localhost:8080/api/v1/observations/list')
          .then(res => res.json())
          .then(data => setObservations(data));
      })
      .catch(err => console.error("Error adding observation:", err));
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={12} lg={8} xl={9}>
          <LiveVideo onBirdDetected={handleBirdDetected} />
        </Col>
        <Col xs={12} lg={4} xl={3}>
          <ObservationsSummary observations={observations} />
        </Col>
      </Row>
    </div>
  );
};

export default memo(HomePage);