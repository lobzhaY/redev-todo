import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
  LoginOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
} from '@ant-design/icons/lib/icons';

import useLocalStorage from '../../hooks/useLocalStorage';

import AuthContext from '../../context/authContext';

import style from './header.module.css';

function Header() {
  const navigate = useNavigate();

  const { removeItem } = useLocalStorage('token');
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    removeItem();
    setAuth(null);
    navigate('/');
  };

  return (
    <header className={style.header}>
      <Link to="/">
        <AppstoreOutlined className={style.icon} />
      </Link>
      {auth && (
        <Link to="/todo">
          <UserOutlined className={style.icon} />
        </Link>
      )}
      {!auth ? (
        <Link to="/auth">
          <LoginOutlined className={style.icon} />
        </Link>
      ) : (
        <Link to="/">
          <LogoutOutlined onClick={handleLogout} className={style.icon} />
        </Link>
      )}
    </header>
  );
}

export default Header;
