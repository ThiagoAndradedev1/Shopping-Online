import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import AuthContext from './authContext';

const AuthState = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [passwordContext, setPasswordContext] = useState('');
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, passwordContext, setPasswordContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
