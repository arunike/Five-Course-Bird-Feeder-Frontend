import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popup, Badge, Dropdown, Row, Col } from 'tdesign-react';
import {
  Icon,
  LogoGithubIcon,
  MailIcon,
  HelpCircleIcon,
  SettingIcon,
  PoweroffIcon,
  UserCircleIcon,
} from 'tdesign-icons-react';
import { useAppDispatch } from 'modules/store';
import { toggleSetting } from 'modules/global';
import { logout } from 'modules/user';
import Style from './HeaderIcon.module.less';

const { DropdownMenu, DropdownItem } = Dropdown;

export default memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const gotoWiki = () => {
    window.open('https://docs.google.com/document/d/1Agm1aaQD4c1zqJwlJgBnIhYMeeniRpNd/edit');
  };

  const gotoGitHub = () => {
    window.open('https://github.com/arunike');
  };

  const clickHandler = (data: any) => {
    if (data.value === 1) {
      navigate('/user/index');
    }
  };
  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login/index');
  };

  return (
    <Row align='middle' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Col>
        <Button shape='square' size='large' variant='text' onClick={gotoGitHub}>
          <Popup content='github' placement='bottom' showArrow destroyOnClose>
            <LogoGithubIcon />
          </Popup>
        </Button>
      </Col>
      <Col>
        <Button shape='square' size='large' variant='text' onClick={gotoWiki}>
          <Popup content='wiki' placement='bottom' showArrow destroyOnClose>
            <HelpCircleIcon />
          </Popup>
        </Button>
      </Col>
      <Col>
        <Dropdown className={Style.dropdown} trigger={'click'} onClick={clickHandler}>
          <Button variant='text'>
            <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name='user-circle' size='20px' />
              <span style={{ display: 'inline-block', margin: '0 5px' }}>Admin</span>
              <Icon name='chevron-down' size='20px' />
            </span>
          </Button>
          <DropdownMenu>
            <DropdownItem value={1}>
              <>
                <UserCircleIcon />
                Profile
              </>
            </DropdownItem>
            <DropdownItem value={1} onClick={handleLogout}>
              <>
                <PoweroffIcon />
                Logout
              </>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col>
        <Button shape='square' size='large' variant='text' onClick={() => dispatch(toggleSetting())}>
          <Popup content='setting' placement='bottom' showArrow destroyOnClose>
            <SettingIcon />
          </Popup>
        </Button>
      </Col>
    </Row>
  );
});
