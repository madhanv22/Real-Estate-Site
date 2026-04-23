import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Menu, X, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logoutUser(); navigate('/'); };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <Home className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <span className="font-serif text-xl font-black text-slate-900">PropFunnel</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Home</Link>
          <Link to="/properties" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Properties</Link>
          <Link to="/my-bookings" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Track Bookings</Link>
          <button 
            onClick={() => {
              if (window.location.pathname === '/') {
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('/');
                setTimeout(() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }
            }}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            About Us
          </button>
          {user && (
            <div className="flex items-center gap-4">
              <Link 
                to={user.role === 'super_admin' ? '/superadmin' : (user.role === 'agent' ? '/agent' : '/admin')}
                className="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 hover:bg-blue-100 transition-all"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">
                Sign Out
              </button>
            </div>
          )}
          <a href="https://wa.me/919876543210?text=Hi, I'm interested in a property."
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-whatsapp text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg shadow-green-200 hover:bg-whatsapp-dark hover:-translate-y-0.5 transition-all">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-slate-800" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-6 flex flex-col gap-4 shadow-xl">
          <Link to="/" onClick={() => setOpen(false)} className="text-sm font-bold text-slate-700">Home</Link>
          <Link to="/properties" onClick={() => setOpen(false)} className="text-sm font-bold text-slate-700">Properties</Link>
          <button 
            onClick={() => {
              setOpen(false);
              if (window.location.pathname === '/') {
                document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('/');
                setTimeout(() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }
            }}
            className="text-left text-sm font-bold text-slate-700"
          >
            About Us
          </button>
          {user && (
            <>
              <Link to={user.role === 'super_admin' ? '/superadmin' : (user.role === 'agent' ? '/agent' : '/admin')} onClick={() => setOpen(false)} 
                className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">Go to Dashboard</Link>
              <button onClick={() => { setOpen(false); handleLogout(); }}
                className="text-left text-sm font-bold text-red-600 px-4">Sign Out</button>
            </>
          )}
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-whatsapp text-white text-sm font-bold px-4 py-2.5 rounded-xl w-fit">
            <MessageCircle className="w-4 h-4" /> WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  );
}
