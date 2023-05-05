import React from 'react';
import { Col, Row, Card } from 'tdesign-react';
import Board from 'components/Board';
import { PANE_LIST } from '../constant';

const MonthPurchase = () => (
  <Card title='Procurement request status for the month' header>
    <Row gutter={[16, 16]}>
      {PANE_LIST.map((item) => (
        <Col key={item.title} xs={6} xl={3} span={12}>
          <Board
            title={item.title}
            trend={item.trend}
            trendNum={item.trendNum}
            count={item.count}
            desc={'Ringgit'}
            border
          />
        </Col>
      ))}
    </Row>
  </Card>
);

export default React.memo(MonthPurchase);
