import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllLeads } from '../../api';
import { MessageSquare, Phone, Building2 } from 'lucide-react';

const statusColors = {
  new: 'bg-blue-50 text-blue-600 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  converted: 'bg-green-50 text-green-600 border-green-200',
  lost: 'bg-red-50 text-red-500 border-red-200',
};

export default function SuperAdminLeads() {
  const { data: leads = [], isLoading } = useQuery({ queryKey: ['all-leads'], queryFn: fetchAllLeads });
  const [filter, setFilter] = useState('all');

  const displayed = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">All Leads</h1>
        <p className="text-slate-400 text-sm mt-1">{leads.length} total across all admins</p>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['all','new','contacted','converted','lost'].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all capitalize ${filter === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
            {s} {s === 'all' ? `(${leads.length})` : `(${leads.filter(l=>l.status===s).length})`}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? <div className="py-16 text-center text-slate-400">Loading…</div> :
          displayed.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No leads found</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Buyer','Phone','Property','Admin','Budget','Type','Status','Date'].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayed.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-slate-800">{l.name || '—'}</td>
                    <td className="px-4 py-4">
                      <a href={`https://wa.me/${l.phone}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-green-600 hover:underline">
                        <Phone className="w-3 h-3" /> {l.phone}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-xs">{l.Property?.title || 'General'}</td>
                    <td className="px-4 py-4 text-slate-500 text-xs">{l.User?.companyName || l.User?.name || '—'}</td>
                    <td className="px-4 py-4 text-slate-500 text-xs">{l.budget || '—'}</td>
                    <td className="px-4 py-4 text-slate-500 capitalize text-xs">{l.leadType}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border capitalize ${statusColors[l.status]}`}>{l.status}</span>
                    </td>
                    <td className="px-4 py-4 text-slate-400 text-xs">
                      {new Date(l.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
}
