import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllLeads, updateLeadStatus } from '../../api';
import { MessageSquare, Phone, Building2, CheckCircle2 } from 'lucide-react';

const statusColors = {
  new: 'bg-blue-50 text-blue-600 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  converted: 'bg-green-50 text-green-600 border-green-200',
  lost: 'bg-red-50 text-red-500 border-red-200',
};

export default function SuperAdminLeads() {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({ queryKey: ['all-leads'], queryFn: fetchAllLeads });
  const [filter, setFilter] = useState('all');

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateLeadStatus(id, status),
    onSuccess: () => qc.invalidateQueries(['all-leads']),
  });

  const displayed = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Platform Leads</h1>
        <p className="text-slate-400 text-sm mt-1">{leads.length} total across all admins</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all','new','contacted','converted','lost'].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all capitalize ${filter === s ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
            {s} {s === 'all' ? `(${leads.length})` : `(${leads.filter(l=>l.status===s).length})`}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden">
        {isLoading ? <div className="py-16 text-center text-slate-400">Loading Leads...</div> :
          displayed.length === 0 ? (
            <div className="py-24 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p className="text-sm font-bold">No leads found in this category</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    {['Buyer','Contact','Property','Admin','Type','Status','Action'].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {displayed.map((l) => (
                    <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-5">
                        <div className="font-bold text-slate-900">{l.name || '—'}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{new Date(l.createdAt).toLocaleDateString('en-IN')}</div>
                      </td>
                      <td className="px-5 py-5">
                        <a href={`https://wa.me/${l.phone}`} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-colors font-bold text-xs">
                          <Phone className="w-3 h-3" /> {l.phone}
                        </a>
                      </td>
                      <td className="px-5 py-5 text-slate-500 font-medium">{l.Property?.title || 'General'}</td>
                      <td className="px-5 py-5">
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{l.User?.companyName || 'Platform'}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className="text-[10px] font-black uppercase text-slate-400">{l.leadType}</span>
                      </td>
                      <td className="px-5 py-5">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${statusColors[l.status]}`}>{l.status}</span>
                      </td>
                      <td className="px-5 py-5">
                        <select value={l.status}
                          onChange={(e) => mutation.mutate({ id: l.id, status: e.target.value })}
                          className="text-[11px] font-bold border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-blue-500 bg-white shadow-sm cursor-pointer hover:border-slate-300 transition-all">
                          {['new','contacted','converted','lost'].map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    </div>
  );
}
