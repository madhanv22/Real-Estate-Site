import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProperty } from '../../api';
import GallerySection from '../../components/public/GallerySection';
import PriceHistoryChart from '../../components/public/PriceHistoryChart';
import AgentSidebar from '../../components/public/AgentSidebar';
import LeadModal from '../../components/public/LeadModal';
import VisitModal from '../../components/public/VisitModal';
import WhatsAppFloat from '../../components/public/WhatsAppFloat';
import { MapPin, Bed, Bath, Maximize2, ChevronLeft, CheckCircle, Lock } from 'lucide-react';

const tagColor = (tag) => {
  if (tag.includes('Ready') || tag.includes('RERA')) return 'bg-green-50 text-green-700 border border-green-200';
  if (tag.includes('Premium') || tag.includes('Luxury')) return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-blue-50 text-blue-700 border border-blue-200';
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leadOpen, setLeadOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id),
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  if (error || !property) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-slate-400">
      <p>Property not found.</p>
      <button onClick={() => navigate('/properties')} className="text-blue-600 font-semibold hover:underline">← Back to listings</button>
    </div>
  );

  const agent = property.Agent;

  return (
    <div className="page-fade">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back */}
        <button onClick={() => navigate('/properties')}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors mb-7">
          <ChevronLeft className="w-4 h-4" /> Back to Listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <GallerySection gallery={property.gallery || [property.img]} title={property.title} />

            {/* Title block */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {(property.tags || []).map((t) => (
                  <span key={t} className={`text-xs font-bold px-3 py-1 rounded-full ${tagColor(t)}`}>{t}</span>
                ))}
              </div>
              <h1 className="font-serif text-3xl font-black text-slate-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
                <MapPin className="w-4 h-4 shrink-0" /> {property.location}
              </div>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-4xl font-black text-slate-900">{property.price}</span>
                <span className="text-sm text-slate-400">{property.type} · {property.area}</span>
              </div>
              <div className="flex gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Bed className="w-4 h-4" /> {property.beds} Bedrooms</span>
                <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {property.baths} Bathrooms</span>
                <span className="flex items-center gap-1.5"><Maximize2 className="w-4 h-4" /> {property.area}</span>
              </div>
            </div>

            {/* Price history */}
            <PriceHistoryChart data={property.priceHistory || []} />

            {/* Amenities */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="font-extrabold text-slate-900 mb-4 flex items-center gap-2"><span>🏠</span> Amenities</div>
              <div className="grid grid-cols-2 gap-3">
                {(property.amenities || []).map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="font-extrabold text-slate-900 mb-4 flex items-center gap-2"><span>📍</span> Location Advantages</div>
              <div className="flex flex-col gap-2.5">
                {(property.nearby || []).map((n) => (
                  <div key={n} className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0" /> {n}
                  </div>
                ))}
              </div>
            </div>

            {/* Gated contact section */}
            <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden min-h-[140px]">
              <div className={`flex flex-col gap-2 transition-all ${unlocked ? '' : 'blur-sm select-none pointer-events-none'}`}>
                <p className="text-sm text-slate-600">📍 Exact Address: Plot 47, Luminaire Complex, Baner-Pashan Link Road, Pune 411045</p>
                <p className="text-sm text-slate-600">📞 Builder: Horizon Realty Pvt. Ltd. — +91 98000 12345</p>
                <p className="text-sm text-slate-600">🏗 Possession: December 2025 | Floors: G+18 | Units: 240</p>
                <p className="text-sm text-slate-600">📄 RERA No: P52100012345</p>
              </div>
              {!unlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
                  <Lock className="w-8 h-8 text-slate-300" />
                  <p className="text-sm font-bold text-slate-700 text-center max-w-xs">Unlock exact address, builder contact & full specs</p>
                  <button onClick={() => { setLeadOpen(true); setUnlocked(true); }}
                    className="bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors">
                    Unlock Full Details
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT – Sticky Sidebar */}
          <AgentSidebar
            agent={agent}
            propertyId={property.id}
            onLeadModal={() => setLeadOpen(true)}
            onVisitModal={() => setVisitOpen(true)}
          />
        </div>
      </div>

      {leadOpen && <LeadModal property={property} onClose={() => setLeadOpen(false)} />}
      {visitOpen && <VisitModal property={property} onClose={() => setVisitOpen(false)} />}
      <WhatsAppFloat />
    </div>
  );
}
