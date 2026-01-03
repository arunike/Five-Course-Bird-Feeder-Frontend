import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import { SlHome, SlSpeedometer, SlPeople, SlWrench, SlSettings } from "react-icons/sl";

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
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
  };
  children?: IRouter[];
}

const routes: IRouter[] = [
  {
    path: '/login',
    Component: lazy(() => import('pages/Login/LoginPage')),
    isFullPage: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    Component: lazy(() => import('pages/Home/HomePage')),
    meta: {
      title: 'Home Page',
      Icon: SlHome,
      requiresAuth: true,
    },
  },
  {
    path: '/dashboard',
    Component: lazy(() => import('pages/Statistic/DashboardPage')),
    meta: {
      title: 'Dashboard',
      Icon: SlSpeedometer,
      requiresAuth: true,
    },
  },
  {
    path: '/setting',
    Component: lazy(() => import('pages/Setting/SettingPage')),
    meta: {
      title: 'Setting',
      Icon: SlWrench,
      requiresAuth: true,
    },
  },
  {
    path: '/user',
    Component: lazy(() => import('pages/User/UserPage')),
    meta: {
      title: 'Profile',
      Icon: SlPeople,
      requiresAuth: true,
    },
  },
  {
    path: '/admin',
    Component: lazy(() => import('pages/Admin/AdminPage')),
    meta: {
      title: 'Admin Dashboard',
      Icon: SlSettings,
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

export default routes;
