import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-[#0b1075] via-[#6127c5] to-[#8a22a3] px-6 py-4 sticky top-0 z-50 font-sans shadow-xl relative overflow-hidden border-b border-white/10">
        <div className="absolute -translate-y-1/2 pointer-events-none right-6 top-1/2 opacity-70">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="white"/>
          </svg>
        </div>

        <div className="relative z-10 flex items-center justify-between mx-auto max-w-7xl">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide text-white transition-opacity hover:opacity-90">
            ConfApp 🚀
          </Link>

          <div className="flex items-center gap-3 pr-8">
            {/* 1. First Auth Links (Sign in / Sign up) illana User Details varum */}
            {user ? (
              <>
                <div className="flex items-center hidden gap-3 px-4 py-2 border rounded-full shadow-inner bg-black/20 backdrop-blur-md border-white/10 md:flex">
                  <span className="text-sm text-gray-300">Hi,</span>
                  <span className="text-sm font-medium text-white">{user.name || 'Kiddo SDE'}</span>
                </div>
                
                <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-gray-200 transition rounded-full hover:text-white hover:bg-white/10">
                  Dashboard
                </Link>
                
                <button 
                  onClick={handleLogout} 
                  className="px-5 py-2 text-sm font-medium text-red-100 transition border rounded-full bg-red-500/20 border-red-500/30 hover:bg-red-500/40"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-200 transition rounded-full hover:text-white hover:bg-white/10">
                  Sign in
                </Link>
                
                <Link to="/register" className="text-sm font-medium bg-white/15 backdrop-blur-md text-white border border-white/20 py-2.5 px-6 rounded-full hover:bg-white/25 transition shadow-lg">
                  Sign up
                </Link>
              </>
            )}

            {/* 2. Help Button Extreme Right-kku thookiyachu (with a sleek separator line) */}
            <button 
              onClick={() => setIsHelpOpen(true)} 
              className="px-4 py-2 pl-6 ml-2 text-sm font-medium text-gray-400 transition border-l hover:text-white border-white/10"
            >
              Help
            </button>
          </div>
        </div>
      </nav>

      {/* Help Popup Modal (Same as before) */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
          <div className="bg-[#121212] border border-white/10 rounded-[24px] p-8 max-w-md w-full relative shadow-2xl transform transition-all">
            
            <button 
              onClick={() => setIsHelpOpen(false)} 
              className="absolute text-2xl leading-none text-gray-500 transition-colors top-5 right-5 hover:text-white"
            >
              &times;
            </button>
            
            <h2 className="flex items-center gap-2 mb-6 text-2xl font-bold text-white">
              How it works 🛠️
            </h2>
            
            <div className="space-y-4">
              <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5">
                <h3 className="mb-1 font-semibold text-blue-400">1. Sign up</h3>
                <p className="text-sm leading-relaxed text-gray-400">Create your secure account using your name, email, and password.</p>
              </div>
              
              <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5">
                <h3 className="mb-1 font-semibold text-purple-400">2. Sign in</h3>
                <p className="text-sm leading-relaxed text-gray-400">Log in to access your personal Command Center.</p>
              </div>
              
              <div className="bg-[#1c1c1e] p-4 rounded-2xl border border-white/5">
                <h3 className="mb-1 font-semibold text-emerald-400">3. Generate QR Pass</h3>
                <p className="text-sm leading-relaxed text-gray-400">Fill in your college details inside the dashboard to generate your exclusive VIP Entry Pass.</p>
              </div>
            </div>

            <button 
              onClick={() => setIsHelpOpen(false)} 
              className="w-full mt-8 bg-white text-black py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Got it, thanks!
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;