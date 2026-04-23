import { useQuery } from '@tanstack/react-query';
import { fetchAdminStats, fetchAdminLeads } from '../../api';
import { 
  Building2, MessageSquare, Users, TrendingUp, 
  ArrowUpRight, CheckCircle2, Clock, Phone 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';

export default function AdminDashboard() {
  const { data: stats = {}, isLoading: statsLoading } = useQuery({ 
    queryKey: ['admin-stats'], 
    queryFn: fetchAdminStats 
  });
  
  const { data: leads = [], isLoading: leadsLoading } = useQuery({ 
    queryKey: ['admin-leads'], 
    queryFn: fetchAdminLeads 
  });

  if (statsLoading || leadsLoading) return <div className="p-8 animate-pulse text-slate-400 font-bold">Loading Your Insights...</div>;

  const recentLeads = leads.slice(0, 5);

  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Business Overview</h1>
        <p className="text-slate-500 font-medium mt-1">Track your properties and lead conversions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Listings', value: stats.properties, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Inquiries', value: stats.leads, icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'New Leads', value: stats.newLeads, icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Total Views', value: stats.views || 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.bg} ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-black text-slate-900">{s.value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conversion Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 text-lg">Lead Performance</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> +14.5% from last month
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Mon', value: 4 }, { name: 'Tue', value: 7 }, { name: 'Wed', value: 5 },
                { name: 'Thu', value: 9 }, { name: 'Fri', value: 12 }, { name: 'Sat', value: 8 }, { name: 'Sun', value: 6 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads Feed */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-lg">New Inquiries</h3>
            <ArrowUpRight className="w-5 h-5 text-slate-300" />
          </div>
          <div className="flex-1 overflow-auto">
            {recentLeads.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {recentLeads.map((l) => (
                  <div key={l.id} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        {l.name?.[0] || <Phone className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">{l.name || l.phone}</div>
                        <div className="text-[11px] text-slate-400 font-medium truncate">{l.Property?.title}</div>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        l.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {l.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-slate-200" />
                </div>
                <p className="text-sm font-bold text-slate-400">All caught up!</p>
                <p className="text-xs text-slate-300 mt-1">No new leads today</p>
              </div>
            )}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-100">
            <button className="w-full py-2 text-xs font-black text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">
              View All Leads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
