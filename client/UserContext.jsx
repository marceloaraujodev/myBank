import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customerName, setCustomerName] = useState(null);
  const [balance, setBalance] = useState(10000);


  useEffect(() => {
    async function checkAuthentication() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // You may need to verify the token on the server side for additional security
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error.message);
      }
    }
  
    checkAuthentication();
  }, []);
  

  // users login
  async function login(userEmail, password) {
    try {
      // request the backend to see if credentials are true
      // console.log(userEmail, password)
      const res = await axios.post('http://localhost:4000/api/v1/login', 
        { userEmail, password },
        { withCredentials: true }
      );
      console.log(res.data);
      if(res.data){
        setIsAuthorized(true);
        setCustomerName(res.data.user.user)
        localStorage.setItem('token', res.data.token);
      } 
    } catch (error) {
      console.log(error.response.data.message)
      alert(error.response.data.message)
    }
  }

  // user logout
  async function logout(){
    localStorage.removeItem('token');
    const res = await axios.post('http://localhost:4000/api/v1/logout', 
    { withCredentials: true }
  );
    console.log('this is res logout', res)
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
      setBalance
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext;