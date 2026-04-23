import { useQuery } from '@tanstack/react-query';
import { fetchSuperStats } from '../../api';
import { 
  Users, Building2, MessageSquare, TrendingUp, 
  ArrowUpRight, Clock, MapPin, ShieldCheck 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

export default function SuperAdminDashboard() {
  const { data: stats = {}, isLoading } = useQuery({ 
    queryKey: ['super-stats'], 
    queryFn: fetchSuperStats 
  });

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "just now";
  };

  if (isLoading) return <div className="p-8 animate-pulse text-slate-400 font-bold">Loading Platform Intelligence...</div>;

  return (
    <div className="p-8 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            PropFunnel Global Platform Monitoring
          </p>
        </div>
        <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm text-sm font-bold text-slate-600 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Platform Admins', value: stats.users, icon: Users, bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:border-blue-400', glow: 'bg-blue-50', growth: '+12%' },
          { label: 'Active Properties', value: stats.properties, icon: Building2, bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'hover:border-emerald-400', glow: 'bg-emerald-50', growth: '+8%' },
          { label: 'Total Leads Generated', value: stats.leads, icon: MessageSquare, bg: 'bg-amber-50', text: 'text-amber-600', hover: 'hover:border-amber-400', glow: 'bg-amber-50', growth: '+24%' },
        ].map((s) => (
          <div key={s.label} className={`bg-white border border-slate-200 rounded-3xl p-6 relative overflow-hidden group ${s.hover} transition-all shadow-sm`}>
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${s.glow} rounded-full group-hover:scale-110 transition-transform`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${s.bg} ${s.text}`}>
                <s.icon className="w-6 h-6" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-1">{s.value}</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 text-lg">Lead Growth Trend</h3>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Lead Capture</div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.chartData || []}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-lg">Platform Pulse</h3>
            <button className="text-xs font-bold text-blue-600 hover:underline">Live Activities</button>
          </div>
          <div className="flex-1 overflow-auto p-2">
            <div className="space-y-1">
              {stats.recentLeads?.map((l, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">New Lead Captured</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{timeAgo(l.createdAt)}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">
                      Enquiry for <span className="font-bold text-slate-700">{l.Property?.title}</span> processed by <span className="text-blue-600 font-bold">{l.User?.companyName}</span>
                    </p>
                  </div>
                </div>
              ))}
              {stats.recentProperties?.map((p, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900 text-sm">New Property Live</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{timeAgo(p.createdAt)}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-1">
                      <span className="font-bold text-slate-700">{p.title}</span> published by <span className="text-emerald-600 font-bold">{p.User?.companyName}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
