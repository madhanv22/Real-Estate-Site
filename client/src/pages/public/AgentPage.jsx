import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAgent } from '../../api';
import PropertyCard from '../../components/public/PropertyCard';
import WhatsAppFloat from '../../components/public/WhatsAppFloat';
import { ChevronLeft, MessageCircle, Shield } from 'lucide-react';

export default function AgentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchAgent(id),
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const agent = data?.agent;
  const properties = data?.properties || [];
  if (!agent) return null;

  return (
    <div className="page-fade">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-900 transition-colors mb-7">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Agent header */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-8 text-white mb-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-6 flex-wrap">
            <img src={agent.avatar} alt={agent.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-blue-400 mb-1 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Verified Agent
              </div>
              <h1 className="font-serif text-3xl font-black mb-1">{agent.name}</h1>
              <div className="text-white/60 text-sm mb-2">{agent.title}</div>
              <div className="text-white/40 italic text-sm mb-3">"{agent.tagline}"</div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/20 px-3 py-1 rounded-full">{agent.experience}</span>
                <span className="text-xs font-bold bg-green-500/20 text-green-300 border border-green-400/20 px-3 py-1 rounded-full">{agent.deals}</span>
              </div>
            </div>
          </div>
          <a href={`https://wa.me/${agent.phone}?text=Hi ${encodeURIComponent(agent.name)}, I'm interested in one of your properties.`}
            target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-whatsapp text-white font-bold px-6 py-3 rounded-xl hover:bg-whatsapp-dark transition-colors shadow-lg shadow-green-900/30 flex-shrink-0">
            <MessageCircle className="w-5 h-5" /> Chat with {agent.name.split(' ')[0]}
          </a>
        </div>

        {/* Agent's listings */}
        <h2 className="font-serif text-2xl font-black text-slate-900 mb-6">
          {agent.name.split(' ')[0]}'s Properties ({properties.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </div>
      <WhatsAppFloat />
    </div>
  );
}
