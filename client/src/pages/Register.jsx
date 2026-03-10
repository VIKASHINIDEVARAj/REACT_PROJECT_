import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      // Puthusa Register aanathum QR generate panna Create Pass page pogum
      navigate('/create-pass');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed, kiddo!');
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Glowing Orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[700px] bg-gradient-to-bl from-blue-500 via-purple-500 to-emerald-400 rounded-full blur-[120px] opacity-40 mix-blend-screen pointer-events-none transform translate-x-1/3 -translate-y-1/4"></div>

      {/* Main Glassmorphic Card */}
      <div className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 max-w-md w-full relative z-10 shadow-2xl">
        
        {/* Top Toggle (Sign up / Sign in) */}
        <div className="bg-black/50 rounded-full p-1 flex justify-between items-center w-[200px] mb-8 border border-white/5">
          <div className="bg-[#242424] text-white text-sm font-medium py-2 px-4 rounded-full w-1/2 text-center shadow-md">
            Sign up
          </div>
          <Link to="/login" className="w-1/2 px-4 py-2 text-sm font-medium text-center text-gray-400 transition rounded-full hover:text-white">
            Sign in
          </Link>
        </div>

        <h2 className="mb-8 text-3xl font-semibold text-white">Create an account</h2>

        {error && <div className="px-4 py-2 mb-6 text-sm text-center text-red-400 border bg-red-500/10 border-red-500/50 rounded-xl">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1c1c1e] text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none border border-transparent focus:border-white/20 focus:bg-[#242426] transition-all"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1c1c1e] text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none border border-transparent focus:border-white/20 focus:bg-[#242426] transition-all"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1c1c1e] text-white placeholder-gray-500 rounded-2xl px-5 py-4 outline-none border border-transparent focus:border-white/20 focus:bg-[#242426] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-4 font-semibold text-black transition-colors duration-300 bg-white rounded-2xl hover:bg-gray-200"
          >
            Create an account
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default Register;