import { useState } from 'react';

export default function GallerySection({ gallery = [], title }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-100">
        <img src={gallery[active]} alt={title} className="w-full h-full object-cover" />
      </div>
      {gallery.length > 1 && (
        <div className="flex gap-2 mt-2">
          {gallery.map((g, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-16 w-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${i === active ? 'border-blue-500' : 'border-transparent'}`}>
              <img src={g} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
