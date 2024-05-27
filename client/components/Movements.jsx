import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import dateFormat, {masks} from "dateformat";
import formatMoney from '../utils/formatMoney';

export default function Movements() {
  const {userInfo, toggle} = useContext(UserContext)

  // console.log(userInfo.transactions)

  const {transactions} = userInfo;
  // console.log(transactions)

  const sortedTransactions = userInfo.transactions.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const sortArray = toggle ? sortedTransactions : transactions;

  return (
    <div className="movements">

    {sortArray.map((transaction, index) => {
      dateFormat(transaction.day, 'dd, mm, yyyy')
      
      return (
      <div key={index} className="movements__row">

        <div className={`movements__type movements__type--${transaction.transactionType === 'deposit' ? 'deposit' : 'withdrawal'}`}>{transaction.transactionType}</div>
        <div className="movements__date">{dateFormat(transaction.day, 'mm/dd/yyyy')}</div>
        <div className="movements__value">{formatMoney(transaction.amount)}</div>
      </div>
    )
    })}
    {/* <div className="movements__row">
      <div className="movements__type movements__type--withdrawal">
        1 withdrawal
      </div>
      <div className="movements__date">24/01/2037</div>
      <div className="movements__value">-$378.00</div>
    </div> */}
  </div>
  )
}
