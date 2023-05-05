import React, { useState } from 'react';
import { Button, Col, Row, Card } from 'tdesign-react';
import ReactEcharts from 'echarts-for-react';
import useDynamicChart from 'hooks/useDynamicChart';
import Board, { ETrend } from 'components/Board';
import LastWeekDatePicker from 'components/DatePicker';
import { getBarChartOptions } from '../chart';
import Style from './Overview.module.less';

const options = getBarChartOptions();
const Overview = (): React.ReactElement => {
  const [customOptions, setCustomOptions] = useState(options);

  const onTimeChange = (value: any) => {
    // eslint-disable-next-line no-shadow
    const options = getBarChartOptions(value);
    setCustomOptions(options);
  };

  const dynamicChartOption = useDynamicChart(customOptions, {
    placeholderColor: ['legend.textStyle.color', 'xAxis.axisLabel.color', 'yAxis.axisLabel.color'],
  });

  return (
    <div className={Style.overviewPanel}>
      <Row>
        <Col xs={12} xl={9} span={12}>
          <Card title='Detection Bar Chart' actions={LastWeekDatePicker(onTimeChange)} bordered={false}>
            <ReactEcharts
              option={dynamicChartOption}
              notMerge={true}
              lazyUpdate={true}
              style={{ height: 351 }}
            />
          </Card>
        </Col>
        {/* <Col xs={12} xl={3} span={12}>
          <Card actions={<Button>Output Data</Button>} bordered={false}>
            <Row>
              <Col xl={12} xs={6} span={12}>
                <Board
                  title='Total number of items shipped during the month (pieces)）'
                  count='1726'
                  trend={ETrend.down}
                  trendNum='20.3%'
                  desc='Since last week'
                  border={false}
                />
              </Col>
              <Col xl={12} xs={6} span={12}>
                <Board
                  title='Active users (people)'
                  count='1126'
                  trend={ETrend.down}
                  trendNum='20.5%'
                  desc='Since last week'
                  border={false}
                />
              </Col>
            </Row>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default React.memo(Overview);
