import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // Namma API call: GET /registrations/:id
        const { data } = await API.get(`/registrations/${id}`);
        setTicket(data);
      } catch (err) {
  console.error("Ticket Fetch Error:", err.response || err); 
  setError('Invalid or Expired Pass ❌');
}
    };
    fetchTicket();
  }, [id]);

  if (error || !ticket) return (
    <div className="flex items-center justify-center min-h-screen text-xl font-bold text-red-500 bg-black">{error || 'Loading...'}</div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <div className="bg-[#121212] border border-white/10 rounded-[32px] p-8 text-center max-w-sm w-full shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <span className="inline-block px-3 py-1 mb-6 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400">VALIDATED ✅</span>
        <h2 className="mb-2 text-3xl font-extrabold text-white">{ticket.name}</h2>
        <p className="mb-8 text-lg font-medium text-blue-400">{ticket.college}</p>
        <div className="p-6 space-y-4 text-left border bg-black/50 rounded-2xl border-white/5">
          <div><p className="text-xs text-gray-500">Phone</p><p className="text-gray-200">{ticket.phone}</p></div>
          <div><p className="text-xs text-gray-500">Access</p><p className="font-semibold text-emerald-400">VIP Attendee</p></div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;