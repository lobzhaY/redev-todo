import React from 'react';

import PropTypes from 'prop-types';

import { Typography, Col, Row } from 'antd';

import style from './title.module.css';

function TitleComponent({ title }) {
  const { Title } = Typography;
  return (
    <Row align="middle" className={style.header}>
      <Col span={4} className={style.logo}>
        <img
          src="https://ericsammons.com/wp-content/uploads/2021/02/todoist-logo.png"
          alt="Todo List logo"
        />
      </Col>
      <Col span={16}>
        <Title level={2} className={style.title}>
          {title}
        </Title>
      </Col>
    </Row>
  );
}

export default TitleComponent;

TitleComponent.propTypes = {
  title: PropTypes.string.isRequired,
};
