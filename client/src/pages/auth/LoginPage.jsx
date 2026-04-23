import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import { Home, Eye, EyeOff, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState('admin'); // 'admin' or 'agent'
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginUser(data);
      const userRole = data.user.role;
      if (userRole === 'super_admin') navigate('/superadmin');
      else if (userRole === 'agent') navigate('/agent');
      else navigate('/admin');
    },
    onError: (err) => setError(err.response?.data?.error || 'Login failed'),
  });

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setError(''); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl font-black text-white">PropFunnel</span>
          </div>
          <p className="text-white/40 text-sm">Staff & Management Portal</p>
        </div>

        <div className="bg-white rounded-[32px] p-2 shadow-2xl overflow-hidden">
          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-100 rounded-[28px] mb-6">
            <button onClick={() => setRole('admin')}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-[24px] transition-all ${role === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
              Admin Login
            </button>
            <button onClick={() => setRole('agent')}
              className={`flex-1 py-2.5 text-xs font-black uppercase tracking-widest rounded-[24px] transition-all ${role === 'agent' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
              Agent Login
            </button>
          </div>

          <div className="px-6 pb-8 pt-2">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              {role === 'admin' ? 'Admin Portal' : 'Agent Portal'}
            </h2>
            <p className="text-slate-400 text-sm mb-8 font-medium">Please enter your credentials to access your dashboard.</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-semibold px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Email</label>
              <input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => set('email', e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                onKeyDown={(e) => e.key === 'Enter' && mutation.mutate(form)} />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={(e) => set('password', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  onKeyDown={(e) => e.key === 'Enter' && mutation.mutate(form)} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button onClick={() => mutation.mutate(form)} disabled={mutation.isPending}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-60 mt-1">
              <LogIn className="w-4 h-4" />
              {mutation.isPending ? 'Signing in…' : 'Sign In'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center font-medium">Demo credentials</p>
            <div className="mt-3 grid grid-cols-1 gap-2 text-xs">
              {[
                { label: 'Super Admin', email: 'admin@propfunnel.com', pass: 'Admin@123' },
                { label: 'Agent – Priya', email: 'priya@primehomes.com', pass: 'Priya@123' },
                { label: 'Agent – Ravi', email: 'ravi@ravirealty.com', pass: 'Ravi@123' },
              ].map(({ label, email, pass }) => (
                <button key={email} onClick={() => setForm({ email, password: pass })}
                  className="flex justify-between items-center bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl px-3 py-2 transition-all text-left">
                  <span className="font-semibold text-slate-600">{label}</span>
                  <span className="text-slate-400">{email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
