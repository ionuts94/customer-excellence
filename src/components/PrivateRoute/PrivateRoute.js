// React and utils
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, fallbackRoute }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={fallbackRoute} state={{ from: location }} />;
  } else {
    return children;
  }
}

export default PrivateRoute;