/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    isAuthorized,
    customerName,
    login,
    logout,
  } = useContext(UserContext);

  const navigate = useNavigate();


  return (
    <>
      <nav>
        {!isAuthorized && (
          <>
            <p className="welcome">
              <a
                onClick={() => {
                  navigate('/');
                }}>
                Login
              </a>{' '}
              or{' '}
              <a
                onClick={() => {
                  navigate('/register');
                }}>
                Register
              </a>
            </p>
            <img src="logo.png" alt="Logo" className="logo" />
            <form className="login">
              <input
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                value={userEmail}
                type="text"
                placeholder="email"
                className="login__input login__input--user"
              />

              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                placeholder="PIN"
                maxLength="4"
                className="login__input login__input--pin"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  login(userEmail, password);
                  setUserEmail('');
                  setPassword('');
                }}
                className="login__btn">
                &rarr;
              </button>
            </form>
          </>
        )}

        {isAuthorized && (
          <>
            <p className="welcome">
              Welcome{' '}
              {customerName?.charAt(0).toUpperCase() + customerName?.slice(1)}
            </p>
            <img src="logo.png" alt="Logo" className="logo" />
            <button
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
              className="login__btn">
              Logout &rarr;
            </button>
          </>
        )}
      </nav>
    </>
  );
}
