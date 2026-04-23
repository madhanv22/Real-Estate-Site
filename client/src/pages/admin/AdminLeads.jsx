import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminLeads, updateLeadStatus } from '../../api';
import { MessageSquare, Phone, Building2 } from 'lucide-react';

const statusColors = {
  new: 'bg-blue-50 text-blue-600 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  converted: 'bg-green-50 text-green-600 border-green-200',
  lost: 'bg-red-50 text-red-500 border-red-200',
};

export default function AdminLeads() {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({ queryKey: ['admin-leads'], queryFn: fetchAdminLeads });
  const [filter, setFilter] = useState('all');

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateLeadStatus(id, status),
    onSuccess: () => qc.invalidateQueries(['admin-leads']),
  });

  const displayed = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Leads</h1>
          <p className="text-slate-400 text-sm mt-1">{leads.length} total leads</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all','new','contacted','converted','lost'].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all capitalize ${filter === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-slate-400">Loading…</div>
        ) : displayed.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No leads in this category</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Buyer','Contact','Property','Budget','Type','Status','Action'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayed.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-800">{l.name || '—'}</td>
                  <td className="px-5 py-4">
                    <a href={`https://wa.me/${l.phone}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 text-green-600 hover:underline font-medium">
                      <Phone className="w-3.5 h-3.5" />{l.phone}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-300" />
                      {l.Property?.title || 'General'}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{l.budget || '—'}</td>
                  <td className="px-5 py-4 text-slate-500 capitalize">{l.leadType}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border capitalize ${statusColors[l.status]}`}>{l.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <select value={l.status}
                      onChange={(e) => mutation.mutate({ id: l.id, status: e.target.value })}
                      className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:border-blue-400 bg-white">
                      {['new','contacted','converted','lost'].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
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
