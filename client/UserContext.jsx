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
  const [toggle, setToggle] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const navigate = useNavigate();

  const development = false;
  // 'http://localhost:4000/api/v1/logout' // development
  // https://mybank-x2pk.onrender.com
  const url = 'https://mybank-x2pk.onrender.com'
  const devUrl = 'http://localhost:4000'
  // console.log(url)

  useEffect(() => {

    async function checkAuthentication() {
      try {
        console.log(`${development ? devUrl : url}`)
        const res = await axios.get(`${development ? devUrl : url}/api/v1/checkauth`, {
          withCredentials: true
        });

        if(res.data.success){
          setIsAuthorized(true)
          setCustomerName(res.data.userInfo.name)
          setBalance(res.data.userInfo.balance)
          setUserInfo(res.data.userInfo);
        }else{
          setIsAuthorized(false);
        } 
      } catch (error) {
        console.log(error, 'controlled error')
      }
    }
    checkAuthentication();
  }, []);
 
  // users login
  async function login(userEmail, password) {
    setIsLoading(true);
    try {
      const res = await axios.post(`${development ? devUrl : url}/api/v1/login`, 
        { userEmail, password },
        { withCredentials: true }
      );

      if(res.data){
        setUserInfo(res.data.user)
        setIsAuthorized(true);
        setCustomerName(res.data.user.name);
        setBalance(res.data.user.balance)
        setCustomerId(res.data.user._id)
        // console.log(res.data.user)
        navigate('/');
        setIsLoading(false);
      } 
    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
      setIsLoading(false);
    }
  }

  // user logout
  async function logout(){
    const res = await axios.post(`${development ? devUrl : url}/api/v1/logout`, 
    {},
    { withCredentials: true }
   );

    setCustomerName(null);
    setIsAuthorized(false);
    clearCookiesLocalStorage()
  }

  async function deleteAccount(){
    alert("Are you sure you want to delete your account? This is permanent and cannot be undone.")
    await axios.delete(`${development ? devUrl : url}/api/v1/delete`, 
    {withCredentials: true}
   );
   clearCookiesLocalStorage();
   setIsAuthorized(false);
   alert('Your account has be successfully deleted. Thank you for you bussiness')
  }

  async function register(userName, email, password) {
    setIsLoadingRegister(true);
    const res = await axios.post(`${development ? devUrl : url}/api/v1/register`, {
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
      setCustomerName(userName);
      setIsLoadingRegister(false);
    }
    if(res.data.success === false){
      alert(res.data.message)
      setIsAuthorized(false);
      navigate('/register');
      setIsLoadingRegister(false);
    }
  }

  async function requestLoan(amount) {

    const res = await axios.post(
      `${development ? devUrl : url}/api/v1/loans`,
      { loanAmount: amount },
      { withCredentials: true }
    );

    setBalance(Number(balance) + Number(amount))
    alert('Your loan request was approved!');
    setBalance(res.data.userInfo.balance)
    setUserInfo(res.data.userInfo)
  }

  async function transfer(transferTo, amount) {
    const res = await axios.post(`${development ? devUrl : url}/api/v1/transfer`, 
      {email: transferTo, transferAmount: amount},
      {withCredentials: true}
    )
    setBalance(res.data.userInfo.balance)
    setUserInfo(res.data.userInfo)
    alert('Your transfer was Successfull')
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
      requestLoan,
      transfer,
      isLoadingLogin, 
      setIsLoadingLogin,
      isLoadingRegister,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;