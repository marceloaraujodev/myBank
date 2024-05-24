import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
import axios from 'axios';
import AuthContext from '../UserContext';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthorized, setIsAuthorized, setCustomerName } =
    useContext(AuthContext);

  const navigate = useNavigate();

  // after register create a session, will get the user name from the session to be used in the header
  async function register() {
    setCustomerName(userName);
    const res = await axios.post('http://localhost:4000/api/v1/register', {
      userName,
      email,
      password,
    });

    if (res.status === 200) {
      setIsAuthorized(true);
      navigate('/');
    }
    console.log(res.data, res);
  }

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
                register();
                // setUserName('');
                // setPassword('');
                // setEmail('');
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
