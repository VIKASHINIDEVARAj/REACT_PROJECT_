import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Guard-a ulla kondu varom!
import Ticket from './pages/Ticket'; 
import CreatePass from './pages/CreatePass';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        {/* Open Routes - Yaar venaalum paakalam */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ticket/:id" element={<Ticket />} />
        <Route path="/create-pass" element={<CreatePass />} />
       
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;