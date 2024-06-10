
// Function to calculate interest rate
export default function calcInterestRate(userInfo) {
  const interestRate = 12; // 12% APR
  const transactions = userInfo.transactions;

  let totalInterest = 0;

  transactions.forEach(transaction => {
    if (transaction.transactionType === 'deposit') {
      const depositDate = new Date(transaction.day);
      const currentDate = new Date();

      // Calculate the time difference in months
      const timeDifference = currentDate - depositDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      const monthsDifference = daysDifference / 30; // Approximate number of months

      // Calculate interest for this deposit
      const monthlyInterestRate = interestRate / 12 / 100;
      const depositInterest = transaction.amount * monthlyInterestRate * monthsDifference;

      totalInterest += depositInterest;
    }
  });

  return totalInterest / 100; // Convert back to dollars
}
