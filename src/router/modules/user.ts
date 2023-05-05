import { lazy } from 'react';
import { SlPeople } from "react-icons/sl";
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/user',
    meta: {
      title: 'Profile Page',
      Icon: SlPeople,
    },
    children: [
      {
        path: 'index',
        Component: lazy(() => import('pages/User')),
        meta: {
          title: 'Profile Center',
        },
      },
    ],
  },
];

export default result;
