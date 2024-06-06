import { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import Modal from './Modal';

export default function LoginCell() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { isAuthorized, customerName, login, logout, isLoadingLogin, isOpen } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleSmallScreens = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleSmallScreens);

    // clean up
    return () => {
      window.removeEventListener('resize', handleSmallScreens);
    };
  }, []);

  if (windowWidth >= 768) {
    return null;
  }

  return (
    <>
      {!isAuthorized && (
        <>
          <div className="center">
            <div className="container-small">
              <p className="welcome small">
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

              {isLoadingLogin ? (
                <form className="login">
                  <div className="isLoadingLoginContainer">
                    <Spinner />
                  </div>
                </form>
              ) : (
                <div className="form-outer-container">
                  <form className="login login-small">
                    <div className="input-container-small">
                      <input
                        onChange={(e) => {
                          setUserEmail(e.target.value);
                        }}
                        value={userEmail}
                        type="text"
                        placeholder="email"
                        className="login__input login__input--user small"
                      />

                      <input
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        value={password}
                        type="password"
                        placeholder="PIN"
                        maxLength="4"
                        className="login__input login__input--pin small"
                      />
                    </div>
                    <div className="forgot-small">Forgot Password</div>
                  </form>

                    <button
                onClick={(e) => {
                  e.preventDefault();
                  login(userEmail, password);
                  setUserEmail('');
                  setPassword('');
                }}
                className="login__btn small"
              >
                &rarr;
              </button>
                </div>
              )}

            </div>
          </div>
        </>
      )}

      {isAuthorized && (
        <>
          <p className="welcome">
            Welcome{' '}
            {customerName?.charAt(0).toUpperCase() + customerName?.slice(1)}
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
            className="login__btn small logout"
          >
            Logout &rarr;
          </button>
        </>
      )}
    </>
  );
}
