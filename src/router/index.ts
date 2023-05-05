import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import statistic from './modules/statistic';
import user from './modules/user';
import login from './modules/login';
import home from './modules/home';
import setting from './modules/setting';
import model_correction from './modules/model_correction';
import otherRoutes from './modules/others';

export interface IRouter {
  path: string;
  redirect?: string;
  Component?: React.FC<BrowserRouterProps> | (() => any);
  isFullPage?: boolean;
  meta?: {
    title?: string;
    Icon?: React.FC;
    hidden?: boolean;
    single?: boolean;
  };
  children?: IRouter[];
}

const routes: IRouter[] = [
  {
    path: '/login',
    Component: lazy(() => import('pages/Login')),
    isFullPage: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: '/login/index',
  },
];

const allRoutes = [...routes, ...home, ...statistic, ...setting, ...model_correction, ...user, ...login, ...otherRoutes];

export default allRoutes;
