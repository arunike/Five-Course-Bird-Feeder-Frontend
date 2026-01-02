import React, { memo } from 'react';
import MiddleChart from './components/MiddleChart';
import Overview from './components/Overview';

const DashboardPage = () => {
  const [observations, setObservations] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:8080/api/v1/observations/list')
      .then(res => res.json())
      .then(data => setObservations(data))
      .catch(err => console.error("Error fetching dashboard data:", err));
  }, []);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <MiddleChart data={observations} />
      <Overview data={observations} />
    </div>
  );
};

export default memo(DashboardPage);
