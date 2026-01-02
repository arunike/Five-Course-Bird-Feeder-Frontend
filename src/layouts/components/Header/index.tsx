import React, { memo } from 'react';
import { Layout, Button, Row, Col } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'modules/store';
import { selectGlobal, toggleMenu } from 'modules/global';
import HeaderIcon from './HeaderIcon';
import { HeaderMenu } from '../Menu';
import Style from './index.module.less';

const { Header } = Layout;

export default memo((props: { showMenu?: boolean }) => {
  const globalState = useAppSelector(selectGlobal);
  const dispatch = useAppDispatch();

  if (!globalState.showHeader) {
    return null;
  }

  let HeaderLeft;
  if (props.showMenu) {
    HeaderLeft = (
      <div>
        <HeaderMenu />
      </div>
    );
  } else {
    HeaderLeft = (
      <Row gutter={16} align='middle'>
        <Col>
          <Button type='text' size='large' onClick={() => dispatch(toggleMenu(null))} icon={<MenuOutlined />} />
        </Col>
      </Row>
    );
  }

  return (
    <Header className={Style.panel} style={{ padding: '0 20px' }}>
      {HeaderLeft}
      <HeaderIcon />
    </Header>
  );
});
