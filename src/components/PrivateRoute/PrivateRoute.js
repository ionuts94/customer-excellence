import React, { useState, useEffect } from 'react';
import { getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, fallbackRoute }) => {
  const location = useLocation();
  const firebaseApp = getApp();
  const auth = getAuth(firebaseApp);
  
  const [user, setUser] = useState(auth.currentUser || '!fetched');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    } else {
      setUser(null);
    }
  });

  if (user === '!fetched') {
    // If user is not fully fetched then return an empty fragment
    return <></>
  }
  else if (!user) {
    // If user is fetched but the user is not authenticated then redirect the user to a fallback route
    return <Navigate to={fallbackRoute} state={{ from: location }} />;
  } else {
    // If user is fetched and authenticated then inject current signed user to children
    const withAuthChildren = React.Children.toArray(children).map(child => {
      return React.cloneElement(child, {
        ...child.props,
        authUser: auth.currentUser
      })
    })

    return withAuthChildren;
  }
}

export default PrivateRoute;