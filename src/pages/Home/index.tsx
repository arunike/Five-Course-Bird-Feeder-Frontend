import React, { memo } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouterProps } from 'react-router-dom';

const Home: React.FC<BrowserRouterProps> = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={12} lg={12} xl={3}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/MtGUTs_HgcE"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
        </Col>
      </Row>
    </div>
  );
};

export default memo(Home);