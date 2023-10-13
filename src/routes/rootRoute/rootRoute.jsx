import React from 'react';

import { Outlet } from 'react-router-dom';

import { Col, Row } from 'antd';

import Header from '../../components/header/header';

function RootRoute() {
  return (
    <Row>
      <Col span={2}>
        <Header />
      </Col>
      <Col span={22}>
        <Outlet />
      </Col>
    </Row>
  );
}

export default RootRoute;
