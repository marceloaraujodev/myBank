import { useState } from 'react';

export default function CloseAccount() {
  const [confirmUser, setConfirmUser] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  function deleteUser(){
    // delete user in db
    console.log(confirmPin, confirmUser)
  }

  return (
    <div className="operation operation--close">
    <h2>Close account</h2>
    <form className="form form--close">
      <input         
        onChange={(e) => {
          setConfirmUser(e.target.value);
        }}
        value={confirmUser} 
        type="text" 
        className="form__input form__input--user" />

      <input
        onChange={(e) => {
          setConfirmPin(e.target.value);
        }}
        value={confirmPin}
        type="password"
        maxLength="6"
        className="form__input form__input--pin"
      />
      <button onClick={(e) => {
        e.preventDefault()
        deleteUser()
      }} className="form__btn form__btn--close">&rarr;</button>
      <label className="form__label">Confirm user</label>
      <label className="form__label">Confirm PIN</label>
    </form>
  </div>
  )
}
