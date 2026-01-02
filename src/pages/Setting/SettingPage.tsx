import React, { memo, useState, useEffect } from 'react';
import { Row, Col, Card, Button, InputNumber, message } from 'antd';
import { BrowserRouterProps } from 'react-router-dom';
import Style from './SettingPage.module.less';

const SettingPage: React.FC<BrowserRouterProps> = () => {
  const [threshold, setThreshold] = useState<number>(0.6);

  useEffect(() => {
    const saved = localStorage.getItem('detectionThreshold');
    if (saved) setThreshold(parseFloat(saved));
  }, []);

  const handleThresholdChange = (val: number | null) => {
    if (val !== null) {
      setThreshold(val);
      localStorage.setItem('detectionThreshold', val.toString());
    }
  };

  const handleClearData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/observations/all', {
        method: 'DELETE',
      });
      if (res.ok) {
        message.success('All observation data cleared successfully');
      } else {
        message.error('Failed to clear data');
      }
    } catch (err) {
      console.error(err);
      message.error('Error clearing data');
    }
  };

  return (
    <div style={{ overflow: 'hidden', height: '100%', padding: 20 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title='General Settings'>
            <div style={{ marginBottom: 16 }}>
              <h4>Comparison Threshold (AI Confidence)</h4>
              <p style={{ color: '#999', fontSize: '12px' }}>
                Minimum confidence level required to log a bird detection (0.0 - 1.0).
              </p>
              <InputNumber
                max={1.0}
                min={0.1}
                step={0.05}
                value={threshold}
                onChange={handleThresholdChange}
                style={{ width: '100%' }}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title='Data Management'>
            <div style={{ marginBottom: 16 }}>
              <h4>Clear Observation History</h4>
              <p style={{ color: '#999', fontSize: '12px' }}>
                Permanently delete all recorded bird sightings from the database. This action cannot be undone.
              </p>
              <Button danger type="primary" onClick={handleClearData}>
                Clear All Data
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default memo(SettingPage);