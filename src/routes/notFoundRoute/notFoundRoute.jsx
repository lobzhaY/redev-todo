import React from 'react';

import { Row, Col } from 'antd';

import TitleComponent from '../../components/title/title';

import style from './notFount.module.css';

function NotFoundRoute() {
  return (
    <div className="wrapper">
      <Row justify="center" align="middle">
        <Col className={style.content} justify="center" align="middle">
          <TitleComponent title="Not Found" />
        </Col>
      </Row>
    </div>
  );
}

export default NotFoundRoute;
