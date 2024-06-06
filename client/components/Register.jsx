import { useState, useContext } from 'react';
import Nav from './Nav';
import UserContext from '../UserContext';
import Spinner from './Spinner';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { 
    isAuthorized, 
    register,
    isLoadingRegister,  
  } = useContext(UserContext);

  return (
    <>
      <Nav />

      {!isAuthorized && (
        <div className="center">
        
        {isLoadingRegister ? (
          <form className="login register">
              <Spinner />
              </form>
        ) : (
          <>

          <form className="login register">
          <p className="welcome small">
                <a
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  Register
                </a>
              </p>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="text"
              placeholder="email"
              className="login__input login__input--user registration"
            />
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              type="text"
              placeholder="user"
              className="login__input login__input--user registration"
            />

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type="password"
              placeholder="PIN"
              maxLength="4"
              className="login__input login__input--pin registration"
            />
            <div className='register-btn'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  register(userName, email, password)
                }}
                className="login__btn visible">
                &rarr;
              </button>
            </div>
          </form>
        
          </>
        )}
         
        </div>
      )}
    </>
  );
}
