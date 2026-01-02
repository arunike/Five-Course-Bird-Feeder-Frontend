import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { Form, message, Input, Checkbox, Button } from 'antd';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import useCountdown from '../../hooks/useCountDown';

import Style from './index.module.less';

export type ERegisterType = 'email';

export default function Register() {
  const [registerType, changeRegisterType] = useState('email');
  const [form] = Form.useForm();
  const [username, setUsername] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [firstName, setFirstName] = useState<any>('');
  const [lastName, setLastName] = useState<any>('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    await fetch(`http://localhost:8080/api/v1/users/register/${username}/${password}/${firstName}/${lastName}`, {
      method: 'GET',
      headers: {
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.text();
        }
        else {
          throw new Error('Registration failed');
        }
      })
      .then((data) => {
        console.log(data);
        if (data === "success") {
          localStorage.setItem('username', username);
          message.success('Registration successful');
          navigate('/login');
        }
        else if (data === "user_exists")
          message.error('Username already exists');
        return data;
      }
      );
  };

  const onFinish = (values: any) => {
    const { checked } = values;
    if (!checked) {
      message.error('Please agree to the Richie Service Agreement and Richie Privacy Statement');
      return;
    }
    handleRegister();
  };

  const switchType = (val: ERegisterType) => {
    form.resetFields();
    changeRegisterType(val);
  };

  return (
    <div>
      <Form
        form={form}
        className={classnames(Style.itemContainer, `register-${registerType}`)}
        onFinish={onFinish}
        initialValues={{ checked: false }}
      >
        <Form.Item shouldUpdate>
          {() => (
            <Form.Item
              name='firstName'
              style={{ marginBottom: form.getFieldError('firstName').length > 0 ? 24 : 12 }}
              rules={[{ required: true, message: 'First name required' }]}
            >
              <Input
                size='large'
                placeholder='First name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                prefix={<UserOutlined />} />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Form.Item
              name='lastName'
              style={{ marginBottom: form.getFieldError('lastName').length > 0 ? 24 : 12 }}
              rules={[{ required: true, message: 'Last name required' }]}
            >
              <Input
                size='large'
                placeholder='Last name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                prefix={<UserOutlined />}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Form.Item
              name='username'
              validateTrigger='onBlur'
              style={{ marginBottom: form.getFieldError('username').length > 0 ? 24 : 12 }}
              rules={[
                { required: true, message: 'Username required' },
                {
                  validator: async (_, value) => {
                    if (!value) return Promise.resolve();
                    try {
                      const response = await fetch(`http://localhost:8080/api/v1/users/get/${value}`);
                      const text = await response.text();
                      if (text && text.length > 0) {
                        return Promise.reject(new Error('Username already taken'));
                      }
                      return Promise.resolve();
                    } catch (err) {
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input
                size='large'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                prefix={<UserOutlined />}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Form.Item
              name='password'
              style={{ marginBottom: form.getFieldError('password').length > 0 ? 24 : 12 }}
              rules={[
                { required: true, message: 'Password required' },
                { min: 8, message: 'Password must be at least 8 characters' },
                { pattern: /[0-9]/, message: 'Password must contain at least one number' },
                { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
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
          )}
        </Form.Item>
        <Form.Item>
          <Button block size='large' type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
