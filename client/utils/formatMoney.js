export default function formatter(amount){
  return (amount /100).toLocaleString('en-US',{
    style: 'currency',
    currency: 'USD'
  })
}