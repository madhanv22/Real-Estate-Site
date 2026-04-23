import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a href="https://wa.me/919876543210?text=Hi, I'm interested in a property."
      target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-whatsapp text-white font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-green-400/30 hover:bg-whatsapp-dark hover:-translate-y-1 transition-all">
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm">Chat Now</span>
    </a>
  );
}
