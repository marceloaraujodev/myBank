/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import { set } from 'firebase/database';

export default function Nav() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const [customerName, setCustomerName] = useState(null);
  const [signup, setSignup] = useState(false);
 
  // add register route if email then /register and create a register function maybe create the sign in page after all

  async function login() {
    // request the backend to see if credentials are true
    // console.log(userName, password)
    const res = await axios.post('http://localhost:4000/api/v1/login', {
      userName, password
    });
    console.log(res.data);
    if(res.data.password === password){
      setIsAuthorized(true);
      setCustomerName(res.data.user)
    }
  }

  async function logout(){
    setIsAuthorized(false);
    setCustomerName(null);
  }


  return (
  <>
    <nav>
    {!isAuthorized && (
    <>
      <p className="welcome">Login or <a onClick={() => {
        setSignup(true);
      }}>signup</a></p>
      <img src="logo.png" alt="Logo" className="logo" />
      <form className="login">

      {signup && (
        <input
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          value={email}
          type="text"
          placeholder="email"
          className="login__input login__input--user"
        />

      )}

        <input
          onChange={(e) => {
            setUserName(e.target.value)
          }}
          value={userName}
          type="text"
          placeholder="user"
          className="login__input login__input--user"
        />

        <input
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          value={password}
          type="password"
          placeholder="PIN"
          maxLength="4"
          className="login__input login__input--pin"
        />
        <button onClick={(e) => {
          e.preventDefault();
          login()
          setUserName('');
          setPassword('');
          setSignup(false);
        }} className="login__btn">&rarr;</button>
      </form>
    </>
    )}

    {isAuthorized && (
      <>
      <p className="welcome">Welcome {customerName}</p>
      <img src="logo.png" alt="Logo" className="logo" />
      <button onClick={(e) => {
          e.preventDefault();
          logout()
        }} className="login__btn">Logout &rarr;</button>
      </>
    )}
  </nav>
  </>
  )
}
