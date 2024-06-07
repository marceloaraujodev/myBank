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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoan, setIsLoan] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);



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
        // console.log(`${development ? devUrl : url}`)
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
          setIsLoadingLogin(false);
        } 
      } catch (error) {
        console.log(error, 'controlled error')
        
      }
    }
    checkAuthentication();
  }, []);
 
  // users login
  async function login(userEmail, password) {
    setIsLoadingLogin(true);
    try {
      const res = await axios.post(`${development ? devUrl : url}/api/v1/login`, 
        { userEmail, password },
        { withCredentials: true }
      );
      console.log(res.data)
      if(res.data.success){
        setUserInfo(res.data.user)
        setIsAuthorized(true);
        setCustomerName(res.data.user.name);
        setBalance(res.data.user.balance)
        setCustomerId(res.data.user._id)
        // console.log(res.data.user)
        navigate('/');
        setIsLoadingLogin(false);
      }else{
        setIsLoadingLogin(false);
      }
    } catch (error) {
      console.log(error)
      // setIsLoadingLogin(false); // if response from server is using 401 turn on 
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
    setBalance(res.data.userInfo.balance)
    setUserInfo(res.data.userInfo)
    setIsOpen(true);
    setIsLoan(true);
  }

  async function transfer(transferTo, amount) {
    const res = await axios.post(`${development ? devUrl : url}/api/v1/transfer`, 
      {email: transferTo, transferAmount: amount},
      {withCredentials: true}
    )
    setBalance(res.data.userInfo.balance)
    setUserInfo(res.data.userInfo)
    setIsOpen(true)
    setIsTransfer(true);
  }

  async function forgotPassword(email){
    try {
      console.log(email)
      const res = await axios.post(`${development ? devUrl : url}/api/v1/forgotpassword`, {email}
      )
      console.log(res.data)
      // // see what I will do after I have sent the user email to the backend
  
      // // check is response was successful, if so send user to passwordReset
      
    } catch (error) {
      console.log(error)
    }
  }

  async function resetPassword(password, token){
    console.log(password, token)
    const res = await axios.post(`${development ? devUrl : url}/api/v1/resetpassword/:token`, {password, token}
    )
    console.log(res.data);
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
      isOpen, 
      setIsOpen,
      isLoan,
      isTransfer,
      setIsLoan,
      setIsTransfer,
      resetPassword,
      forgotPassword
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;