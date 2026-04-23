import { ShieldCheck, CreditCard, CheckCircle2, Building2, X } from 'lucide-react';
import { useState } from 'react';

export default function PaymentModal({ property, onNotifySuccess, onClose }) {
  const [method, setMethod] = useState('upi');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[48px] max-w-md w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden scale-in-center border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Custom Thin Scrollbar Styling */}
        <style>{`
          .custom-scroll::-webkit-scrollbar { width: 4px; }
          .custom-scroll::-webkit-scrollbar-track { background: transparent; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        `}</style>
        
        <div className="overflow-y-auto custom-scroll">
          {/* Header */}
          <div className="bg-slate-50 px-10 pt-10 pb-8 relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors p-2 hover:bg-slate-200/50 rounded-full">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">PropFunnel Pay</h3>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Secure Checkout</p>
            </div>
          </div>
          
          <div className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Booking Amount</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">₹50,000</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Property</p>
              <p className="text-sm font-black text-slate-700 truncate max-w-[120px]">{property.title}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-10 pb-12 pt-6">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Select Payment Method</p>
          
          <div className="space-y-3 mb-10">
            <button 
              onClick={() => setMethod('upi')}
              className={`w-full flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300 ${
                method === 'upi' 
                  ? 'border-blue-600 bg-blue-50/50 shadow-inner' 
                  : 'border-slate-50 bg-slate-50/30 hover:border-slate-200 text-slate-500'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${method === 'upi' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`font-black text-sm ${method === 'upi' ? 'text-blue-700' : 'text-slate-700'}`}>UPI / Credit Card</p>
                <p className="text-[10px] font-bold text-slate-400">GPay, PhonePe, Cards</p>
              </div>
              {method === 'upi' && <div className="ml-auto w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
            </button>

            <button 
              onClick={() => setMethod('netbanking')}
              className={`w-full flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300 ${
                method === 'netbanking' 
                  ? 'border-blue-600 bg-blue-50/50 shadow-inner' 
                  : 'border-slate-50 bg-slate-50/30 hover:border-slate-200 text-slate-500'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${method === 'netbanking' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className={`font-black text-sm ${method === 'netbanking' ? 'text-blue-700' : 'text-slate-700'}`}>Net Banking</p>
                <p className="text-[10px] font-bold text-slate-400">All Major Indian Banks</p>
              </div>
              {method === 'netbanking' && <div className="ml-auto w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full"></div></div>}
            </button>
          </div>

          <button 
            onClick={onNotifySuccess}
            className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-black text-lg hover:bg-blue-600 transition-all duration-500 shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95"
          >
            <CheckCircle2 className="w-6 h-6" /> Complete Payment
          </button>
          
          <p className="text-[9px] text-slate-400 font-bold text-center mt-6 uppercase tracking-widest flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" /> Secure Transaction Verified by PCI-DSS
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
  </svg>
);
