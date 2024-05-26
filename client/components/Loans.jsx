import { useState, useContext } from 'react';
import UserContext from '../UserContext';
import axios from 'axios';

export default function Loans() {
  const [amount, setAmount] = useState('');
  const {
    setBalance,
    balance,
    customerId
  } = useContext(UserContext)

  function requestLoan(){
    setAmount(amount)
    setBalance(Number(balance) + Number(amount))
    updateBalance()
  }

  async function updateBalance(){
    await axios.post('http://localhost:4000/api/v1/loans',
    {id: customerId, loanAmount: amount},
    { withCredentials: true }
    )
  }

  return (
    <div className="operation operation--loan">
    <h2>Request loan</h2>
    <form className="form form--loan">
      <input onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount} type="number" className="form__input form__input--loan-amount" />
      <button onClick={(e) => { 
            e.preventDefault()
            requestLoan();
          }} className="form__btn form__btn--loan">&rarr;</button>
      <label className="form__label form__label--loan">Amount</label>
    </form>
  </div>
  )
}
