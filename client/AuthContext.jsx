import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [customerName, setCustomerName] = useState(null);
  
  return (
    <AuthContext.Provider value={{isAuthorized, setIsAuthorized, customerName, setCustomerName}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;