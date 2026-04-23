const FILTERS = ['All', '1 BHK', '2 BHK', '3 BHK', 'Villa'];

export default function FilterPills({ active, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map((f) => (
        <button key={f} onClick={() => onChange(f)}
          className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
            active === f
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
          }`}>
          {f}
        </button>
      ))}
    </div>
  );
}
