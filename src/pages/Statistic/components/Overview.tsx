import React, { useMemo } from 'react';
import { Col, Row } from 'antd';
import Board, { ETrend } from 'components/Board';
import Style from './Overview.module.less';

interface Props {
  data: any[];
}

const Overview: React.FC<Props> = ({ data }) => {
  const stats = useMemo(() => {
    const totalSightings = data.reduce((acc, curr) => acc + (curr.count || 1), 0);
    const uniqueSpecies = new Set(data.map(d => d.species)).size;
    const lastSighting = data.length > 0 ? data[0].time : 'N/A';

    return { totalSightings, uniqueSpecies, lastSighting };
  }, [data]);

  return (
    <div className={Style.overviewPanel}>
      <Row gutter={[16, 16]}>
        <Col xs={12} xl={6}>
          <Board
            title='Total Sightings'
            count={stats.totalSightings.toString()}
            trend={ETrend.up}
            desc='All time'
          />
        </Col>
        <Col xs={6} xl={3}>
          <Board
            title='Unique Species'
            count={stats.uniqueSpecies.toString()}
            trend={ETrend.up}
            desc='Diversity'
          />
        </Col>
        <Col xs={6} xl={3}>
          <Board
            title='Last Sighting'
            count={stats.lastSighting}
            desc='Time'
          />
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Overview);
