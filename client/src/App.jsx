import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from '../components/Register';
import HomePage from '../components/HomePage';
import { UserProvider } from '../UserContext';


function App() {
  
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
