/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function Nav() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthorized, customerName, login, logout, isLoadingLogin } =
    useContext(UserContext);

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
                }}
              >
                Login
              </a>{' '}
              or{' '}
              <a
                onClick={() => {
                  navigate('/register');
                }}
              >
                Register
              </a>
            </p>
            <img src="logo.png" alt="Logo" className="logo" />
            {isLoadingLogin ? (
              <form className="login">
                <Spinner />
              </form>
            ) : (
              <div className="form-container">
                <form className="login">
                  <div>
                    <input
                      disabled={isLoadingLogin ? true : false}
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                      }}
                      value={userEmail}
                      type="text"
                      placeholder="email"
                      className="login__input login__input--user"
                    />

                    <input
                      disabled={isLoadingLogin ? true : false}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      placeholder="PIN"
                      maxLength="4"
                      className="login__input login__input--pin"
                    />
                  </div>
                  <div className="forgot-password">
                    <a onClick={() => {
                  navigate('/forgotpassword');
                }}>Forgot Password</a>
                  </div>
                </form>
                <button
                  disabled={isLoadingLogin ? true : false}
                  onClick={(e) => {
                    e.preventDefault();
                    login(userEmail, password);
                    setUserEmail('');
                    setPassword('');
                  }}
                  className="login__btn"
                >
                  &rarr;
                </button>
              </div>
            )}
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
              className="login__btn"
            >
              Logout &rarr;
            </button>
          </>
        )}
      </nav>
    </>
  );
}
