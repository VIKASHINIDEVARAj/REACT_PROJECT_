import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    const fetchMyTicket = async () => {
      try {
        const { data } = await API.get('/registrations'); 
        
        // Data array-va iruntha thedu, illana direct-a assign pannu
        const myPass = Array.isArray(data) 
          ? data.find(reg => reg.email === storedUser.email) 
          : (data.email === storedUser.email ? data : null);
        
        if (myPass) {
          setTicket(myPass);
        } else {
          // Ticket illana puthusa create panna anuppu
          navigate('/create-pass'); 
        }
      } catch (error) {
        console.error("Dashboard Error:", error);
        // Error vanthaalum loading-a niruthu
      } finally {
        setLoading(false);
      }
    };
    fetchMyTicket();
  }, [navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );

  // Oruvela ticket illana ethum kaattatha (Already create-pass kku poyirukkum)
  if (!user || !ticket) return null; 

  return (
    <div className="min-h-[calc(100vh-76px)] bg-black relative overflow-hidden font-sans p-6 md:p-12">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{user.name}</span> 🚀
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="lg:col-span-2 bg-[#121212]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8">
            <h2 className="mb-6 text-xl font-semibold text-white">SDE Identity</h2>
            <div className="space-y-6">
              <div className="flex justify-between pb-4 border-b border-white/5">
                <span className="text-sm text-gray-500">Email Address</span>
                <span className="text-gray-200">{user.email}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-white/5">
                <span className="text-sm text-gray-500">College</span>
                <span className="text-gray-200">{ticket.college}</span>
              </div>
              <div className="flex justify-between pb-4 border-b border-white/5">
                <span className="text-sm text-gray-500">Phone</span>
                <span className="text-gray-200">{ticket.phone}</span>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[32px] blur opacity-30 group-hover:opacity-60 transition"></div>
            <div className="relative h-full bg-[#121212] border border-white/10 rounded-[32px] p-8 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-gray-400 tracking-[0.2em] mb-6">VIP PASS</span>
              
              <div className="w-48 h-48 p-2 mb-6 bg-white rounded-2xl">
                <img src={ticket.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ConfApp-${ticket._id}`} alt="VIP QR Code" className="object-contain w-full h-full" />
              </div>

              <h3 className="mb-1 text-xl font-bold text-white">Entry Granted</h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;