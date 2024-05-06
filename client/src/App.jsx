import Nav from '../components/Nav';
import Balance from '../components/Balance';
import Movements from '../components/Movements';
import Summary from '../components/Summary';
import Transfers from '../components/Transfers';
import Loans from '../components/Loans';
import CloseAccount from '../components/CloseAccount';
import LogoutTimer from '../components/LogoutTimer';
import './App.css'

function App() {


  return (
    <>
    <Nav />

    <main className="app">
      <Balance />
      <Movements />
      <Summary />
      <Transfers />
      <Loans />
      <CloseAccount />
      <LogoutTimer />
    </main>
    </>
  )
}

export default App
