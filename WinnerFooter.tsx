import React from 'react';
import { Mail, Headphones, MessageSquare, Send, ChevronDown } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const WinnerFooter: React.FC = () => {
  const { setLiveChatOpen, oddsFormat, setOddsFormat, language, setLanguage } = useSportsbook();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#202020] text-gray-400 text-xs pt-8 pb-14 sm:pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Top links row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {/* Contact Us */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Contact Us</span>
            <div className="flex items-center gap-4 text-gray-300">
              <a
                href="mailto:customercare@winner.rw"
                className="flex flex-col items-center gap-1 hover:text-white transition-colors"
                title="Email Us"
              >
                <div className="p-1.5 bg-[#181818] rounded-full border border-[#2a2a2a]">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[10px]">Email</span>
              </a>

              <a
                href="tel:899"
                className="flex flex-col items-center gap-1 hover:text-white transition-colors"
                title="Call 899 Toll Free"
              >
                <div className="p-1.5 bg-[#181818] rounded-full border border-[#2a2a2a]">
                  <Headphones className="w-4 h-4" />
                </div>
                <span className="text-[10px]">Call Us</span>
              </a>

              <button
                onClick={() => setLiveChatOpen(true)}
                className="flex flex-col items-center gap-1 hover:text-white transition-colors"
                title="Live Chat"
              >
                <div className="p-1.5 bg-[#181818] rounded-full border border-[#2a2a2a]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[10px]">Chat</span>
              </button>

              <a
                href="https://t.me/winnerrwanda"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1 hover:text-white transition-colors"
                title="Telegram Channel"
              >
                <div className="p-1.5 bg-[#181818] rounded-full border border-[#2a2a2a]">
                  <Send className="w-4 h-4" />
                </div>
                <span className="text-[10px]">Telegram</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Social</span>
            <div className="flex items-center gap-3 text-gray-300">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center hover:text-white hover:border-[#444]"
              >
                <span className="font-bold text-xs">f</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center hover:text-white hover:border-[#444]"
              >
                <span className="font-bold text-xs">📸</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center hover:text-white hover:border-[#444]"
              >
                <span className="font-bold text-xs">𝕏</span>
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center hover:text-white hover:border-[#444]"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* App / Android */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">App</span>
            <button
              onClick={() => alert('Winner Android APK: Fast lightweight betting app for Rwanda punters.')}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white"
            >
              <span className="text-green-500 text-base">🤖</span>
              <span className="text-xs font-semibold">Android</span>
            </button>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <span>🇬🇧</span>
              <span>English</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
          </div>

          {/* Support Information */}
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer">
              <span>Support Information</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
            <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer">
              <span>Essentials</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
            <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer">
              <span>Help</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
            <div className="flex items-center justify-between text-gray-300 hover:text-white cursor-pointer">
              <span>Decimal</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </div>
          </div>

          {/* Blank spacer */}
          <div className="hidden md:block"></div>

          {/* Supported Networks (Exact from screenshot) */}
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <span className="text-[11px] uppercase tracking-wider text-gray-500 font-bold">Supported Networks:</span>
            <div className="flex items-center gap-2">
              {/* MTN MoMo badge */}
              <div className="px-2.5 py-1 rounded bg-[#ffcc00] border border-[#d4a800] text-black font-black text-xs flex items-center gap-1 shadow-sm">
                <span className="bg-black text-[#ffcc00] text-[9px] font-black px-1 rounded">MTN</span>
                <span className="text-[11px] font-black italic">MoMo</span>
              </div>
              {/* Airtel Money badge */}
              <div className="px-2.5 py-1 rounded bg-[#e60000] border border-[#b30000] text-white font-black text-xs flex items-center gap-1 shadow-sm">
                <span className="text-white text-[10px] font-bold">airtel</span>
                <span className="text-[9px] font-extrabold tracking-tight uppercase">money</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-4 border-t border-[#181818] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-red-950 text-red-400 rounded border border-red-800/40 text-[10px] font-bold">
              18+ ONLY
            </span>
            <span>Sports betting in Rwanda is strictly prohibited for persons under 18 years of age. Gamble responsibly.</span>
          </div>
          <div>
            <span>© 2026 Winner Rwanda Ltd. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
