import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminAgents, createAgent, updateAgent } from '../../api';
import { Plus, Pencil, User, Phone, Briefcase, Trash2 } from 'lucide-react';

const EMPTY = { name: '', title: '', phone: '', email: '', avatar: '', experience: '', deals: '' };

export default function AdminAgents() {
  const qc = useQueryClient();
  const { data: agents = [], isLoading } = useQuery({ queryKey: ['admin-agents'], queryFn: fetchAdminAgents });
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openAdd = () => { setForm(EMPTY); setModal({ mode: 'add' }); };
  const openEdit = (a) => { setForm(a); setModal({ mode: 'edit', id: a.id }); };
  const closeModal = () => setModal(null);

  const [error, setError] = useState(null);

  const saveMut = useMutation({
    mutationFn: (data) => modal?.mode === 'add' ? createAgent(data) : updateAgent(modal.id, data),
    onSuccess: () => { qc.invalidateQueries(['admin-agents']); closeModal(); },
    onError: (err) => setError(err.response?.data?.error || 'Failed to save agent'),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Agents</h1>
          <p className="text-slate-400 text-sm mt-1">Your sales and support team</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
          <Plus className="w-4 h-4" /> Add Agent
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-pulse">
          {[...Array(3)].map((_, i) => <div key={i} className="h-40 bg-slate-200 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((a) => (
            <div key={a.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm group hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <img src={a.avatar || 'https://ui-avatars.com/api/?name=' + a.name} alt={a.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50" />
                <div>
                  <div className="font-extrabold text-slate-900">{a.name}</div>
                  <div className="text-xs text-blue-600 font-bold">{a.title}</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone className="w-3.5 h-3.5" /> {a.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Briefcase className="w-3.5 h-3.5" /> {a.experience} Exp.
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-50">
                <button onClick={() => openEdit(a)}
                  className="flex-1 bg-slate-100 text-slate-600 text-xs font-bold py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Agent Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="font-black text-slate-900 text-xl">{modal.mode === 'add' ? 'Add New Agent' : 'Edit Agent Profile'}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Agent Information</p>
              </div>
              <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">✕</button>
            </div>
            
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-2 animate-shake">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'e.g. Rahul Sharma', required: true },
                  { key: 'title', label: 'Title', placeholder: 'e.g. Senior Consultant', required: true },
                  { key: 'email', label: 'Email (For Login)', placeholder: 'rahul@company.com', required: true },
                  { key: 'password', label: 'Password', placeholder: '••••••••', type: 'password', required: true },
                  { key: 'phone', label: 'WhatsApp Number', placeholder: 'e.g. 919876543210', required: true },
                  { key: 'avatar', label: 'Avatar URL', placeholder: 'https://...' },
                  { key: 'experience', label: 'Experience', placeholder: 'e.g. 5+ Years' },
                  { key: 'deals', label: 'Recent Deals', placeholder: 'e.g. 50+ Closed' },
                ].map(({ key, label, placeholder, type = 'text', required }) => (
                  <div key={key}>
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input type={type} placeholder={placeholder} value={form[key] || ''} onChange={(e) => { setError(null); set(key, e.target.value); }}
                      className={`w-full border ${error ? 'border-red-200' : 'border-slate-200'} bg-slate-50/50 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300`} />
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button onClick={() => saveMut.mutate(form)} disabled={saveMut.isPending}
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2">
                  {saveMut.isPending ? 'Saving Agent...' : <><User className="w-4 h-4" /> Save Agent Profile</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
