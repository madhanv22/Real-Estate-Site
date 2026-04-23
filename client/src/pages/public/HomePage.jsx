import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProperties, fetchTestimonials } from '../../api';
import HeroSection from '../../components/public/HeroSection';
import BenefitsSection from '../../components/public/BenefitsSection';
import PropertyCard from '../../components/public/PropertyCard';
import TestimonialsSection from '../../components/public/TestimonialsSection';
import WhatsAppFloat from '../../components/public/WhatsAppFloat';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { data: properties = [] } = useQuery({ queryKey: ['properties', { featured: 'true' }], queryFn: () => fetchProperties({ featured: 'true' }) });
  const { data: testimonials = [] } = useQuery({ queryKey: ['testimonials'], queryFn: fetchTestimonials });

  return (
    <div className="page-fade">
      <HeroSection />
      <BenefitsSection />

      {/* Featured Properties */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-black text-slate-900">Featured Properties</h2>
              <p className="text-sm text-slate-400 mt-1">Hand-picked by our consultants this week</p>
            </div>
            <button onClick={() => navigate('/properties')}
              className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 3).map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* The PropFunnel Story / About Section */}
      <section id="about-section" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full -z-10" />
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Our Vision" className="rounded-[40px] shadow-2xl object-cover h-[500px] w-full" />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-xl text-white">
                <div className="text-4xl font-black mb-1">100%</div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-80">Verified Leads</div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                Building a <span className="text-blue-600">Faster</span>, Smarter Real Estate Journey.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                PropFunnel was born out of a simple frustration: <span className="italic">Buying a home shouldn't take months of phone calls and fake listings.</span>
              </p>
              <div className="space-y-6 mb-10">
                {[
                  { t: 'For Buyers', d: 'Get direct access to verified developers and instant WhatsApp connectivity with expert agents.' },
                  { t: 'For Real Estate Owners', d: 'A powerful SaaS platform to manage your listings, team, and leads in one dashboard.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-1.5 h-12 bg-blue-600 rounded-full" />
                    <div>
                      <h4 className="font-black text-slate-900 mb-1">{item.t}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/properties')}
                className="bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Banner */}
      <div className="bg-gradient-to-br from-emerald-600 to-green-500 py-20 px-6 text-center text-white">
        <h2 className="font-serif text-3xl font-black mb-3">Ready to Find Your Home?</h2>
        <p className="text-white/80 mb-8">Talk to a verified agent in under 2 minutes</p>
        <a href="https://wa.me/919876543210?text=Hi, I'm looking for a property in Pune."
          target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-4 rounded-xl shadow-xl hover:-translate-y-0.5 transition-all">
          <MessageCircle className="w-5 h-5" /> Start on WhatsApp — It's Free
        </a>
      </div>

      <WhatsAppFloat />
    </div>
  );
}
