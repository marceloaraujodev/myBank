
export default function calcInterstRate(userInfo) {
  // const oneYearAgo = new Date();
  // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // console.log(oneYearAgo);

  const interestRate = 12
  const totalInterest = userInfo.transactions
  .filter(transaction => transaction.transactionType === 'deposit')
  .map(deposit => {
    const depositDate = new Date(deposit.day);
    // const depositDate = new Date(oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1));
    const currentDate = new Date();
    const timeDifference = currentDate - depositDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const monthsDifference = daysDifference / 30; // Approximate number of months
    return (deposit.amount * (interestRate / 12) * monthsDifference) / 100;
  })
  .reduce((acc, interest) => acc + interest, 0);

return totalInterest

}
