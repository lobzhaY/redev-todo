import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button, Form, Input, Col, Row, InputNumber, Radio } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TitleComponent from '../../components/title/title';

import { URL, options } from '../../constants/apiConst';

import style from './registrationRoute.module.css';

function RegistrationRoute() {
  const notify = (message) =>
    toast.error(`${message}`, {
      position: 'top-right',
      autoClose: 7000,
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
          gender: values.usergender,
          age: values.userage,
        },
        options
      )
      .then(() => {
        form.resetFields();
        navigate('/auth');
      })
      .catch((error) => {
        const { errors } = error.response.data;
        if (errors) {
          errors.forEach((elem) => notify(elem.msg));
        } else {
          notify(error.response.data.message || error.message);
        }
      });
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
            autoComplete="off"
            form={form}
          >
            <Form.Item
              className={style.input_label}
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
              tooltip={{
                title:
                  'The password must be at least 8 characters long, with at least 1 uppercase letter, 1 uppercase letter, 1 number and 1 symbol',
                icon: <InfoCircleOutlined />,
              }}
            >
              <Input.Password className={style.input} />
            </Form.Item>

            <Form.Item
              className={style.input_label}
              name="usergender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender!' }]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              className={style.input_label}
              name="userage"
              label="Age"
              rules={[{ required: true, message: 'Please input your age!', type: 'number' }]}
              tooltip={{
                title: 'The age must be more than 10 and less than 100.',
                icon: <InfoCircleOutlined />,
              }}
            >
              <InputNumber min={10} max={100} />
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
