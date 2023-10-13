import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button, Space, Col, Row } from 'antd';

import useLocalStorage from '../../hooks/useLocalStorage';
import AuthContext from '../../context/authContext';

import style from './welcomeRoute.module.css';

function WelcomePage() {
  const { removeItem } = useLocalStorage('token');

  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const signOut = () => {
    removeItem();
    setAuth(null);
    navigate('/');
  };
  return (
    <section className={style.section}>
      <Row justify="center">
        <Col className={style.right} justify="center" align="middle">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Todoist-lockup_positive.png"
            alt=""
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col justify="center" align="middle" span={8}>
          {auth ? (
            <Space wrap>
              <Link to="/todo">
                <Button className={style.button}>Get Started</Button>
              </Link>
              <Button className={style.button} onClick={() => signOut()}>
                Sign out
              </Button>
            </Space>
          ) : (
            <Space wrap>
              <Link to="/auth">
                <Button className={style.button}>Sign in</Button>
              </Link>
              <Link to="/reg">
                <Button className={style.button}>Register</Button>
              </Link>
            </Space>
          )}
        </Col>
      </Row>
    </section>
  );
}

export default WelcomePage;
