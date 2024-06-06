import { useContext, useEffect, useState } from 'react';
import Nav from './Nav';
import Balance from './Balance';
import Movements from './Movements';
import Summary from './Summary';
import Transfers from './Transfers';
import Loans from './Loans';
import CloseAccount from './CloseAccount';
import LogoutTimer from './LogoutTimer';
// import AuthContext from '../UserContext';
import UserContext from '../UserContext';
import LoginCell from './LoginCell';
import Modal from './Modal';
import ForgotPassword from './ForgotPassword';

export default function HomePage() {
  // const { isAuthorized } = useContext(AuthContext);
  const {isAuthorized, isOpen, setIsOpen, isLoan, isTransfer} = useContext(UserContext)
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // console.log('isAuthorized changed', isAuthorized);
    if (isAuthorized) {
      setTimeout(() => {
        setFadeIn(true);
      }, 100);
    }

  }, [isAuthorized]);

  return (
    <>
      <Nav />

      <LoginCell />

      {isAuthorized && (
        <>
        {isOpen && isLoan && (
              <Modal message='Your loan request was approved!'>
                <button onClick={() => setIsOpen(!isOpen)} className='modal-btn'>Close</button>
              </Modal>

            )}
        {isOpen && isTransfer && (
              <Modal message='Your transfer was successful!'>
                <button onClick={() => setIsOpen(!isOpen)} className='modal-btn'>Close</button>
              </Modal>

            )}
        <main className={`app ${fadeIn ? 'fade-in' : ''}`}>
          <Balance />
          <Movements />
          <Summary />
          <Transfers />
          <Loans />
          <CloseAccount />
          <LogoutTimer />
        </main>
        </>
      )}
    </>
  );
}
