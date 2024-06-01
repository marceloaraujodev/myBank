import { BarLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className='spinner'>
    <BarLoader
    color='#1e3a8a'
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
    speedMultiplier={1}
  />
    </div>
  )
}
