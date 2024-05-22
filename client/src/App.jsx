import Nav from '../components/Nav';
import Balance from '../components/Balance';
import Movements from '../components/Movements';
import Summary from '../components/Summary';
import Transfers from '../components/Transfers';
import Loans from '../components/Loans';
import CloseAccount from '../components/CloseAccount';
import LogoutTimer from '../components/LogoutTimer';
import { AuthProvider } from '../AuthContext';
import './App.css';
import AppContent from '../components/AppContent';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
