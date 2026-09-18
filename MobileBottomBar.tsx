import React, { useState } from 'react';
import { Trophy, Radio, Receipt, Coins, User, X } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { BetslipSidebar } from './BetslipSidebar';

export const MobileBottomBar: React.FC = () => {
  const {
    activeEventTab,
    setActiveEventTab,
    selections,
    isLoggedIn,
    setUserAccountOpen,
    setUserAccountTab,
    setAuthModalOpen,
    setAuthModalMode,
  } = useSportsbook();

  const [mobileBetslipOpen, setMobileBetslipOpen] = useState(false);

  return (
    <>
      {/* Mobile Sticky Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#141414] border-t border-[#262626] flex items-center justify-around h-14 lg:hidden text-gray-400">
        <button
          onClick={() => {
            setActiveEventTab('top');
            setMobileBetslipOpen(false);
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] ${
            activeEventTab === 'top' && !mobileBetslipOpen ? 'text-[#E51E2B] font-bold' : ''
          }`}
        >
          <Trophy className="w-4 h-4 mb-0.5" />
          <span>Sports</span>
        </button>

        <button
          onClick={() => {
            setActiveEventTab('live');
            setMobileBetslipOpen(false);
          }}
          className={`flex flex-col items-center justify-center flex-1 h-full text-[10px] relative ${
            activeEventTab === 'live' && !mobileBetslipOpen ? 'text-[#E51E2B] font-bold' : ''
          }`}
        >
          <div className="relative">
            <Radio className="w-4 h-4 mb-0.5" />
            <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
          </div>
          <span>Live</span>
        </button>

        {/* Center Betslip with red badge */}
        <button
          onClick={() => setMobileBetslipOpen(!mobileBetslipOpen)}
          className="flex flex-col items-center justify-center flex-1 h-full text-[10px] relative text-white"
        >
          <div className="relative -mt-4 w-11 h-11 rounded-full bg-[#E51E2B] text-white flex items-center justify-center shadow-lg shadow-red-600/30 border-2 border-[#141414]">
            <Receipt className="w-5 h-5 fill-white" />
            {selections.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white font-mono font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#141414]">
                {selections.length}
              </span>
            )}
          </div>
          <span className="mt-0.5 font-bold text-gray-200">Betslip</span>
        </button>

        <button
          onClick={() => alert('Casino: Over 1,000 top slot machines and tables.')}
          className="flex flex-col items-center justify-center flex-1 h-full text-[10px]"
        >
          <Coins className="w-4 h-4 mb-0.5 text-orange-400" />
          <span>Casino</span>
        </button>

        <button
          onClick={() => {
            if (isLoggedIn) {
              setUserAccountTab('overview');
              setUserAccountOpen(true);
            } else {
              setAuthModalMode('login');
              setAuthModalOpen(true);
            }
          }}
          className="flex flex-col items-center justify-center flex-1 h-full text-[10px]"
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>Account</span>
        </button>
      </nav>

      {/* Mobile Betslip Modal / Bottom Sheet */}
      {mobileBetslipOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-xs lg:hidden">
          <div className="bg-[#161616] border-t border-[#333] rounded-t-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="p-3 bg-[#121212] border-b border-[#282828] flex items-center justify-between">
              <span className="font-black text-white text-sm uppercase">My Betslip</span>
              <button
                onClick={() => setMobileBetslipOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <BetslipSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
