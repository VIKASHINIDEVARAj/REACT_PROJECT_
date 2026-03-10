import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreatePass = () => {
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGeneratePass = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Pazhaya error-a clear panrom

    try {
      // 1. LocalStorage-la irunthu Token matrum User-a edukkurom
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      // Token illana udane login poga sollurom
      if (!token || !user) {
        setError("Authentication missing! Please login again.");
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      // 2. Data anuppumbothu 'headers'-la Token-a sethu anuppurom! (Idhu thaan magic fix)
      await API.post('/registrations', {
        name: user.name,
        email: user.email,
        phone,
        college
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Security guard-kku ID card kaatturom!
        }
      });
      
      // 3. Success aana udane Dashboard parakkurom!
      navigate('/dashboard');
    } catch (err) {
      console.error("QR Generation Error:", err.response || err);
      setError(err.response?.data?.message || 'Error generating pass, kiddo!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-76px)] bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="bg-[#121212]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 max-w-md w-full relative z-10 shadow-2xl">
        
        <div className="mb-8 text-center">
          <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-blue-500/20">
            Final Step 🚀
          </span>
          <h2 className="mt-6 mb-2 text-3xl font-bold text-white">Claim Your VIP Pass</h2>
          <p className="text-sm text-gray-400">Enter your details to generate your exclusive conference QR code.</p>
        </div>

        {/* Error vanthaa thelivaa red box-la kaattum, verengum redirect aagathu! */}
        {error && <div className="px-4 py-2 mb-6 text-sm text-center text-red-400 border bg-red-500/10 border-red-500/50 rounded-xl">{error}</div>}

        <form onSubmit={handleGeneratePass} className="space-y-5">
          <div>
            <label className="block mb-2 ml-1 text-sm font-medium text-gray-400">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#1c1c1e] text-white placeholder-gray-600 rounded-2xl px-5 py-4 outline-none border border-white/5 focus:border-blue-500/50 focus:bg-[#242426] transition-all"
              required
            />
          </div>

          <div>
            <label className="block mb-2 ml-1 text-sm font-medium text-gray-400">College Name</label>
            <input
              type="text"
              placeholder="e.g. Yamuna Institute of Technology"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full bg-[#1c1c1e] text-white placeholder-gray-600 rounded-2xl px-5 py-4 outline-none border border-white/5 focus:border-blue-500/50 focus:bg-[#242426] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl py-4 mt-4 hover:opacity-90 transition-opacity duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate My QR Pass'}
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default CreatePass;