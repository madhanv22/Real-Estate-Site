import { Shield, TrendingUp, MessageCircle } from 'lucide-react';

const benefits = [
  {
    icon: Shield, color: 'bg-blue-50 text-blue-600',
    title: 'Verified Listings',
    desc: 'Every property is RERA-checked and agent-verified before it reaches you. No ghost listings, ever.',
  },
  {
    icon: TrendingUp, color: 'bg-green-50 text-green-600',
    title: 'Smart Price History',
    desc: 'Year-by-year price trends so you understand the market and buy with complete confidence.',
  },
  {
    icon: MessageCircle, color: 'bg-violet-50 text-violet-600',
    title: 'Direct Agent Connect',
    desc: 'WhatsApp-first communication. Talk to real agents, not call centers. Responses in under 15 minutes.',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-black text-slate-900 mb-10">Why Buyers Trust Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="p-7 border border-slate-200 rounded-2xl hover:shadow-card hover:-translate-y-1 transition-all">
              <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-extrabold text-slate-900 mb-2">{title}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
