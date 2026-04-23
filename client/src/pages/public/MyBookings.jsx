import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Clock, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export default function MyBookings() {
  const [email, setEmail] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const navigate = useNavigate();

  const { data: bookings, isLoading, refetch } = useQuery({
    queryKey: ['my-bookings', searchEmail],
    queryFn: async () => {
      if (!searchEmail) return [];
      const res = await axios.get(`/api/public/my-bookings?email=${searchEmail}`);
      return res.data;
    },
    enabled: !!searchEmail
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchEmail(email);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Track My Bookings</h1>
          <p className="text-slate-500 font-medium">Enter your email address to see your reserved properties and payment status.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-16">
          <input 
            type="email" 
            placeholder="Enter your email (e.g. john@example.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white border-2 border-slate-100 rounded-[30px] py-6 px-8 pl-16 text-lg font-bold outline-none focus:border-blue-500 shadow-xl shadow-slate-200/50 transition-all"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-8 py-4 rounded-[22px] font-black hover:bg-slate-800 transition-all">
            Find
          </button>
        </form>

        {/* Results */}
        <div className="space-y-6">
          {isLoading && <div className="text-center py-20 font-black text-slate-300 animate-pulse text-xl uppercase tracking-widest">Searching Ledger...</div>}
          
          {searchEmail && bookings?.length === 0 && (
            <div className="bg-white rounded-[40px] p-12 text-center border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No Bookings Found</h3>
              <p className="text-slate-500 font-medium">We couldn't find any reservations associated with <span className="font-bold text-slate-800">{searchEmail}</span>.</p>
            </div>
          )}

          {bookings?.map((booking) => (
            <div key={booking.id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img src={booking.Property?.img} className="w-full md:w-48 h-32 rounded-2xl object-cover shadow-sm" alt="" />
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                    {booking.paymentId === 'PAY_AT_SITE' ? (
                      <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Payment Pending
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3" /> Fully Paid
                      </span>
                    )}
                    <span className="bg-slate-50 text-slate-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      Reserved on {new Date(booking.saleDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-1">{booking.Property?.title}</h3>
                  <p className="text-slate-400 text-sm font-bold">{booking.Property?.location}</p>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  {booking.paymentId === 'PAY_AT_SITE' ? (
                    <button 
                      onClick={() => navigate(`/checkout/${booking.propertyId}`)}
                      className="w-full bg-blue-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" /> Pay Now
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-600 font-black px-6 py-4 rounded-2xl bg-emerald-50/50">
                      Confirmed <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
