import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home, Building2, Users, MessageSquare, User, LogOut,
  BarChart3, Shield, ChevronRight
} from 'lucide-react';

export default function AdminLayout({ isSuperAdmin }) {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logoutUser(); navigate('/login'); };

  const adminLinks = [
    { to: '/admin', icon: BarChart3, label: 'Dashboard', end: true },
    { to: '/admin/properties', icon: Building2, label: 'Properties' },
    { to: '/admin/leads', icon: MessageSquare, label: 'Leads' },
    { to: '/admin/profile', icon: User, label: 'Profile' },
  ];

  const superLinks = [
    { to: '/superadmin', icon: BarChart3, label: 'Dashboard', end: true },
    { to: '/superadmin/users', icon: Users, label: 'Manage Admins' },
    { to: '/superadmin/leads', icon: MessageSquare, label: 'All Leads' },
  ];

  const links = isSuperAdmin ? superLinks : adminLinks;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex flex-col shrink-0">
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-lg font-black text-white">PropFunnel</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            {isSuperAdmin
              ? <><Shield className="w-3.5 h-3.5 text-amber-400" /><span className="text-xs text-amber-400 font-bold">Super Admin</span></>
              : <><Building2 className="w-3.5 h-3.5 text-blue-400" /><span className="text-xs text-blue-400 font-bold">Admin Panel</span></>}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User info */}
        <div className="px-4 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="text-xs text-slate-400 truncate">{user?.companyName || user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
