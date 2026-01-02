import React, { Suspense, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import routers, { IRouter } from 'router';
import { resolve } from 'utils/path';
import Page from './Page';
import Style from './AppRouter.module.less';

const { Content } = Layout;

type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];

const renderRoutes: TRenderRoutes = (routes, parentPath = '', breadcrumb = []) =>
  routes.map((route, index: number) => {
    const { Component, children, redirect, meta } = route;
    const currentPath = resolve(parentPath, route.path);
    let currentBreadcrumb = breadcrumb;

    if (meta?.title) {
      currentBreadcrumb = currentBreadcrumb.concat([meta?.title]);
    }

    if (redirect) {
      return <Route key={index} path={currentPath} element={<Navigate to={redirect} replace />} />;
    }

    if (Component) {
      return (
        <Route
          key={index}
          path={currentPath}
          element={
            <Page isFullPage={route.isFullPage} breadcrumbs={currentBreadcrumb}>
              <Component />
            </Page>
          }
        />
      );
    }

    return children ? renderRoutes(children, currentPath, currentBreadcrumb) : null;
  });

const AppRouter = () => (
  <Content>
    <Suspense
      fallback={
        <div className={Style.loading}>
          <Spin size="large" />
        </div>
      }
    >
      <Routes>{renderRoutes(routers)}</Routes>
    </Suspense>
  </Content>
);

export default memo(AppRouter);
