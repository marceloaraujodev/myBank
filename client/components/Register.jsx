import { useState, useContext } from 'react';
import Nav from './Nav';
import AuthContext from '../UserContext';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthorized, register } =
    useContext(AuthContext);


  


  return (
    <>
      <Nav />

      {!isAuthorized && (
        <div className="center">
          <form className="login register">
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
            <button
              onClick={(e) => {
                e.preventDefault();
                register(userName, email, password)
              }}
              className="login__btn">
              &rarr;
            </button>
          </form>
        </div>
      )}
    </>
  );
}
