/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { 
    isAuthorized, 
    setIsAuthorized, 
    customerName,
    setCustomerName 
  } = useContext(AuthContext);

  const navigate = useNavigate();

  async function login() {
    try {
      // request the backend to see if credentials are true
      // console.log(userName, password)
      const res = await axios.post('http://localhost:4000/api/v1/login', {
        userName, password
      });
      // console.log(res.data);
      if(res.data){
        setIsAuthorized(true);
        setCustomerName(res.data.user)
      }
      
    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
    }
  }

  async function logout(){
    setIsAuthorized(false);
    setCustomerName(null);
  }

useEffect(()=> {

}, [customerName])

  return (
  <>
    <nav>
    {!isAuthorized && (
    <>
      <p className="welcome"><a onClick={() => {
          navigate('/')
        }}>Login</a> or <a onClick={() => {
        navigate('/register')
      }}>Register</a></p>
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
          setUserName('');
          setPassword('');
        }} className="login__btn">&rarr;</button>
      </form>
    </>
    )}

    {isAuthorized && (
      <>
      <p className="welcome">Welcome {customerName?.charAt(0).toUpperCase() + customerName?.slice(1)}</p>
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
