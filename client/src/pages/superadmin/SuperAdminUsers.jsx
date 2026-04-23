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

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={close}>
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-extrabold text-slate-900">{modal.mode === 'add' ? 'Add Admin' : 'Edit Admin'}</h2>
              <button onClick={close} className="text-slate-400 hover:text-slate-700 font-bold text-lg">✕</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {err && <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{err}</p>}
              {[
                { key:'name', label:'Full Name', type:'text', required: true },
                { key:'email', label:'Email', type:'email', required: true },
                { key:'password', label: modal.mode === 'add' ? 'Password *' : 'New Password (leave blank to keep)', type:'password' },
                { key:'companyName', label:'Company Name', type:'text' },
                { key:'phone', label:'Phone', type:'tel' },
                { key:'whatsappNumber', label:'WhatsApp Number', type:'tel' },
              ].map(({ key, label, type }) => (
                <div key={key}>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
                  <input type={type} value={form[key] || ''} onChange={(e) => set(key, e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              ))}
              <button onClick={() => saveMut.mutate(form)} disabled={saveMut.isPending}
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-60 mt-1">
                {saveMut.isPending ? 'Saving…' : modal.mode === 'add' ? 'Create Admin' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
