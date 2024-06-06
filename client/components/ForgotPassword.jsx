import { useState, useContext } from 'react';
import UserContext from '../UserContext';
import Spinner from './Spinner';
import Nav from './Nav';


export default function forgotPassword() {
  const [userEmail, setUserEmail] = useState('');

  const { resetPassword, isLoadingLogin } =
    useContext(UserContext);

  return (
    <>     
        <Nav />
          <div className="center">
            <div className="container-small">
              <p className="welcome small">
                Fogort Password
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
                    </div>
                  </form>

                    <button
                onClick={(e) => {
                  e.preventDefault();
                  resetPassword(userEmail);
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
