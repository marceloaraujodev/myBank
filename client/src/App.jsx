import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../AuthContext';
import './App.css';
import Register from '../components/Register';
import HomePage from '../components/HomePage';


function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
