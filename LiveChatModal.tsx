import React, { useState } from 'react';
import { X, Send, Headphones, Check, Phone, Mail } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

interface ChatMsg {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const LiveChatModal: React.FC = () => {
  const { liveChatOpen, setLiveChatOpen, user } = useSportsbook();
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      sender: 'bot',
      text: `Muraho! Welcome to Winner 24/7 Customer Support (Twandikire). How can we assist your betting today?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!liveChatOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg: ChatMsg = {
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // Automated smart assistant response
    setTimeout(() => {
      let reply = 'Thank you for your message. An official Winner agent is reviewing your inquiry.';
      const lower = userText.toLowerCase();

      if (lower.includes('deposit') || lower.includes('momo') || lower.includes('airtel') || lower.includes('mtn')) {
        reply =
          'To deposit, dial *182# on MTN or Airtel, or tap the red DEPOSIT button on your Winner header. Mobile money deposits are instant with 0% fee!';
      } else if (lower.includes('withdraw') || lower.includes('payout') || lower.includes('cash')) {
        reply =
          'Withdrawals are processed automatically in under 3 minutes directly to your registered MTN or Airtel phone number. Head to My Account > Withdraw.';
      } else if (lower.includes('bonus') || lower.includes('freebet') || lower.includes('promo')) {
        reply =
          'Our Bet Builder promotion gives you a 2,000 RWF Freebet upon placing your first qualifying accumulator with odds >= 3.00! Plus up to 500% Accumulator Boost.';
      } else if (lower.includes('ticket') || lower.includes('betslip') || lower.includes('code')) {
        reply =
          'You can verify any ticket or load selections using the "Check Betslip" button in the top menu or on the right betslip panel.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md shadow-2xl rounded-xl overflow-hidden border border-[#333] bg-[#181818] flex flex-col h-[480px]">
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-[#991b1b] to-[#7f1d1d] text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#E51E2B] text-white flex items-center justify-center font-bold">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wide">Twandikire Live Care</h3>
            <p className="text-[10px] text-gray-200">Online • Toll Free 899</p>
          </div>
        </div>

        <button
          onClick={() => setLiveChatOpen(false)}
          className="p-1 rounded-full hover:bg-black/30 text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-2.5 rounded-lg max-w-[85%] ${
                m.sender === 'user'
                  ? 'bg-[#E51E2B] text-white font-medium'
                  : 'bg-[#222] text-gray-200 border border-[#333]'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[9px] text-gray-500 mt-0.5 px-1">{m.time}</span>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="px-2 py-1 bg-[#141414] border-t border-[#262626] flex gap-1 overflow-x-auto no-scrollbar text-[10px]">
        <button
          onClick={() => setInput('How to deposit with MTN MoMo?')}
          className="px-2 py-0.5 bg-[#202020] text-gray-300 rounded border border-[#333] hover:border-[#E51E2B] whitespace-nowrap"
        >
          Deposit MTN MoMo
        </button>
        <button
          onClick={() => setInput('How long do withdrawals take?')}
          className="px-2 py-0.5 bg-[#202020] text-gray-300 rounded border border-[#333] hover:border-[#E51E2B] whitespace-nowrap"
        >
          Withdrawal Speed
        </button>
        <button
          onClick={() => setInput('Tell me about 2,000 RWF Freebet')}
          className="px-2 py-0.5 bg-[#202020] text-gray-300 rounded border border-[#333] hover:border-[#E51E2B] whitespace-nowrap"
        >
          2k Freebet Promo
        </button>
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-2 bg-[#161616] border-t border-[#282828] flex gap-1.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-1.5 bg-[#222] border border-[#333] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-[#E51E2B] hover:bg-[#c91824] text-white rounded font-bold"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
