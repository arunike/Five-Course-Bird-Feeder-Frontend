import { lazy } from 'react';
import { IRouter } from '../index';
import { SlWrench } from "react-icons/sl";

const result: IRouter[] = [
{
    path: '/setting',
    meta: {
        title: 'Setting Page',
        Icon: SlWrench,
    },
    children: [
    {
        path: 'index',
        Component: lazy(() => import('pages/Setting')),
        meta: {
            title: 'Setting',
        },
    },
    ],
},
];

export default result;


// https://react-icons.github.io/react-icons/icons?name=sl
