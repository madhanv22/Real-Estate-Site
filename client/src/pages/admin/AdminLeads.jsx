import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminLeads, updateLeadStatus, logSale } from '../../api';
import { MessageSquare, Phone, Building2, CheckCircle, X, DollarSign, Calendar, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const statusColors = {
  new: 'bg-blue-50 text-blue-600 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  converted: 'bg-green-50 text-green-600 border-green-200',
  lost: 'bg-red-50 text-red-500 border-red-200',
};

export default function AdminLeads() {
  const { user } = useAuth();
  const isSuper = user?.role === 'super_admin';
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({ queryKey: ['admin-leads'], queryFn: fetchAdminLeads });
  const [filter, setFilter] = useState('all');
  const [saleModal, setSaleModal] = useState(null); // { propertyId, leadId, clientName }

  const mutation = useMutation({
    mutationFn: ({ id, status }) => updateLeadStatus(id, status),
    onSuccess: () => qc.invalidateQueries(['admin-leads']),
  });

  const saleMut = useMutation({
    mutationFn: logSale,
    onSuccess: () => {
      qc.invalidateQueries(['admin-leads']);
      qc.invalidateQueries(['admin-properties']);
      setSaleModal(null);
    }
  });

  const displayed = filter === 'all' ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="shrink-0">
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
      </div>

      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="py-16 text-center text-slate-400">Loading…</div>
        ) : displayed.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No leads in this category</p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
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
                      <div className="flex flex-col gap-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border capitalize inline-block text-center ${statusColors[l.status]}`}>{l.status}</span>
                        {l.status === 'converted' && l.Property && (
                          <div className="flex flex-col gap-1">
                            <button onClick={() => setSaleModal({ propertyId: l.propertyId, leadId: l.id, clientName: l.name })}
                              className="text-[10px] font-black text-blue-600 hover:underline flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Log Sale
                            </button>
                            <button onClick={() => {
                              const url = `${window.location.origin}/checkout/${l.propertyId}`;
                              navigator.clipboard.writeText(url);
                              alert('Checkout link copied to clipboard!');
                            }}
                              className="text-[10px] font-black text-emerald-600 hover:underline flex items-center gap-1">
                              <DollarSign className="w-3 h-3" /> Copy Checkout Link
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <select value={l.status}
                        disabled={isSuper}
                        onChange={(e) => mutation.mutate({ id: l.id, status: e.target.value })}
                        className={`text-xs border border-slate-200 rounded-lg px-2 py-1.5 outline-none focus:border-blue-400 bg-white ${isSuper ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {['new','contacted','converted','lost'].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sale Modal */}
      {saleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSaleModal(null)}>
          <div className="bg-white rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">Finalize Sale</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Transaction Details</p>
                </div>
                <button onClick={() => setSaleModal(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                saleMut.mutate({
                  ...saleModal,
                  salePrice: fd.get('price'),
                  commission: fd.get('commission'),
                  clientName: fd.get('clientName'),
                  saleDate: fd.get('date'),
                });
              }} className="space-y-5">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Final Selling Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input name="price" type="text" required placeholder="e.g. ₹1.15 Cr" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-10 pr-4 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Agency Commission</label>
                  <input name="commission" type="text" placeholder="e.g. ₹2.3 Lakh (2%)" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Buyer Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input name="clientName" type="text" defaultValue={saleModal.clientName} required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-10 pr-4 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Closing Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} required
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-10 pr-4 text-sm font-bold outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>
                </div>

                <button type="submit" disabled={saleMut.isPending}
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 mt-4 flex items-center justify-center gap-2">
                  {saleMut.isPending ? 'Processing...' : <><CheckCircle className="w-5 h-5" /> Mark as Sold</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
