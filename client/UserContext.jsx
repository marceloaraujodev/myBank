import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customerName, setCustomerName] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [balance, setBalance] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [interest, setInterest] = useState(null);
  const [toggle, setToggle] = useState(true)

  // missin : transfer money to,  close account  and movements, also session timer

  useEffect(() => {

    async function checkAuthentication() {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/checkauth', {
          withCredentials: true
        });
        // console.log(res.data)
        if(res.data.success){
          // setUserInfo(res.data.userInfo)
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
      const res = await axios.post('http://localhost:4000/api/v1/login', 
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
      } 
    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
    }
  }

  // user logout
  async function logout(){
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    localStorage.removeItem('token');
    localStorage.removeItem('logout-timer');
    const res = await axios.post('http://localhost:4000/api/v1/logout', 
    { withCredentials: true }
    );
    // console.log('this is res logout', res)
    setCustomerName(null);
    setIsAuthorized(false);

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
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;