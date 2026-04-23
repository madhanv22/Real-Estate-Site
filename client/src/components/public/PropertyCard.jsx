import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, Heart, Share2, TrendingUp } from 'lucide-react';

const tagColor = (tag) => {
  if (tag.includes('Ready') || tag.includes('RERA')) return 'bg-green-50 text-green-700 border border-green-200';
  if (tag.includes('Premium') || tag.includes('Luxury')) return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-blue-50 text-blue-700 border border-blue-200';
};

export default function PropertyCard({ property: p }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/properties/${p.id}`)}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img src={p.img} alt={p.title} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {(p.tags || []).map((t) => (
            <span key={t} className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${tagColor(t)}`}>{t}</span>
          ))}
        </div>
        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          {[Heart, Share2].map((Icon, i) => (
            <button key={i} onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-sm transition-all">
              <Icon className="w-3.5 h-3.5 text-slate-500" />
            </button>
          ))}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" /> Price Trend ↑
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="font-bold text-slate-900 text-base mb-1">{p.title}</div>
        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2.5">
          <MapPin className="w-3 h-3 shrink-0" /> {p.location}
        </div>
        <div className="text-2xl font-black text-slate-900 mb-2.5">{p.price}</div>

        {/* Specs */}
        <div className="flex gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {p.beds} Beds</span>
          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {p.baths} Baths</span>
          <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5" /> {p.area}</span>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(p.highlights || []).slice(0, 3).map((h) => (
            <span key={h} className="text-[11px] bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/properties/${p.id}`); }}
            className="flex-1 bg-slate-900 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-slate-700 transition-colors">
            View Details
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate(`/properties/${p.id}`); }}
            className="px-3 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-500 hover:border-slate-400 transition-colors font-semibold">
            Availability
          </button>
        </div>
      </div>
    </div>
  );
}
