import { useQuery } from '@tanstack/react-query';
import { fetchAdminLeads } from '../../api';
import { Users, Phone, CheckCircle, MessageSquare } from 'lucide-react';

export default function AgentDashboard() {
  const { data: leads = [] } = useQuery({ queryKey: ['admin-leads'], queryFn: fetchAdminLeads });
  
  const stats = [
    { label: 'My Leads', value: leads.length, icon: Users, color: 'bg-blue-500' },
    { label: 'New Today', value: leads.filter(l => l.status === 'new').length, icon: MessageSquare, color: 'bg-emerald-500' },
    { label: 'Converted', value: leads.filter(l => l.status === 'converted').length, icon: CheckCircle, color: 'bg-indigo-500' },
  ];

  return (
    <div className="p-8 bg-slate-50 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-10 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Agent Performance Hub</p>
        </div>
        <a href="/properties" className="flex items-center gap-2 bg-blue-600 text-white font-black px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
          <MessageSquare className="w-4 h-4" /> View My Listings on Site
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 shrink-0">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${s.color} text-white shadow-lg`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">{s.value}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm h-full flex flex-col">
          <h2 className="text-xl font-black text-slate-900 mb-6 shrink-0">Recent Enquiries</h2>
          <div className="flex-1 overflow-auto custom-scrollbar pr-2">
            <div className="space-y-4">
              {leads.length > 0 ? leads.slice(0, 20).map((l) => (
                <div key={l.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-black shadow-sm">
                      {l.name?.[0] || 'U'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{l.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{l.Property?.title || 'Property Enquiry'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${l.status === 'new' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'}`}>
                      {l.status}
                    </span>
                    <a href={`https://wa.me/${l.phone}`} target="_blank" rel="noreferrer" className="p-2 bg-emerald-500 text-white rounded-lg shadow-md shadow-emerald-100 hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
                  <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold">No leads assigned yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
