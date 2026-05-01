import { useNavigate } from 'react-router-dom';
import { Shield, MessageCircle, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 hero-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/92 to-blue-900/82" />

      <div className="relative max-w-4xl mx-auto px-6 py-24 text-center page-fade">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-7">
          <Shield className="w-4 h-4 text-emerald-400" />
          Verified Properties · Smart Price Insights
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-6xl font-black leading-tight mb-5">
          Discover Verified Properties
        </h1>

        <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
          Get only the details you need — filtered to your budget and preferences.
          Connect with real agents instantly via WhatsApp.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a href="https://wa.me/919876543210?text=Hi, I'm interested in a property. Please share details."
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-whatsapp text-white font-bold px-7 py-3.5 rounded-xl shadow-xl shadow-green-900/30 hover:bg-whatsapp-dark hover:-translate-y-0.5 transition-all">
            <MessageCircle className="w-5 h-5" /> Get Property Details on WhatsApp
          </a>
          <button onClick={() => navigate('/properties')}
            className="flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/20 transition-all">
            Browse Properties <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
          {[
            { val: '340+', label: 'Properties Listed' },
            { val: '₹48Cr+', label: 'Deals Closed' },
            { val: '4.9★', label: 'Agent Rating' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-white">{s.val}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
