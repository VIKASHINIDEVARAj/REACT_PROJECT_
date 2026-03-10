import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // App load aagum pothu thideernu login page-ku thuratha koodathu
  if (loading) return <div className="mt-20 text-xl font-bold text-center">Loading...</div>;

  // User illana (login pannalana), avangala Login page-ku thorathi vidu!
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User iruntha, ulla vidu (render the child component)
  return children;
};

export default ProtectedRoute;