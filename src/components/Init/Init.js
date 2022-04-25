//React and utils
import React, { useState, useEffect } from 'react';
import { auth } from '../../actions/init';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Redux
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/auth';

const Init = ({ children }) => {
  const dispatch = useDispatch();

  const [isInited, setIsInited] = useState(false);
  const [user, setUser] = useState(auth.currentUser || '!fetched');
 
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setAuth({
        isAuthenticated: true,
        email: user.email,
        displayName: user.displayName,
        uid: user.uid
      }));
      setUser(user);
    } else {
      dispatch(setAuth(false));
      setUser(null);
    }
  });

  useEffect(() => {
    if ((user && user !== '!fetched') || !user) {
      setIsInited(true);
    }
  }, [user])


  return isInited 
    ? children
    : <h1>Loading...</h1>
}

export default Init