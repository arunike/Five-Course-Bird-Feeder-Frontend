import React from 'react';
import { Layout, Row } from 'antd';
import { useAppSelector } from 'modules/store';
import { selectGlobal } from 'modules/global';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  const globalState = useAppSelector(selectGlobal);
  if (!globalState.showFooter) {
    return null;
  }

  return (
    <AntFooter>
      <Row justify='center'>Copyright @ 2023 Richie. All Rights Reserved</Row>
    </AntFooter>
  );
};

export default React.memo(Footer);
