import React from 'react';
import { Card, List, Tag } from 'antd';

interface Observation {
    id: number;
    species: string;
    time: string;
    count: number;
}

interface ObservationsSummaryProps {
    observations: Observation[];
}

const ObservationsSummary: React.FC<ObservationsSummaryProps> = ({ observations }) => {

    return (
        <Card title="Todays Observations" bordered style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
            <List
                itemLayout="horizontal"
                dataSource={observations}
                renderItem={(obs) => (
                    <List.Item key={obs.id} style={{ padding: '10px 20px' }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontWeight: 'bold', display: 'block' }}>{obs.species}</span>
                                <span style={{ fontSize: '0.85em', color: '#666' }}>Seen at {obs.time}</span>
                            </div>
                            <Tag color="volcano">x{obs.count}</Tag>
                        </div>
                    </List.Item>
                )}
            />
            <div style={{ padding: '1rem', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                Since last login
            </div>
        </Card>
    );
};

export default ObservationsSummary;
