import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import clearCookiesLocalStorage from './utils/clearCookiesLocalStorage';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customerName, setCustomerName] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [interest, setInterest] = useState(null);
  const [toggle, setToggle] = useState(true)

  const navigate = useNavigate();

  // 'http://localhost:4000/api/v1/logout' // development

  useEffect(() => {

    async function checkAuthentication() {
      try {
        const res = await axios.get('https://mybank-x2pk.onrender.com/api/v1/checkauth', {
          withCredentials: true
        });
        // console.log(res.data)
        if(res.data.success){
          setIsAuthorized(true)
          setCustomerName(res.data.userInfo.name)
          setBalance(res.data.userInfo.balance)
          setUserInfo(res.data.userInfo)
          // console.log(res.data.userInfo)
        }else{
          setIsAuthorized(false)
        } 
      } catch (error) {
        console.log(error, 'controlled error')
      }
    }
    checkAuthentication();
  }, []);
 

  // users login
  async function login(userEmail, password) {
    try {
      const res = await axios.post('https://mybank-x2pk.onrender.com/api/v1/login', 
        { userEmail, password },
        { withCredentials: true }
      );

      if(res.data){
        setUserInfo(res.data.user)
        setIsAuthorized(true);
        setCustomerName(res.data.user.name);
        setBalance(res.data.user.balance)
        setCustomerId(res.data.user._id)
        localStorage.setItem('token', res.data.token);
        // console.log(res.data.user)
        navigate('/');
      } 
    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
    }
  }

  // user logout
  async function logout(){
    const res = await axios.post('https://mybank-x2pk.onrender.com/api/v1/logout', 
    { withCredentials: true }
   );
    // console.log('this is res logout', res)
    setCustomerName(null);
    setIsAuthorized(false);
    clearCookiesLocalStorage()
  }

  async function deleteAccount(){
    alert("Are you sure you want to delete your account? This is permanent and cannot be undone.")
    await axios.delete('https://mybank-x2pk.onrender.com/api/v1/delete', 
    {withCredentials: true}
   );
   clearCookiesLocalStorage();
   setIsAuthorized(false);
   alert('Your account has be successfully deleted. Thank you for you bussiness')
  }

  async function register(userName, email, password) {

    const res = await axios.post('https://mybank-x2pk.onrender.com/api/v1/register', {
      userName,
      email,
      password,
    },
    {withCredentials: true});
    // console.log(res.data)
    if (res.status === 200) {
      setUserInfo(res.data.user)
      setIsAuthorized(true);
      navigate('/');
      setCustomerName(userName)
    }
    if(res.data.success === false){
      alert(res.data.message)
      setIsAuthorized(false);
      navigate('/register')
    }
  }

  async function transfer(transferTo, amount) {
    const res = await axios.post('https://mybank-x2pk.onrender.com/api/v1/transfer', 
      {email: transferTo, transferAmount: amount},
      {withCredentials: true}
    )
    // console.log(transferTo, amount)
    // console.log(res.data)
    setBalance(res.data.userInfo.balance)
    setUserInfo(res.data.userInfo)
    alert('Your transfer was Successfull')
    // console.log(balance)
    // console.log(userInfo)
  }

  async function requestLoan(amount){ 
    console.log(amount)
    const res = await axios.post('https://mybank-x2pk.onrender.com/api/v1/loans',
    { loanAmount: amount},
    { withCredentials: true }
   )
   console.log(res.data)
    alert('Your loan request was approved!');
    setBalance(res.data.userInfo.balance)
    setUserInfo(res.data.userInfo)
  }
  
  return (
    <UserContext.Provider value={{
      isAuthorized, 
      setIsAuthorized, 
      customerName, 
      setCustomerName,
      login,
      logout,
      balance, 
      setBalance,
      customerId,
      userInfo,
      setUserInfo,
      interest,
      setInterest,
      toggle,
      setToggle,
      deleteAccount,
      register,
      transfer,
      requestLoan
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;