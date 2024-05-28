import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import formatMoney from '../utils/formatMoney';
import calcInterstRate from "../utils/interestRate";

export default function Summary() {
  const [deposits, setDeposits] = useState();
  const [withdrawals, setWithdrawal] = useState();
  const [interest, setInterest] = useState();
  const {userInfo, setToggle, toggle} = useContext(UserContext);

  useEffect(() => {
   let totalDeposits = 0;
   let totalWithdrawals = 0;

   userInfo.transactions.forEach(transaction => {
    // console.log(transaction)
    if(transaction.transactionType === 'deposit'){
      // console.log(transaction.transactionType)
      totalDeposits += transaction.amount
    }else{
      // console.log(transaction.transactionType)
      totalWithdrawals -= transaction.amount
    }
  })
  // console.log(formatMoney(totalDeposits))
  setDeposits(formatMoney(totalDeposits))
  setWithdrawal(formatMoney(totalWithdrawals))
  setInterest(calcInterstRate(userInfo).toFixed(2))

  // const lastTransactionDay = userInfo.transactions[userInfo.transactions.length -1].day;
  // const lastTransactionDate = new Date(lastTransactionDay).toLocaleString('en-US');
  // console.log('last Transaction Date:', lastTransactionDate)

  }, [])

  function handleSort(){
    console.log('click')
    setToggle(!toggle)
  }


  return (
   <div className="summary">
    <p className="summary__label">In</p>
    <p className="summary__value summary__value--in">{deposits}</p>
    <p className="summary__label">Out</p>
    <p className="summary__value summary__value--out">{withdrawals}</p>
    <p className="summary__label">Interest</p>
    <p className="summary__value summary__value--interest">${interest}</p>
    <button className="btn--sort" onClick={handleSort}>{toggle ? '↑ SORT' : '↓ SORT'}</button>
  </div>
  )
}
