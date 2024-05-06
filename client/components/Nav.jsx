/* eslint-disable no-unused-vars */
import { useState } from 'react';

export default function Nav() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    // request the backend to see if credentials are true
    console.log(userName, password)

  }


  return (
    <nav>
    <p className="welcome">Log in to get started</p>
    <img src="logo.png" alt="Logo" className="logo" />
    <form className="login">
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
      }} className="login__btn">&rarr;</button>
    </form>
  </nav>
  )
}
