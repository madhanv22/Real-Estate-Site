import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProperty } from '../../api';
import { ShieldCheck, CreditCard, CheckCircle2, Lock, ArrowLeft, Building2 } from 'lucide-react';

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading } = useQuery({ 
    queryKey: ['property', id], 
    queryFn: () => fetchProperty(id) 
  });
  
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  // Mock Payment Function (Will be replaced with Razorpay/Stripe)
  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 2000);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black text-slate-400 animate-pulse">Initializing Secure Checkout...</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center font-bold">Property not found.</div>;

  if (done) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-[40px] p-12 max-w-lg w-full text-center shadow-2xl">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4">Payment Successful!</h1>
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            Congratulations! Your booking for <span className="font-bold text-slate-800">{property.title}</span> has been confirmed. Our executive will reach out shortly for the documentation.
          </p>
          <button onClick={() => navigate('/')} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Summary */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
              <h1 className="text-3xl font-black text-slate-900 mb-8">Booking Summary</h1>
              
              <div className="flex gap-6 items-start">
                <img src={property.img} className="w-40 h-28 rounded-2xl object-cover shadow-md" alt="" />
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-1">{property.title}</h2>
                  <p className="text-slate-400 text-sm font-medium mb-4">{property.location}</p>
                  <div className="flex gap-4">
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-black uppercase">{property.type}</div>
                    <div className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg text-xs font-black uppercase">{property.area}</div>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-4 pt-8 border-t border-slate-50">
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Listing Price</span>
                  <span>{property.price}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold">
                  <span>Registration Fees</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                  <div>
                    <div className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Total Booking Amount</div>
                    <div className="text-4xl font-black text-slate-900">₹50,000</div>
                  </div>
                  <div className="text-emerald-500 text-xs font-black bg-emerald-50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Fully Refundable*
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <p className="text-sm text-blue-900 font-medium">
                Your transaction is protected by <span className="font-bold">256-bit SSL Encryption</span>. No card details are stored on our servers.
              </p>
            </div>
          </div>

          {/* Right: Payment Method */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl sticky top-8">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" /> Payment Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Customer Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 text-sm font-bold outline-none focus:border-blue-500 transition-all" />
                </div>

                <div className="pt-8">
                  <button 
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {processing ? (
                      'Redirecting to Secure Gateway...'
                    ) : (
                      <>
                        Confirm & Pay Booking Amount
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 font-bold text-center mt-6 uppercase tracking-widest">
                    Secured by Razorpay • UPI • Cards • Net Banking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
