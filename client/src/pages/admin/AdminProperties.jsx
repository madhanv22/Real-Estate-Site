import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminProperties, fetchAdminAgents, createProperty, updateProperty, deleteProperty } from '../../api';
import { Plus, Pencil, Trash2, Building2, MapPin } from 'lucide-react';

const EMPTY = { 
  agentId: '', 
  title: '', 
  location: '', 
  price: '', 
  type: '', 
  beds: '', 
  baths: '', 
  area: '', 
  img: '', 
  isFeatured: false,
  amenities: [],
  gallery: []
};

export default function AdminProperties() {
  const qc = useQueryClient();
  const { data: properties = [], isLoading } = useQuery({ queryKey: ['admin-properties'], queryFn: fetchAdminProperties });
  const { data: agents = [] } = useQuery({ queryKey: ['admin-agents'], queryFn: fetchAdminAgents });
  const [modal, setModal] = useState(null); // null | { mode:'add'|'edit', data }
  const [form, setForm] = useState(EMPTY);

  const openAdd = () => { setForm(EMPTY); setModal({ mode: 'add' }); };
  const openEdit = (p) => { 
    setForm({ 
      ...p, 
      beds: p.beds ?? '', 
      baths: p.baths ?? '',
      amenities: Array.isArray(p.amenities) ? p.amenities : [],
      gallery: Array.isArray(p.gallery) ? p.gallery : []
    }); 
    setModal({ mode: 'edit', id: p.id }); 
  };
  const closeModal = () => setModal(null);

  const saveMut = useMutation({
    mutationFn: (data) => modal?.mode === 'add' ? createProperty(data) : updateProperty(modal.id, data),
    onSuccess: () => { qc.invalidateQueries(['admin-properties']); closeModal(); },
  });

  const delMut = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => qc.invalidateQueries(['admin-properties']),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Properties</h1>
          <p className="text-slate-400 text-sm mt-1">{properties.length} listings</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(4)].map((_, i) => <div key={i} className="h-52 bg-slate-200 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p) => (
            <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-card transition-all">
              <div className="relative h-40 bg-slate-100 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                {p.isFeatured && <span className="absolute top-2 left-2 text-xs font-bold bg-amber-400 text-white px-2 py-0.5 rounded-full">Featured</span>}
              </div>
              <div className="p-4">
                <div className="font-bold text-slate-900 text-sm mb-1">{p.title}</div>
                <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                  <MapPin className="w-3 h-3" /> {p.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900">{p.price}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(p)} className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => { if (window.confirm('Delete this property?')) delMut.mutate(p.id); }}
                      className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-extrabold text-slate-900">{modal.mode === 'add' ? 'Add Property' : 'Edit Property'}</h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 font-bold text-lg">✕</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              {[
                { key:'title', label:'Title', type:'text', placeholder:'e.g. Luminaire Residences' },
                { key:'location', label:'Location', type:'text', placeholder:'e.g. Baner, Pune' },
                { key:'price', label:'Price', type:'text', placeholder:'e.g. ₹1.2 Cr' },
                { key:'type', label:'Type', type:'text', placeholder:'e.g. 3 BHK Apartment' },
                { key:'img', label:'Image URL', type:'text', placeholder:'https://...' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
                  <input type={type} placeholder={placeholder} value={form[key] || ''} onChange={(e) => set(key, e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              ))}
              <div className="grid grid-cols-3 gap-3">
                {[{key:'beds',label:'Beds'},{key:'baths',label:'Baths'},{key:'area',label:'Area'}].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
                    <input type={key === 'area' ? 'text' : 'number'} value={form[key] || ''} onChange={(e) => set(key, e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Agent</label>
                <select value={form.agentId || ''} onChange={(e) => set('agentId', e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white">
                  <option value="">Select agent…</option>
                  {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={!!form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)}
                  className="w-4 h-4 accent-blue-600" />
                <span className="text-sm font-semibold text-slate-700">Mark as Featured</span>
              </label>

              {/* Amenities Section */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.amenities.map((a, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                      {a}
                      <button onClick={() => set('amenities', form.amenities.filter((_, idx) => idx !== i))} className="hover:text-red-500">✕</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input id="amenity-input" type="text" placeholder="e.g. Pool" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = e.target.value.trim();
                      if (val && !form.amenities.includes(val)) {
                        set('amenities', [...form.amenities, val]);
                        e.target.value = '';
                      }
                    }
                  }} className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Gallery Section */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Gallery Images (URLs)</label>
                <div className="flex flex-col gap-2">
                  {form.gallery.map((g, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="text" value={g} onChange={(e) => {
                        const next = [...form.gallery];
                        next[i] = e.target.value;
                        set('gallery', next);
                      }} className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-blue-500" />
                      <button onClick={() => set('gallery', form.gallery.filter((_, idx) => idx !== i))} className="text-red-500">✕</button>
                    </div>
                  ))}
                  <button onClick={() => set('gallery', [...form.gallery, ''])}
                    className="text-xs font-bold text-blue-600 hover:underline text-left">+ Add Image URL</button>
                </div>
              </div>
              <button onClick={() => saveMut.mutate(form)} disabled={saveMut.isPending}
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 disabled:opacity-60">
                {saveMut.isPending ? 'Saving…' : modal.mode === 'add' ? 'Add Property' : 'Save Changes'}
              </button>
              {saveMut.isError && <p className="text-sm text-red-500 text-center">{saveMut.error?.response?.data?.error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
