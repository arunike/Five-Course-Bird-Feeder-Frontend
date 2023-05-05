import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, MessagePlugin, Input, Checkbox, Button, FormInstanceFunctions, SubmitContext, InputValue } from 'tdesign-react';
import { LockOnIcon, UserIcon, BrowseOffIcon, BrowseIcon} from 'tdesign-icons-react';
import classnames from 'classnames';
import { useAppDispatch } from 'modules/store';
import { login } from 'modules/user';
import { UserContext } from '../../../../userContext';

import Style from './index.module.less';

const { FormItem } = Form;

export type ELoginType = 'password' | 'phone' | 'qrcode';

export default function Login() {
  const [loginType, changeLoginType] = useState<ELoginType>('password');
  const [showPsw, toggleShowPsw] = useState(false);
  const formRef = useRef<FormInstanceFunctions>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [user, setUser] = useContext(UserContext);

  const handleLogin = async () => {
    // Need Chrome Extension CORS Unblock to work
    await fetch(`http://localhost:8080/api/v1/users/login/${username}/${password}`, {
      method: 'GET',
      headers: {
      }
      })
      .then((response) => {
        if (response.status === 200) {
          return response.text();
        }
        else {
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        console.log(data);
        if(data === "success"){
          setUser("context is set") // set user context
          console.log(user)
          navigate('/home/index');
        }
        else if(data === "userDNE")
          MessagePlugin.error('User does not exist');
        else if(data === "wrong_password")
          MessagePlugin.error('Wrong password');
        return data;
      }
    );
  };

  const onSubmit = async (e: SubmitContext) => {
    if (e.validateResult === true) {
      try {
        const formValue = formRef.current?.getFieldsValue?.(true) || {};
        await dispatch(login(formValue));

        MessagePlugin.success('Login successfully');

        navigate('/home/index');
      } catch (e) {
        console.log(e);
        MessagePlugin.error('Login failed');
      }
    }
  };

  const switchType = (val: ELoginType) => {
    formRef.current?.reset?.();
    changeLoginType(val);
  };

  return (
    <div>
      <Form
        ref={formRef}
        className={classnames(Style.itemContainer, `login-${loginType}`)}
        labelWidth={0}
        onSubmit={handleLogin}
      >
        {loginType === 'password' && (
          <>
            <FormItem name='account' rules={[{ required: true, message: 'Username Required', type: 'error' }]}>
              <Input 
                size='large'
                clearable
                placeholder='Please enter the login account: admin' 
                value={username} 
                onChange={(value: InputValue) => setUsername(value)}
                prefixIcon={<UserIcon />} 
                />
            </FormItem>
            <FormItem name='password' rules={[{ required: true, message: 'Password required', type: 'error' }]} >
              <Input
                size='large'
                clearable
                type={showPsw ? 'text' : 'password'}
                placeholder='Please enter the login password: admin'
                value={password}
                onChange={(value: InputValue) => setPassword(value)}
                prefixIcon={<LockOnIcon />}
                suffixIcon={
                  showPsw ? (
                    <BrowseIcon onClick={() => toggleShowPsw((current) => !current)} />
                  ) : (
                    <BrowseOffIcon onClick={() => toggleShowPsw((current) => !current)} />
                  )
                }
              />
            </FormItem>
            <div className={classnames(Style.checkContainer, Style.rememberPwd)}>
              <Checkbox>Remember account</Checkbox>
              <span className={Style.checkContainerTip}>Forgot your account?</span>
            </div>
          </>
        )}

        {loginType !== 'qrcode' && (
          <FormItem className={Style.btnContainer}>
            <Button block size='large' type='submit'>
              Login
            </Button>
          </FormItem>
        )}
      </Form>
    </div>
  );
}
