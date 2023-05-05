import { lazy } from 'react';
import { SlSpeedometer } from "react-icons/sl";
import { IRouter } from '../index';

const dashboard: IRouter[] = [
  {
    path: '/dashboard',
    meta: {
      title: 'Statistical Reports',
      Icon: SlSpeedometer,
    },
    children: [
      {
        path: 'base',
        Component: lazy(() => import('pages/Statistic/Base')),
        meta: {
          title: 'Overview Dashboard',
        },
      },
      // {
      //   path: 'detail',
      //   Component: lazy(() => import('pages/Statistic/Detail')),
      //   meta: {
      //     title: 'Statistical Reports',
      //   },
      // },
    ],
  },
];

export default dashboard;
