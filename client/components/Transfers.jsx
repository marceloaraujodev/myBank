import { useState, useContext } from 'react';
import UserContext from '../UserContext';


export default function Transfers() {
  const { transfer } = useContext(UserContext);
  const [transferTo, setTransferTo] = useState('');
  const [amount, setAmount] = useState('');


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
            transfer(transferTo, amount);
            setTransferTo('');
            setAmount('');
          }} className="form__btn form__btn--transfer">
          &rarr;
        </button>
        <label className="form__label">Transfer to</label>
        <label className="form__label">Amount</label>
      </form>
    </div>
  );
}
