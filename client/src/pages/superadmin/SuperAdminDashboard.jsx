import { useQuery } from '@tanstack/react-query';
import { fetchSuperStats, fetchUsers, fetchAllLeads } from '../../api';
import { Users, Building2, MessageSquare, TrendingUp } from 'lucide-react';

export default function SuperAdminDashboard() {
  const { data: stats = {} } = useQuery({ queryKey: ['super-stats'], queryFn: fetchSuperStats });
  const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const { data: leads = [] } = useQuery({ queryKey: ['all-leads'], queryFn: fetchAllLeads });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Super Admin Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Platform-wide overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Total Admins', value: stats.users ?? '–', icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Properties', value: stats.properties ?? '–', icon: Building2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Leads', value: stats.leads ?? '–', icon: MessageSquare, color: 'text-amber-600 bg-amber-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900">{value}</div>
            <div className="text-sm text-slate-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Admin Users list */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-extrabold text-slate-900">Registered Admins</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {users.slice(0, 5).map((u) => (
            <div key={u.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">{u.name}</div>
                <div className="text-xs text-slate-400">{u.email} · {u.companyName}</div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${u.isActive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'}`}>
                {u.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-extrabold text-slate-900">Recent Leads (All Admins)</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {leads.slice(0, 5).map((l) => (
            <div key={l.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-slate-800 text-sm">{l.phone}</div>
                <div className="text-xs text-slate-400">{l.Property?.title || 'General'} · {l.User?.companyName || l.User?.name}</div>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-full capitalize">{l.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
