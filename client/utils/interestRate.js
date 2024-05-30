
export default function calcInterstRate(userInfo) {
//   // const oneYearAgo = new Date();
//   // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

//   // console.log(oneYearAgo);

//   const interestRate = 12
//   const totalInterest = userInfo.transactions
//   .filter(transaction => transaction.transactionType === 'deposit')
//   .map(deposit => {
//     const depositDate = new Date(deposit.day);
//     // const depositDate = new Date(oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1));
//     const currentDate = new Date();
//     const timeDifference = currentDate - depositDate;
//     const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
//     const monthsDifference = daysDifference / 30; // Approximate number of months
//     return (deposit.amount * (interestRate / 12) * monthsDifference) / 100;
//   })
//   .reduce((acc, interest) => acc + interest, 0);

// return totalInterest

const interestRate = 12; // Annual interest rate

  const totalInterest = userInfo.transactions
    .filter(transaction => transaction.transactionType === 'deposit')
    .map(deposit => {
      const depositDate = new Date(deposit.day);
      const currentDate = new Date();
      
      // Calculate the difference in milliseconds
      const timeDifference = currentDate - depositDate;
      
      // Calculate the difference in days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      
      // Calculate the difference in months (approximation)
      const monthsDifference = Math.floor(daysDifference / 30); // Using Math.floor to get complete months
      
      // Only calculate interest if at least one month has passed
      if (monthsDifference > 0) {
        return (deposit.amount * (interestRate / 12) * monthsDifference) / 100;
      } else {
        return 0; // No interest for deposits less than a month old
      }
    })
    .reduce((acc, interest) => acc + interest, 0);

  return totalInterest;

}
