import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../api';
import { Plus, Pencil, ToggleLeft, ToggleRight, Users } from 'lucide-react';

const EMPTY = { name:'', email:'', password:'', companyName:'', phone:'', whatsappNumber:'' };

export default function SuperAdminUsers() {
  const qc = useQueryClient();
  const { data: users = [], isLoading } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [err, setErr] = useState('');

  const openAdd = () => { setForm(EMPTY); setErr(''); setModal({ mode: 'add' }); };
  const openEdit = (u) => { setForm({ ...u, password: '' }); setErr(''); setModal({ mode: 'edit', id: u.id }); };
  const close = () => setModal(null);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const saveMut = useMutation({
    mutationFn: (data) => modal?.mode === 'add' ? createUser(data) : updateUser(modal.id, data),
    onSuccess: () => { qc.invalidateQueries(['users']); close(); },
    onError: (e) => setErr(e.response?.data?.error || 'Error'),
  });

  const toggleMut = useMutation({
    mutationFn: ({ id, isActive }) => updateUser(id, { isActive }),
    onSuccess: () => qc.invalidateQueries(['users']),
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Manage Admins</h1>
          <p className="text-slate-400 text-sm mt-1">Create and manage real estate admin accounts</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
          <Plus className="w-4 h-4" /> Add Admin
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {isLoading ? <div className="py-16 text-center text-slate-400">Loading…</div> :
          users.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
              <p className="text-sm">No admins yet. Add your first real estate client!</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  {['Name','Email','Company','Phone','Status','Actions'].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-800">{u.name}</td>
                    <td className="px-5 py-4 text-slate-500">{u.email}</td>
                    <td className="px-5 py-4 text-slate-500">{u.companyName || '—'}</td>
                    <td className="px-5 py-4 text-slate-500">{u.phone || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${u.isActive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'}`}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(u)}
                          className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toggleMut.mutate({ id: u.id, isActive: !u.isActive })}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${u.isActive ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                          {u.isActive ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>

      {/* Admin Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="font-black text-slate-900 text-xl">{modal.mode === 'add' ? 'Create New Admin' : 'Edit Admin Account'}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Platform Partnership Details</p>
              </div>
              <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">✕</button>
            </div>
            
            <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'e.g. Priya Sharma' },
                  { key: 'email', label: 'Email Address', placeholder: 'priya@company.com' },
                  { key: 'password', label: 'Password (Required for new)', placeholder: '••••••••', type: 'password' },
                  { key: 'companyName', label: 'Company Name', placeholder: 'e.g. Prime Homes Realty' },
                  { key: 'phone', label: 'Contact Phone', placeholder: 'e.g. 9876543210' },
                  { key: 'whatsappNumber', label: 'WhatsApp for Leads', placeholder: 'e.g. 919876543210' },
                ].map(({ key, label, placeholder, type = 'text' }) => (
                  <div key={key}>
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key] || ''} onChange={(e) => set(key, e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300" />
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button onClick={() => saveMut.mutate(form)} disabled={saveMut.isPending}
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-2">
                  {saveMut.isPending ? 'Processing...' : <><Users className="w-4 h-4" /> {modal.mode === 'add' ? 'Create Admin Account' : 'Save Account Changes'}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
