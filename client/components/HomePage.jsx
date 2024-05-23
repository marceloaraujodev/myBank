import { useContext, useEffect, useState } from 'react';
import Nav from './Nav';
import Balance from './Balance';
import Movements from './Movements';
import Summary from './Summary';
import Transfers from './Transfers';
import Loans from './Loans';
import CloseAccount from './CloseAccount';
import LogoutTimer from './LogoutTimer';
import AuthContext from '../AuthContext';


export default function HomePage() {
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
