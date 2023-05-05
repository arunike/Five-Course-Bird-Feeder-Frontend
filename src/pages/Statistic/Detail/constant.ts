import { IBoardProps, ETrend } from 'components/Board';

export const PANE_LIST: Array<IBoardProps> = [
  {
    title: 'Total number of applications (times)）',
    count: '1126',
    trendNum: '10%',
    trend: ETrend.up,
  },
  {
    title: 'Number of suppliers (pcs)',
    count: '13',
    trendNum: '13%',
    trend: ETrend.down,
  },
  {
    title: 'Purchasing goods category (class)',
    count: '4',
    trendNum: '10%',
    trend: ETrend.up,
  },
  {
    title: 'Number of applicants (persons)',
    count: '90',
    trendNum: '44%',
    trend: ETrend.down,
  },
  {
    title: 'Application completion rate (%)',
    count: '80.5',
    trendNum: '70%',
    trend: ETrend.up,
  },
  {
    title: 'Timely arrival rate (%)',
    count: '78',
    trendNum: '16%',
    trend: ETrend.up,
  },
];

export const PRODUCT_LIST = [
  {
  },
  {
  },
];
