import React, { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import useLocalStorage from '../../hooks/useLocalStorage';

function LimitPrivateAccess({ children }) {
  const { getItem } = useLocalStorage('token');
  const isAuth = getItem();

  return !isAuth ? children : <Navigate to="/" replace />;
}

export default LimitPrivateAccess;

LimitPrivateAccess.propTypes = {
  children: PropTypes.element.isRequired,
};
