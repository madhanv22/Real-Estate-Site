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
          <Link to="/properties" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Properties</Link>
          {user ? (
            <>
              <Link to={user.role === 'super_admin' ? '/superadmin' : '/admin'}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Login</Link>
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
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-3">
          <Link to="/properties" onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-700">Properties</Link>
          {user ? (
            <>
              <Link to={user.role === 'super_admin' ? '/superadmin' : '/admin'} onClick={() => setOpen(false)} className="text-sm font-semibold text-blue-600">Dashboard</Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="text-left text-sm font-semibold text-red-500">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-700">Login</Link>
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
