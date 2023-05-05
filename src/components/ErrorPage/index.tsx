import React, { memo } from 'react';
import { Button } from 'tdesign-react';

import Light403Icon from 'assets/svg/assets-result-403.svg?component';
import Light404Icon from 'assets/svg/assets-result-404.svg?component';
import Light500Icon from 'assets/svg/assets-result-500.svg?component';
import style from './index.module.less';

enum ECode {
  forbidden = 403,
  notFount = 404,
  error = 500,
}

interface IErrorPageProps {
  code: ECode;
  title?: string;
  desc?: string;
}

const errorInfo = {
  [ECode.forbidden]: {
    title: '403 Forbidden',
    desc: 'Sorry, you are not authorized to access this page.',
    icon: <Light403Icon />,
  },
  [ECode.notFount]: {
    title: '404 Not Found',
    desc: 'Sorry, the page you visited does not exist.',
    icon: <Light404Icon />,
  },
  [ECode.error]: {
    title: '500 Internal Server Error',
    desc: 'Sorry, the server is wrong.',
    icon: <Light500Icon />,
  },
};

const ErrorPage: React.FC<IErrorPageProps> = (props) => {
  const info = errorInfo[props.code];
  return (
    <div className={style.errorBox}>
      {info?.icon}
      <div className={style.title}>{info?.title}</div>
      <div className={style.description}>{info?.desc}</div>
      <Button theme='primary'>Back Home</Button>
    </div>
  );
};

export default memo(ErrorPage);
