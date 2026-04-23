export default function TestimonialsSection({ testimonials = [] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-black text-slate-900 mb-10">What Buyers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="text-amber-400 text-base mb-3">{'★'.repeat(t.rating)}</div>
              <p className="text-sm text-slate-500 italic leading-relaxed mb-4">"{t.text}"</p>
              <div className="font-extrabold text-sm text-slate-900">{t.name}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
