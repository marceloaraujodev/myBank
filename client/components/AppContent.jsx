import { useContext, useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Balance from '../components/Balance';
import Movements from '../components/Movements';
import Summary from '../components/Summary';
import Transfers from '../components/Transfers';
import Loans from '../components/Loans';
import CloseAccount from '../components/CloseAccount';
import LogoutTimer from '../components/LogoutTimer';
import AuthContext from '../AuthContext';

export default function AppContent() {
  const { isAuthorized } = useContext(AuthContext);
  const [fadeIn, setFadeIn] = useState(false);
  
  
  useEffect(() => {
    console.log('isAuthorized changed', isAuthorized)
    if(isAuthorized){
      setTimeout(() => {
        setFadeIn(true);
      }, 100);
    }
  }, [isAuthorized])

  return (
    <>
      <Nav />   
      {isAuthorized && (
        <main className={`app ${fadeIn ? 'fade-in' : ''}`}>
          <Balance />
          <Movements />
          <Summary />
          <Transfers />
          <Loans />
          <CloseAccount />
          <LogoutTimer />
        </main>
      )}
      
    </>
  );
}
