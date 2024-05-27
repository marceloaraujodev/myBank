import { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';


export default function Transfers() {
  const { setBalance, setUserInfo } = useContext(UserContext);
  const [transferTo, setTransferTo] = useState('');
  const [amount, setAmount] = useState('');

  async function transfer() {
    const res = await axios.post('http://localhost:4000/api/v1/transfer', 
      {email: transferTo, transferAmount: amount},
      {withCredentials: true}
    )
    setBalance(res.data.userInfo.balance)
    setUserInfo(res.data.userInfo)
    // console.log(res.data)
  }

  return (
    <div className="operation operation--transfer">
      <h2>Transfer money</h2>
      <form className="form form--transfer">
        <input
          onChange={(e) => {
            setTransferTo(e.target.value);
          }}
          value={transferTo}
          type="text"
          className="form__input form__input--to"
        />
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
          type="number"
          className="form__input form__input--amount"
        />
        <button onClick={(e) => { 
            e.preventDefault()
            transfer();
          }} className="form__btn form__btn--transfer">
          &rarr;
        </button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}
