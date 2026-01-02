import React, { memo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import router, { IRouter } from 'router';
import { resolve } from 'utils/path';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';
import MenuLogo from './MenuLogo';
import Style from './Menu.module.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface IMenuProps {
  showLogo?: boolean;
  showOperation?: boolean;
}

const renderMenuItems = (menu: IRouter[], role: string, parentPath = '') => {
  const navigate = useNavigate();
  return menu.map((item) => {
    const { children, meta, path } = item;

    if (!meta || meta?.hidden === true) {
      return null;
    }

    if (path === '/admin' && role !== 'admin') {
      return null;
    }

    const { Icon, title, single } = meta;
    const routerPath = resolve(parentPath, path);

    if (!children || children.length === 0) {
      return (
        <Menu.Item
          key={routerPath}
          icon={Icon ? <Icon /> : undefined}
          onClick={() => navigate(routerPath)}
        >
          {title}
        </Menu.Item>
      );
    }

    if (single && children?.length > 0) {
      const firstChild = children[0];
      if (firstChild?.meta && !firstChild?.meta?.hidden) {
        const { Icon, title } = meta;
        const singlePath = resolve(resolve(parentPath, path), firstChild.path);
        return (
          <Menu.Item
            key={singlePath}
            icon={Icon ? <Icon /> : undefined}
            onClick={() => navigate(singlePath)}
          >
            {title}
          </Menu.Item>
        );
      }
    }

    return (
      <SubMenu key={routerPath} title={title} icon={Icon ? <Icon /> : undefined}>
        {renderMenuItems(children, role, routerPath)}
      </SubMenu>
    );
  });
};

export const HeaderMenu = memo(() => {
  const globalState = useAppSelector(selectGlobal);
  const location = useLocation();
  const [active, setActive] = useState<string>(location.pathname);
  const role = localStorage.getItem('role') || 'user';

  return (
    <Menu
      mode="horizontal"
      style={{ marginBottom: 20 }}
      selectedKeys={[active]}
      theme={globalState.theme === 'dark' ? 'dark' : 'light'}
      onClick={(e) => setActive(e.key as string)}
    >
      {renderMenuItems(router, role)}
    </Menu>
  );
});

export default memo((props: IMenuProps) => {
  const location = useLocation();
  const globalState = useAppSelector(selectGlobal);
  const role = localStorage.getItem('role') || 'user';

  return (
    <Sider
      width={232}
      collapsedWidth={80}
      trigger={null}
      collapsible
      collapsed={globalState.collapsed}
      theme={globalState.theme === 'dark' ? 'dark' : 'light'}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {props.showLogo && <MenuLogo collapsed={globalState.collapsed} />}
        <Menu
          mode="inline"
          style={{ flex: 1, borderRight: 0 }}
          selectedKeys={[location.pathname]}
          theme={globalState.theme === 'dark' ? 'dark' : 'light'}
          inlineCollapsed={globalState.collapsed}
        >
          {renderMenuItems(router, role)}
        </Menu>
      </div>
    </Sider>
  );
});
