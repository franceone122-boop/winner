import React, { useState } from 'react';
import { ChevronDown, Shield, Trophy, Smartphone, Zap, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: 'How do I deposit money into my Winner account in Rwanda?',
    answer:
      'Depositing is instant and free of charge. You can deposit using MTN Mobile Money or Airtel Money directly by dialing *182# or through our in-app deposit modal. Funds reflect immediately in your balance with zero transaction fees.',
  },
  {
    question: 'What is the minimum stake for placing a bet?',
    answer:
      'The minimum stake on Winner is only 100 RWF for both single bets and accumulators. We believe in accessible entertainment for every sports enthusiast.',
  },
  {
    question: 'How does the Bet Builder and 2,000 RWF Freebet work?',
    answer:
      'Our Bet Builder feature allows you to combine multiple outcomes from a single football or basketball match (e.g. Match Result + Total Goals + First Goalscorer). Place your first qualifying Bet Builder ticket with minimum odds of 3.00 to automatically receive your 2,000 RWF Freebet in your bonus balance.',
  },
  {
    question: 'How fast are withdrawal payouts processed?',
    answer:
      'All withdrawals to verified MTN Mobile Money and Airtel Money accounts are automated and processed in less than 3 minutes. Simply go to My Account ➔ Withdraw, enter the amount, and receive your cash straight to your mobile phone.',
  },
  {
    question: 'What is the "FT 1X2 - 2UP" early payout market?',
    answer:
      'With our 2UP Early Payout, if the football team you backed to win goes 2 goals ahead at any time during the match, your bet is settled immediately as a WIN, regardless of whether the opposing team comes back to draw or win!',
  },
];

export const BottomSEOSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section className="bg-[#111111] border-t border-[#262626] text-gray-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 text-xs sm:text-sm">
        {/* Title & Introduction */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black italic tracking-tight text-white uppercase mb-2">
            Online Sports Betting with <span className="text-[#E51E2B]">Winner</span>
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-4xl">
            Welcome to Winner, Rwanda's premier online sports betting and gaming platform.
            Whether you follow the UEFA Champions League, English Premier League, Spanish LaLiga, or cheer for APR FC and Rayon Sports in the Rwanda Premier League, Winner delivers the highest market odds, rapid live in-play betting, and lightning-fast Mobile Money payouts.
          </p>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#191919] border border-[#2d2d2d] rounded-lg p-4">
            <div className="w-8 h-8 rounded bg-[#E51E2B]/10 flex items-center justify-center text-[#E51E2B] mb-2">
              <Trophy className="w-4 h-4 text-[#E51E2B]" />
            </div>
            <h3 className="font-bold text-white mb-1">Over 30+ Sports</h3>
            <p className="text-gray-400 text-xs">
              Bet on football, basketball, tennis, MMA, boxing, rugby, and virtual sports with thousands of daily markets.
            </p>
          </div>

          <div className="bg-[#191919] border border-[#2d2d2d] rounded-lg p-4">
            <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="font-bold text-white mb-1">MTN & Airtel Money</h3>
            <p className="text-gray-400 text-xs">
              Seamless mobile deposits & instant withdrawals 24 hours a day with zero hidden fees or delays.
            </p>
          </div>

          <div className="bg-[#191919] border border-[#2d2d2d] rounded-lg p-4">
            <div className="w-8 h-8 rounded bg-[#E51E2B]/10 flex items-center justify-center text-[#E51E2B] mb-2">
              <Zap className="w-4 h-4 text-[#E51E2B]" />
            </div>
            <h3 className="font-bold text-white mb-1">Live In-Play Betting</h3>
            <p className="text-gray-400 text-xs">
              Real-time odds updating every second with live match statistics, match trackers, and early cashout options.
            </p>
          </div>

          <div className="bg-[#191919] border border-[#2d2d2d] rounded-lg p-4">
            <div className="w-8 h-8 rounded bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-bold text-white mb-1">Safe & Licensed</h3>
            <p className="text-gray-400 text-xs">
              Strictly compliant with Rwandan national gaming regulations and responsible gambling practices.
            </p>
          </div>
        </div>

        {/* Live Betting & Responsible Gaming Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#161616] p-5 rounded-xl border border-[#282828]">
          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#E51E2B]" />
              <span>Real-Time In-Play Sports Wagering</span>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Experience the adrenaline rush of wagering as the action unfolds on the pitch. Winner offers comprehensive in-play markets on goals, next scorer, corners, cards, and set winners. With our responsive cashout engine, you can lock in profits or mitigate losses before the final whistle.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#E51E2B]" />
              <span>Responsible Gaming & Player Protection</span>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Sports betting is strictly entertainment for adults aged 18 and older. Winner provides self-exclusion features, daily deposit limits, and cooldown periods to ensure you always gamble within your limits. If you or someone you know requires support, call our toll-free line at 899.
            </p>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div>
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#E51E2B]" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-2">
            {FAQ_LIST.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#181818] border border-[#2a2a2a] rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-3 sm:p-4 flex items-center justify-between font-semibold text-white hover:text-[#E51E2B]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#E51E2B]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-gray-400 border-t border-[#252525] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer badges & copyright */}
        <div className="pt-6 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-white font-bold text-xs">Payment Partners:</span>
            <span className="px-2 py-1 bg-[#202020] rounded border border-[#333] text-gray-300 font-mono text-[11px]">
              MTN Mobile Money
            </span>
            <span className="px-2 py-1 bg-[#202020] rounded border border-[#333] text-gray-300 font-mono text-[11px]">
              Airtel Money
            </span>
            <span className="px-2 py-1 bg-[#202020] rounded border border-[#333] text-gray-300 font-mono text-[11px]">
              Visa / Mastercard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-red-950 text-red-400 rounded border border-red-800/40 text-[10px] font-bold">
              18+ ONLY
            </span>
            <span>© 2026 Winner Rwanda Ltd. All rights reserved.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
