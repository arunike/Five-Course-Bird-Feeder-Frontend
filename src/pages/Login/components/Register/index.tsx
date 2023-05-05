import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { Form, MessagePlugin, Input, Checkbox, Button, FormInstanceFunctions, SubmitContext, InputValue } from 'tdesign-react';
import { LockOnIcon, UserIcon, MailIcon, BrowseOffIcon, BrowseIcon } from 'tdesign-icons-react';
import useCountdown from '../../hooks/useCountDown';

import Style from './index.module.less';
import { last } from 'lodash';

const { FormItem } = Form;

export type ERegisterType = 'email';

export default function Register() {
  const [registerType, changeRegisterType] = useState('email');
  const [showPsw, toggleShowPsw] = useState(false);
  const { countdown, setupCountdown } = useCountdown(60);
  const formRef = useRef<FormInstanceFunctions>();
  const [username, setUsername] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [firstName, setFirstName] = useState<any>('');
  const [lastName, setLastName] = useState<any>('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Need Chrome Extension CORS Unblock to work
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
        if(data === "success"){
          MessagePlugin.success('Registration successful');
          navigate('/login');
        }
        else if(data === "user_exists")
          MessagePlugin.error('Username already exists');
        return data;
      }
    );
  };

  const onSubmit = (e: SubmitContext) => {
    if (e.validateResult === true) {
      const { checked } = formRef.current?.getFieldsValue?.(['checked']) as { checked: boolean };
      if (!checked) {
        MessagePlugin.error('Please agree to the Richie Service Agreement and Richie Privacy Statement');
        return;
      }
      MessagePlugin.success('Register successfully');
    }
  };

  const switchType = (val: ERegisterType) => {
    formRef.current?.reset?.();
    changeRegisterType(val);
  };

  return (
    <div>
      <Form
        ref={formRef}
        className={classnames(Style.itemContainer, `register-${registerType}`)}
        labelWidth={0}
        onSubmit={handleRegister}
      >
        <FormItem name='firstName' rules={[{ required: true, message: 'First name required', type: 'error' }]}>
          <Input
            size='large'
            type='text'
            placeholder='First name'
            value={firstName} 
            onChange={(value: InputValue) => setFirstName(value)}
            prefixIcon={<UserIcon />} />
        </FormItem>

        <FormItem name='lastName' rules={[{ required: true, message: 'Last name required', type: 'error' }]}>
          <Input
            size='large'
            type='text'
            placeholder='Last name'
            value={lastName}
            onChange={(value: InputValue) => setLastName(value)}
            prefixIcon={<UserIcon />}
          />
        </FormItem>

        <FormItem name='username' rules={[{ required: true, message: 'Username required', type: 'error' }]}>
          <Input
            size='large'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(value: InputValue) => setUsername(value)}
            prefixIcon={<UserIcon />}
          />
        </FormItem>

        <FormItem name='password' rules={[{ required: true, message: 'Password required', type: 'error' }]}>
          <Input
            size='large'
            type={showPsw ? 'text' : 'password'}
            clearable
            placeholder='Please enter your login password'
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
        <FormItem className={Style.checkContainer} name='checked' initialData={false}>
          <Checkbox>I have read and agree to </Checkbox> <span className='tip'>Richie Service Agreement</span> and
          <span className='tip'>Richie Privacy Statement</span>
        </FormItem>
        <FormItem>
          <Button block size='large' type='submit'>
            Register
          </Button>
        </FormItem>
        <div className={Style.switchContainer}>
          <span className={Style.switchTip} onClick={() => switchType(registerType === 'email' ? 'email' : 'email')}>
            {registerType === 'email' ? 'Register with email' : 'Register with email'}
          </span>
        </div>
      </Form>
    </div>
  );
}
