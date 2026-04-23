import { useQuery } from '@tanstack/react-query';
import { fetchAdminStats, fetchAdminLeads } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import { Building2, MessageSquare, TrendingUp, Star, Clock } from 'lucide-react';

const statusColors = {
  new: 'bg-blue-50 text-blue-600 border-blue-200',
  contacted: 'bg-amber-50 text-amber-600 border-amber-200',
  converted: 'bg-green-50 text-green-600 border-green-200',
  lost: 'bg-red-50 text-red-500 border-red-200',
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data: stats = {} } = useQuery({ queryKey: ['admin-stats'], queryFn: fetchAdminStats });
  const { data: leads = [] } = useQuery({ queryKey: ['admin-leads'], queryFn: fetchAdminLeads });

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p className="text-slate-400 text-sm mt-1">{user?.companyName || 'Your real estate dashboard'}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Active Properties', value: stats.properties ?? '–', icon: Building2, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Leads', value: stats.leads ?? '–', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'New Leads', value: stats.newLeads ?? '–', icon: Star, color: 'text-amber-600 bg-amber-50' },
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

      {/* Recent leads */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-extrabold text-slate-900">Recent Leads</h2>
          <Clock className="w-4 h-4 text-slate-300" />
        </div>
        {recentLeads.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">No leads yet. They'll appear here once buyers fill the form.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentLeads.map((l) => (
              <div key={l.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{l.name || 'Anonymous'}</div>
                  <div className="text-xs text-slate-400">{l.phone} · {l.Property?.title || 'General inquiry'}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs">{l.budget}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border capitalize ${statusColors[l.status] || statusColors.new}`}>
                    {l.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
