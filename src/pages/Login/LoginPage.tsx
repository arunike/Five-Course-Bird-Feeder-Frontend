import React, { memo, useState } from 'react';
import classNames from 'classnames';
import Login from './components/Login';
import Register from './components/Register';
import LoginHeader from './components/Header';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';

import Style from './index.module.less';
import { UserContext } from '../../userContext';

const LoginPage = () => {
  const [type, setType] = useState('login');
  const globalState = useAppSelector(selectGlobal);
  const { theme } = globalState;
  const handleSwitchLoginType = () => {
    setType(type === 'register' ? 'login' : 'register');
  };
  const [user, setUser] = React.useState<any>(UserContext);

  return (
    <div
      className={classNames(Style.loginWrapper, { [Style.light]: theme === 'light', [Style.dark]: theme !== 'light' })}
    >
      <LoginHeader />
      <div className={Style.loginContainer}>
        <div className={Style.titleContainer}>
          <h1 className={Style.title}>Login to</h1>
          <h1 className={Style.title}>Five Course Bird Feeder</h1>
          <div className={Style.subTitle}>
            <p className={classNames(Style.tip, Style.registerTip)}>
              {type === 'register' ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <p className={classNames(Style.tip, Style.loginTip)} onClick={handleSwitchLoginType}>
              {type === 'register' ? 'Login' : 'Sign up for a new account'}
            </p>
          </div>
        </div>
        {type === 'login' ? <UserContext.Provider value={[user, setUser]}><Login /></UserContext.Provider> : <Register />}
      </div>
      <footer className={Style.copyright}>Copyright @ 2023 Richie. All Rights Reserved</footer>
    </div>
  );
};

export default memo(LoginPage);
