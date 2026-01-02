import React from 'react';
import { Button } from 'antd';
import { GithubOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'modules/store';
import { toggleSetting } from 'modules/global';

import LogoFullIcon from 'assets/svg/assets-logo-full.svg?component';
import Style from './index.module.less';

export default function Header() {
  const dispatch = useAppDispatch();

  const navToGitHub = () => {
    window.open('https://github.com/arunike/Five-Course-Bird-Feeder-Frontend');
  };

  return (
    <div>
      <header className={Style.loginHeader}>
        <LogoFullIcon className={Style.logo} />
        <div className={Style.operationsContainer}>
          <Button
            className={Style.operationsButton}
            type='text'
            shape='default'
            onClick={navToGitHub}
            icon={<GithubOutlined className={Style.icon} />}
          />
        </div>
      </header>
    </div>
  );
}
