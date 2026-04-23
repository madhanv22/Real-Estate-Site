import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAdminProperties, fetchAdminAgents, createProperty, updateProperty, deleteProperty, fetchAllProperties } from '../../api';
import { Plus, Pencil, Trash2, Building2, MapPin, ExternalLink } from 'lucide-react';

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

export default function AdminProperties({ isSuperAdmin, isAgent }) {
  const qc = useQueryClient();
  const { data: properties = [], isLoading } = useQuery({ 
    queryKey: [isSuperAdmin ? 'all-properties' : 'admin-properties'], 
    queryFn: isSuperAdmin ? fetchAllProperties : fetchAdminProperties 
  });
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
    onSuccess: () => { 
      qc.invalidateQueries([isSuperAdmin ? 'all-properties' : 'admin-properties']); 
      closeModal(); 
    },
  });

  const delMut = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => qc.invalidateQueries([isSuperAdmin ? 'all-properties' : 'admin-properties']),
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Properties</h1>
          <p className="text-slate-400 text-sm mt-1">{properties.length} listings</p>
        </div>
        {!isAgent && (
          <button onClick={openAdd}
            className="flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            <Plus className="w-4 h-4" /> Add Property
          </button>
        )}
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
                    <a href={`/properties/${p.id}`} target="_blank" rel="noreferrer" 
                      className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {!isAgent && (
                      <>
                        <button onClick={() => openEdit(p)} className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { if (window.confirm('Delete this property?')) delMut.mutate(p.id); }}
                          className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
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
          <div className="bg-white rounded-[32px] w-full max-w-4xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white">
              <div>
                <h2 className="font-black text-slate-900 text-xl">{modal.mode === 'add' ? 'Create New Listing' : 'Edit Property Details'}</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Property Specifications</p>
              </div>
              <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-colors">✕</button>
            </div>
            
            <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                  {[
                    { key:'title', label:'Property Title', type:'text', placeholder:'e.g. Luminaire Residences' },
                    { key:'location', label:'Exact Location', type:'text', placeholder:'e.g. Baner, Pune' },
                    { key:'price', label:'Listing Price', type:'text', placeholder:'e.g. ₹1.2 Cr' },
                    { key:'type', label:'Property Type', type:'text', placeholder:'e.g. 3 BHK Apartment' },
                    { key:'img', label:'Main Banner Image (URL)', type:'text', placeholder:'https://...' },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">{label}</label>
                      <input type={type} placeholder={placeholder} value={form[key] || ''} onChange={(e) => set(key, e.target.value)}
                        className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" />
                    </div>
                  ))}
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[{key:'beds',label:'Beds'},{key:'baths',label:'Baths'},{key:'area',label:'Area'}].map(({ key, label }) => (
                      <div key={key}>
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">{label}</label>
                        <input type={key === 'area' ? 'text' : 'number'} value={form[key] || ''} onChange={(e) => set(key, e.target.value)}
                          className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Advanced Info */}
                <div className="space-y-6">
                  <div>
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-2">Assigned Agent</label>
                    <select value={form.agentId || ''} onChange={(e) => set('agentId', e.target.value)}
                      className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all appearance-none">
                      <option value="">Select an Agent...</option>
                      {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>

                  <label className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 cursor-pointer group">
                    <input type="checkbox" checked={!!form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)}
                      className="w-5 h-5 rounded-lg accent-amber-500" />
                    <div>
                      <span className="text-sm font-black text-amber-900 block leading-none">Featured Listing</span>
                      <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Promote to home page</span>
                    </div>
                  </label>

                  {/* Amenities */}
                  <div>
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-3">Amenities</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {form.amenities.map((a, i) => (
                        <span key={i} className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-2 border border-blue-100">
                          {a}
                          <button onClick={() => set('amenities', form.amenities.filter((_, idx) => idx !== i))} className="hover:text-red-500">✕</button>
                        </span>
                      ))}
                    </div>
                    <input type="text" placeholder="Type amenity and press Enter..." onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = e.target.value.trim();
                        if (val && !form.amenities.includes(val)) {
                          set('amenities', [...form.amenities, val]);
                          e.target.value = '';
                        }
                      }
                    }} className="w-full border border-slate-200 bg-slate-50/50 rounded-2xl px-4 py-3 text-xs outline-none focus:border-blue-500 focus:bg-white transition-all" />
                  </div>

                  {/* Gallery */}
                  <div>
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block mb-3">Gallery Image URLs</label>
                    <div className="space-y-2">
                      {form.gallery.map((g, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input type="text" value={g} onChange={(e) => {
                            const next = [...form.gallery];
                            next[i] = e.target.value;
                            set('gallery', next);
                          }} className="flex-1 border border-slate-200 bg-slate-50/50 rounded-xl px-3 py-2 text-[11px] outline-none focus:border-blue-500 focus:bg-white" />
                          <button onClick={() => set('gallery', form.gallery.filter((_, idx) => idx !== i))} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">✕</button>
                        </div>
                      ))}
                      <button onClick={() => set('gallery', [...form.gallery, ''])}
                        className="text-[11px] font-black text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors">+ Add Gallery URL</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100">
                <button onClick={() => saveMut.mutate(form)} disabled={saveMut.isPending}
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-[20px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50 flex items-center justify-center gap-3">
                  {saveMut.isPending ? 'Publishing...' : <><Building2 className="w-5 h-5" /> Save Property Listing</>}
                </button>
                {saveMut.isError && <p className="text-xs text-red-500 text-center mt-4 font-bold">{saveMut.error?.response?.data?.error}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
