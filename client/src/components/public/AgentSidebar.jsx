import { Link } from 'react-router-dom';
import { MessageCircle, Calendar, Zap, Shield, Clock, CheckCircle, CreditCard } from 'lucide-react';

export default function AgentSidebar({ agent, propertyId, onLeadModal, onVisitModal }) {
  if (!agent) return null;
  return (
    <div className="sticky top-20 bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
      {/* Agent info */}
      <div className="flex items-center gap-3 pb-5 border-b border-slate-100 mb-5">
        <img src={agent.avatar} alt={agent.name}
          className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" />
        <div>
          <div className="font-extrabold text-slate-900">{agent.name}</div>
          <div className="text-xs text-slate-400 mt-0.5">{agent.title}</div>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">{agent.experience}</span>
            <span className="text-[11px] font-bold bg-green-50 text-green-600 border border-green-200 px-2 py-0.5 rounded-full">{agent.deals}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 mb-5">
        <Link to={`/checkout/${propertyId}`}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-black py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
          <CreditCard className="w-4 h-4" /> Reserve This Property
        </Link>
        <button onClick={onLeadModal}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100">
          <MessageCircle className="w-4 h-4" /> Get Full Details
        </button>
        <button onClick={onVisitModal}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
          <Calendar className="w-4 h-4" /> Book Site Visit
        </button>
        <button onClick={onLeadModal}
          className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:border-slate-400 transition-colors">
          <Zap className="w-4 h-4" /> Unlock Price Insights
        </button>
      </div>

      {/* Trust */}
      <div className="border-t border-slate-100 pt-4 flex flex-col gap-2.5">
        {[
          { icon: Shield, text: 'RERA Verified Property' },
          { icon: Clock, text: 'Agent responds in <15 min' },
          { icon: CheckCircle, text: 'No hidden brokerage fees' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-xs text-slate-500">
            <Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {text}
          </div>
        ))}
      </div>
    </div>
  );
}
