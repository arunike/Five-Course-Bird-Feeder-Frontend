import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { useAppDispatch } from 'modules/store';
import { login } from 'modules/user';
import { UserContext } from '../../../../userContext';

import Style from './index.module.less';

export type ELoginType = 'password' | 'phone' | 'qrcode';

export default function Login() {
  const [loginType, changeLoginType] = useState<ELoginType>('password');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [user, setUser] = useContext(UserContext);
  const [form] = Form.useForm();

  const handleLogin = async () => {

    await fetch(`http://localhost:8080/api/v1/users/login/${username}/${password}`, {
      method: 'GET',
      headers: {}
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
        if (data === "success") {
          setUser("context is set")

          // Save session data
          localStorage.setItem('username', username);
          const now = new Date().toISOString();
          const history = JSON.parse(localStorage.getItem(`loginHistory_${username}`) || '[]');
          history.push(now);
          localStorage.setItem(`loginHistory_${username}`, JSON.stringify(history));

          // Fetch Role
          fetch(`http://localhost:8080/api/v1/users/get/${username}`)
            .then(res => res.json())
            .then(userData => {
              if (userData && userData.role) {
                localStorage.setItem('role', userData.role);
              } else {
                localStorage.setItem('role', 'user');
              }
              navigate('/home');
            })
            .catch(() => {
              localStorage.setItem('role', 'user');
              navigate('/home');
            });
        }
        else if (data === "userDNE")
          message.error('User does not exist');
        else if (data === "wrong_password")
          message.error('Wrong password');
        return data;
      }
      );
  };

  const onFinish = async (values: any) => {
    try {
      await dispatch(login(values));
      message.success('Login successfully');
      handleLogin();
    } catch (e) {
      console.log(e);
      message.error('Login failed');
    }
  };

  return (
    <div>
      <Form
        form={form}
        className={classnames(Style.itemContainer, `login-${loginType}`)}
        onFinish={onFinish}
        initialValues={{}}
      >
        {loginType === 'password' && (
          <>
            <Form.Item name='account' rules={[{ required: true, message: 'Username Required' }]}>
              <Input
                size='large'
                allowClear
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Password required' },
              ]}
            >
              <Input.Password
                size='large'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined />}
                iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <div className={classnames(Style.checkContainer, Style.rememberPwd)}>
              <Checkbox>Remember account</Checkbox>
              <span className={Style.checkContainerTip}>Forgot your account?</span>
            </div>
          </>
        )}

        {loginType !== 'qrcode' && (
          <Form.Item className={Style.btnContainer}>
            <Button block size='large' type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}
