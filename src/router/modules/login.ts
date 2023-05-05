import { lazy } from 'react';
import { SlLogin } from "react-icons/sl";
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/login',
    meta: {
      title: 'Logout',
      Icon: SlLogin,
    },
    children: [
      {
        path: 'index',
        Component: lazy(() => import('pages/Login')),
        isFullPage: true,
        meta: {
          title: 'Logout',
        },
      },
    ],
  },
];

export default result;
