import { useContext } from 'react';
import UserContext from '../UserContext';
import dateFormat, {masks} from 'dateformat';

export default function Balance() {
  const {
    // balance,
    userInfo
  } = useContext(UserContext);

  const balanceInDollars = userInfo.balance / 100;
  // usd styled
  const formater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  // formats the balance value to usd style
  const formattedBalance = formater.format(balanceInDollars);

  // Date format
  const date = new Date();
  const formatedDate = dateFormat(date, "mm/dd/yyyy"); 

  return (
    <div className="balance">
    <div>
      <p className="balance__label">Current balance</p>
      <p className="balance__date">
        As of <span className="date">{formatedDate}</span>
      </p>
    </div>
    {/* $10,000.00 */}
    <p className="balance__value">{formattedBalance}</p>
  </div>
  )
}
