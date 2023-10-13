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

import style from './registrationRoute.module.css';

function RegistrationRoute() {
  const { setItem } = useLocalStorage('token');

  const { setAuth } = useContext(AuthContext);

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

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await axios
      .post(
        `${URL}/users/register`,
        {
          username: values.username,
          email: values.useremail,
          password: values.password,
          gender: 'female',
          age: 25,
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
        const { errors } = error.response.data;
        if (errors) {
          errors.forEach((elem) => notify(elem.msg));
        } else {
          notify(error.response.data.message);
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    errorInfo.errorFields.forEach((elem) => notify(elem.errors[0]));
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <TitleComponent title="Registration" />
      <Row justify="center" align="middle" className={style.form_container}>
        <Col span={16}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className={style.input_label}
              name="useremail"
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
          Have an account?{' '}
          <Link to="/auth" className={style.link}>
            Login Now
          </Link>
        </p>
      </Row>
    </div>
  );
}

export default RegistrationRoute;
