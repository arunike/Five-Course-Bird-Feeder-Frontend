import { lazy } from 'react';
import { IRouter } from '../index';
import { SlHome } from "react-icons/sl";

const result: IRouter[] = [
{
    path: '/home',
    meta: {
      title: 'Home Page',
      Icon: SlHome,
    },
    children: [
    {
        path: 'index',
        Component: lazy(() => import('pages/Home')),
        meta: {
          title: 'Home Page',
        },
      },
    ],
},
];

export default result;
