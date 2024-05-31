import { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';

export default function Loans() {
  const [amount, setAmount] = useState('');
  const {
    setBalance,
    balance,
    setUserInfo,
    requestLoan
  } = useContext(UserContext)

  async function requestLoan() {

    const res = await axios.post(
      'https://mybank-x2pk.onrender.com/api/v1/loans',
      { loanAmount: amount },
      { withCredentials: true }
    );

   console.log(res.data)
  //   setBalance(Number(balance) + Number(amount))
  //   alert('Your loan request was approved!');
  //   setBalance(res.data.userInfo.balance)
  //   setUserInfo(res.data.userInfo)
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
            requestLoan(amount);
            // setAmount('');
          }} className="form__btn form__btn--loan">&rarr;</button>
      <label className="form__label form__label--loan">Amount</label>
    </form>
  </div>
  )
}
