import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tooltip, Dropdown, Menu, Row, Col, Space } from 'antd';
import {
  GithubOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useAppDispatch } from 'modules/store';
import { toggleSetting } from 'modules/global';
import { logout } from 'modules/user';
import Style from './HeaderIcon.module.less';

export default memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('Admin');

  React.useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
  }, []);

  const gotoGitHub = () => {
    window.open('https://github.com/arunike/Five-Course-Bird-Feeder-Frontend');
  };

  const handleLogout = async () => {
    localStorage.removeItem('username'); // Clear session
    await dispatch(logout());
    navigate('/login');
  };

  const menu = (
    <Menu onClick={(e) => {
      if (e.key === 'profile') {
        navigate('/user');
      } else if (e.key === 'logout') {
        handleLogout();
      }
    }}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Row align='middle' justify='center' style={{ height: '100%' }}>
      <Space size="large">
        <Tooltip title="Github">
          <Button type='text' shape='circle' icon={<GithubOutlined />} onClick={gotoGitHub} size="large" />
        </Tooltip>

        <Dropdown overlay={menu} trigger={['click']}>
          <Button type='text' className={Style.dropdown}>
            <Space>
              <UserOutlined />
              {username}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Tooltip title="System Settings">
          <Button type='text' shape='circle' icon={<SettingOutlined />} onClick={() => dispatch(toggleSetting())} size="large" />
        </Tooltip>
      </Space>
    </Row>
  );
});
