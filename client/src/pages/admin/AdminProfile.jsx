import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminProfile, updateAdminProfile } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import { Save, User } from 'lucide-react';

export default function AdminProfile() {
  const { user, loginUser } = useAuth();
  const qc = useQueryClient();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', companyName: user?.companyName || '', phone: user?.phone || '', whatsappNumber: user?.whatsappNumber || '', password: '' });

  const mutation = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 3000); },
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Profile Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Update your account details</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-black">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-slate-900">{user?.name}</div>
            <div className="text-sm text-slate-400">{user?.email}</div>
            <span className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-0.5 rounded-full capitalize mt-1 inline-block">
              {user?.role?.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { key: 'name', label: 'Full Name', type: 'text' },
            { key: 'companyName', label: 'Company Name', type: 'text' },
            { key: 'phone', label: 'Phone Number', type: 'tel' },
            { key: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel' },
            { key: 'password', label: 'New Password (leave blank to keep current)', type: 'password' },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">{label}</label>
              <input type={type} value={form[key]} onChange={(e) => set(key, e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </div>
          ))}

          <button onClick={() => mutation.mutate(form)} disabled={mutation.isPending}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-60 mt-2">
            <Save className="w-4 h-4" />
            {mutation.isPending ? 'Saving…' : saved ? 'Saved ✓' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
