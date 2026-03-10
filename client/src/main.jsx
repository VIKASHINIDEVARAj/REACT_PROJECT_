import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Tailwind CSS inga thaan ulla varuthu
import { AuthProvider } from './context/AuthContext.jsx'; // Namma Water Tank

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* App-a namma Water Tank kulla vachidrom. Ippo ellarukkum thanni kedaikkum! */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);