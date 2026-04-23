import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { submitLead } from '../../api';
import { X, Lock, MessageCircle, CheckCircle } from 'lucide-react';

export default function LeadModal({ property, onClose }) {
  const [form, setForm] = useState({ budget: '', propertyType: '', timeline: '', loanRequired: '', phone: '' });
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: (data) => submitLead(data),
    onSuccess: () => setDone(true),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (!form.phone) {
      setError('WhatsApp Number is required to get full details.');
      return;
    }
    setError('');
    mutation.mutate({ propertyId: property?.id, ...form, leadType: 'inquiry' });
  };

  const waMsg = encodeURIComponent(
    property
      ? `Hi, I'm interested in ${property.title} at ${property.location}. Budget: ${form.budget || 'Not specified'}. Please share full details.`
      : `Hi, I'm interested in a property. Budget: ${form.budget || 'Not specified'}. Please share details.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-[slideUp_0.25s_ease]" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white px-6 pt-6 pb-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">Unlock Full Details</div>
          <div className="font-bold text-lg">{property?.title || 'Property Details'}</div>
          <div className="text-sm text-white/60">Quick form → get exact address, builder contact & full specs</div>
        </div>

        {/* Body */}
        <div className="p-6">
          {done ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">You're all set! 🎉</h3>
              <p className="text-sm text-slate-500 mb-6">Connecting you to the agent on WhatsApp now…</p>
              <a href={`https://wa.me/919876543210?text=${waMsg}`} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-green-200 hover:bg-whatsapp-dark transition-colors">
                <MessageCircle className="w-5 h-5" /> Open WhatsApp
              </a>
            </div>
          ) : (
            <>
              {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 animate-in fade-in zoom-in duration-200">{error}</div>}
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[
                  { key: 'budget', label: 'Budget Range', opts: ['Under ₹50L','₹50L – ₹1Cr','₹1Cr – ₹2Cr','₹2Cr+'] },
                  { key: 'propertyType', label: 'Property Type', opts: ['1 BHK','2 BHK','3 BHK','Villa'] },
                  { key: 'timeline', label: 'Purchase Timeline', opts: ['Immediately','Within 3 months','3–6 months','Just exploring'] },
                  { key: 'loanRequired', label: 'Loan Required?', opts: ['Yes','No','Maybe'] },
                ].map(({ key, label, opts }) => (
                  <div key={key}>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
                    <select value={form[key]} onChange={(e) => set(key, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white">
                      <option value="">Select…</option>
                      {opts.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">WhatsApp Number *</label>
                <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => set('phone', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <button onClick={handleSubmit} disabled={mutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100 disabled:opacity-60">
                <MessageCircle className="w-5 h-5" />
                {mutation.isPending ? 'Sending…' : 'Get Details on WhatsApp'}
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">No spam. Agent will reach you within 15 minutes.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
