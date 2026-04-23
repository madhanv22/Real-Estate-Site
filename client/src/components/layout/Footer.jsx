import { Link } from 'react-router-dom';
import { Home, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-0">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-lg font-black">PropFunnel</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed">Verified properties. Smart price insights. Real agents. Your next home is one WhatsApp away.</p>
        </div>
        <div>
          <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Quick Links</div>
          <div className="flex flex-col gap-2.5">
            <Link to="/" className="text-sm text-white/40 hover:text-white/80 transition-colors">Home</Link>
            <Link to="/properties" className="text-sm text-white/40 hover:text-white/80 transition-colors">Properties</Link>
            <button 
              onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-left text-sm text-white/40 hover:text-white/80 transition-colors"
            >
              About Us
            </button>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Connect</div>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-green-900/30 hover:bg-whatsapp-dark transition-colors">
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <p className="text-xs text-white/30 mt-3">Mon–Sun · 9 AM – 8 PM IST</p>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-white/25 max-w-6xl mx-auto px-6">
        © 2025 PropFunnel. All properties subject to availability and verification.
      </div>
    </footer>
  );
}
