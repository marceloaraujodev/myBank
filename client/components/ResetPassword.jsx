import { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import Spinner from './Spinner';
import Nav from './Nav';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Modal';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkPass, setCheckPass] = useState(false);
  const { token } = useParams();

  // console.log('this is token', token);

  useEffect(() => {}, [checkPass])

  const { isLoadingLogin, resetPassword, isOpen, setIsOpen } =
    useContext(UserContext);
  const navigate = useNavigate();

  function handleClick(){
    if(password !== confirmPassword){
      setCheckPass(true);
      setIsOpen(true);
      return
    }else{
      setCheckPass(false);
      setIsOpen(true);
      resetPassword(password, token);
    }
  }

    return (
    <>
      {/* {isOpen && !checkPass && ( */}
      {isOpen && !checkPass && (
        <Modal message="You password as been reset!">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/');
            }}
            className="modal-btn"
          >
            Close
          </button>
        </Modal>
      )}

      {isOpen && checkPass && (
        <Modal message="Password does not match.">
          <button
            onClick={() => {
              setIsOpen(false);
              setCheckPass(false)
            }}
            className="modal-btn"
          >
            Close
          </button>
        </Modal>
      )}
      <Nav />
      <div className="center">
        <div className="container-small">
          <p className="welcome small reset-password-title">Reset Password</p>

          {isLoadingLogin ? (
            <form className="login">
              <div className="isLoadingLoginContainer">
                <Spinner />
              </div>
            </form>
          ) : (
            <div className="form-outer-container">
              <form className="login login-small">
                <div className="input-container-small gap">
                  <div className="new-pass">
                    <label className="mb">New Password</label>
                    <input
                      disabled={isLoadingLogin ? true : false}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      value={password}
                      type="password"
                      placeholder="PIN"
                      maxLength="4"
                      className="login__input login__input--pin reset-pass"
                    />
                  </div>
                  <div className="new-pass">
                    <label className="mb">Confirm Password</label>
                    <input
                      disabled={isLoadingLogin ? true : false}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      value={confirmPassword}
                      type="password"
                      placeholder="PIN"
                      maxLength="4"
                      className="login__input login__input--pin reset-pass"
                    />
                  </div>
                </div>
              </form>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClick()
            }}
            className="login__btn small reset-pass-btn"
          >
            &rarr;
          </button>
        </div>
      </div>
    </>
  );
}
