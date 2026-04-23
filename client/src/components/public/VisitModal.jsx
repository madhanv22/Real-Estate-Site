import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitLead } from '../../api';
import { X, Calendar, CheckCircle } from 'lucide-react';

const TIME_SLOTS = ['10:00 AM','11:30 AM','1:00 PM','3:00 PM','4:30 PM','6:00 PM'];
const today = new Date().toISOString().split('T')[0];

export default function VisitModal({ property, onClose }) {
  const [form, setForm] = useState({ date: '', slot: '', name: '', phone: '' });
  const [done, setDone] = useState(false);

  const mutation = useMutation({
    mutationFn: (data) => submitLead(data),
    onSuccess: () => setDone(true),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.date || !form.slot || !form.name || !form.phone) {
      alert('Please fill in all fields and select a time slot.');
      return;
    }
    mutation.mutate({
      propertyId: property?.id,
      name: form.name,
      phone: form.phone,
      visitDate: form.date,
      visitTime: form.slot,
      leadType: 'visit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-500 text-white px-6 pt-6 pb-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-1">Site Visit Booking</div>
          <div className="font-bold text-lg">Book a Site Visit</div>
          <div className="text-sm text-white/60">{property?.title}</div>
        </div>

        <div className="p-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">Visit Confirmed! 🏠</h3>
              <p className="text-sm text-slate-600 mb-1">{new Date(form.date).toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
              <p className="font-bold text-slate-900 mb-1">{form.slot}</p>
              <p className="text-xs text-slate-400 mb-6">Agent will call {form.name} 30 mins prior</p>
              <button onClick={onClose} className="text-sm font-bold text-blue-600 hover:underline">← Back to Property</button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Select Date</label>
                <input type="date" min={today} value={form.date} onChange={(e) => set('date', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="mb-4">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((s) => (
                    <button key={s} onClick={() => set('slot', s)}
                      className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                        form.slot === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                      }`}>{s}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { key: 'name', label: 'Your Name', placeholder: 'e.g. Rahul Sharma', type: 'text' },
                  { key: 'phone', label: 'Phone Number', placeholder: '+91 98765…', type: 'tel' },
                ].map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
                    <input type={type} placeholder={placeholder} value={form[key]} onChange={(e) => set(key, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit} disabled={mutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-60">
                <CheckCircle className="w-5 h-5" />
                {mutation.isPending ? 'Booking…' : 'Confirm Visit'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
