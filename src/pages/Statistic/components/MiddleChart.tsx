import React, { useMemo } from 'react';
import { Col, Row, Card } from 'antd';
import ReactEcharts from 'echarts-for-react';

interface Props {
  data: any[];
}

const MiddleChart: React.FC<Props> = ({ data }) => {
  // Aggregate data for Species Count
  const chartOptions = useMemo(() => {
    const speciesCount: Record<string, number> = {};
    data.forEach(obs => {
      const sp = obs.species || 'Unknown';
      speciesCount[sp] = (speciesCount[sp] || 0) + (obs.count || 1);
    });

    const species = Object.keys(speciesCount);
    const counts = Object.values(speciesCount);

    return {
      title: { text: 'Total Observations per Species', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: species },
      yAxis: { type: 'value' },
      series: [{
        data: counts,
        type: 'bar',
        itemStyle: { color: '#0052D9' }
      }]
    };
  }, [data]);

  // Aggregate data for Pie Chart
  const pieOptions = useMemo(() => {
    const speciesCount: Record<string, number> = {};
    data.forEach(obs => {
      const sp = obs.species || 'Unknown';
      speciesCount[sp] = (speciesCount[sp] || 0) + (obs.count || 1);
    });

    const pieData = Object.keys(speciesCount).map(key => ({
      name: key,
      value: speciesCount[key]
    }));

    return {
      tooltip: { trigger: 'item' },
      legend: { bottom: '0', left: 'center' },
      series: [
        {
          name: 'Species',
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: pieData
        }
      ]
    };
  }, [data]);


  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={18}>
        <Card title='Species Distribution (Bar Chart)'>
          <ReactEcharts option={chartOptions} style={{ height: 400 }} />
        </Card>
      </Col>
      <Col xs={24} xl={6}>
        <Card title='Species Share (Pie Chart)'>
          <ReactEcharts option={pieOptions} style={{ height: 400 }} />
        </Card>
      </Col>
    </Row>
  );
};

export default React.memo(MiddleChart);
