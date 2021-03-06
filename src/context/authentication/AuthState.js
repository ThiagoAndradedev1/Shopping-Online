import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import AuthContext from './authContext';
import Spinner from '../../components/layout/Spinner';

const AuthState = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [passwordContext, setPasswordContext] = useState('');
  const [orderDetails, setOrderDetails] = useState({});
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        passwordContext,
        setPasswordContext,
        setOrderDetails,
        orderDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
