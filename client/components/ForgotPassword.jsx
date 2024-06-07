import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Spinner from './Spinner';
import Nav from './Nav';
import Modal from './Modal';


export default function handleForgotPassword() {
  const [userEmail, setUserEmail] = useState('');
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);

  const { forgotPassword, isLoadingLogin, isOpen, setIsOpen } =
    useContext(UserContext);

    const navigate = useNavigate();

  return (
    <>     
        {isOpen && (
              <Modal message='Please check your email'>
                <button onClick={() => {
                  setIsOpen(false)
                  navigate('/')
                }} className='modal-btn'>Close</button>
              </Modal>
            )}
        <Nav />
          <div className="center">
            <div className="container-small">
              <p className="welcome small">
                Fogort Password
              </p>

              {(isLoadingLogin && isLoadingForgot) ? (
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
                    </div>
                  </form>

                    <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(true);
                  forgotPassword(userEmail);
                  setUserEmail('');
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
  );
}
