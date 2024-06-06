import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from '../components/Register';
import HomePage from '../components/HomePage';
import { UserProvider } from '../UserContext';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';


function App() {
  
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/forgotpassword' element={<ForgotPassword />} />
          <Route exact path='/resetpassword/:token' element={<ResetPassword />} />

        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
