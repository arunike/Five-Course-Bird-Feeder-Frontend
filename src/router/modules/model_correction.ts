import { lazy } from 'react';
import { IRouter } from '../index';
import { SlEnergy } from "react-icons/sl";

const result: IRouter[] = [
{
    path: '/model_correction',
    meta: {
      title: 'Model Correction Page',
      Icon: SlEnergy,
    },
    children: [
    {
        path: 'index',
        Component: lazy(() => import('pages/Model_Correction')),
        meta: {
          title: 'Machine Learning Model',
        },
      },
    ],
},
];

export default result;
