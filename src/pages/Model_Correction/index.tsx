import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouterProps } from 'react-router-dom';

const Home: React.FC<BrowserRouterProps> = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={12} lg={12} xl={3}>
            <img src="/src/assets/wip.gif" alt="WIP" />
        </Col>
      </Row>
    </div>
  );
};

export default memo(Home);