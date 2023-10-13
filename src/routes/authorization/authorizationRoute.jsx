import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button, Form, Input, Col, Row } from 'antd';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TitleComponent from '../../components/title/title';

import useLocalStorage from '../../hooks/useLocalStorage';

import AuthContext from '../../context/authContext';

import { URL, options } from '../../constants/apiConst';

import style from './authorizationRoute.module.css';

function AuthorizationRoute() {
  const { setItem } = useLocalStorage('token');

  const { setAuth } = useContext(AuthContext);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const notify = (message) =>
    toast.error(`${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const onFinish = async (values) => {
    await axios
      .post(
        `${URL}/auth/login`,
        {
          email: values.user.email,
          password: values.password,
        },
        options
      )
      .then((response) => {
        setItem(response.data.token);
        setAuth(response.data.token);
        form.resetFields();
        navigate('/');
      })
      .catch((error) => {
        notify(error.response.data.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.forEach((elem) => notify(elem.errors[0]));
  };
  return (
    <div className="wrapper">
      <ToastContainer />
      <TitleComponent title="Login" />
      <Row justify="center" align="middle" className={style.form_container}>
        <Col span={16}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              className={style.input_label}
              name={['user', 'email']}
              label="Email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input className={style.input} />
            </Form.Item>

            <Form.Item
              className={style.input_label}
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password className={style.input} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button className={style.button} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row justify="center" align="middle" className={style.link_container}>
        <p>
          Don&apos;t have an account?{' '}
          <Link to="/reg" className={style.link}>
            Register Now
          </Link>
        </p>
      </Row>
    </div>
  );
}

export default AuthorizationRoute;
