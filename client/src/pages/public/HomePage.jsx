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
