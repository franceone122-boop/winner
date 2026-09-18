import React, { useState } from 'react';
import { X, Search, Receipt, CheckCircle, Clock, AlertTriangle, QrCode } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const CheckBetslipModal: React.FC = () => {
  const {
    checkBetslipModalOpen,
    setCheckBetslipModalOpen,
    placedBets,
    formatMoney,
    formatOdds,
  } = useSportsbook();

  const [inputCode, setInputCode] = useState('VB-8841');
  const [searched, setSearched] = useState(true);

  if (!checkBetslipModalOpen) return null;

  const foundBet = placedBets.find(
    (b) => b.bookingCode.toLowerCase() === inputCode.trim().toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#181818] border border-[#333] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-[#141414] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#E51E2B]" />
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              CHECK BETSLIP & TICKET VERIFICATION
            </h2>
          </div>
          <button
            onClick={() => setCheckBetslipModalOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 bg-[#1c1c1c] border-b border-[#282828]">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setSearched(false);
              }}
              placeholder="Enter Booking Code (e.g. VB-8841)"
              className="flex-1 px-3 py-2 bg-[#222] border border-[#383838] rounded text-white font-mono text-xs uppercase focus:border-[#E51E2B] focus:outline-none"
            />
            <button
              onClick={() => setSearched(true)}
              className="px-4 py-2 bg-[#E51E2B] hover:bg-[#c91824] text-white font-extrabold text-xs uppercase rounded"
            >
              Check Ticket
            </button>
          </div>
        </div>

        {/* Result Area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
          {searched && foundBet ? (
            <div className="bg-[#141414] border border-[#2e2e2e] rounded-lg p-4 space-y-3 text-xs">
              <div className="flex justify-between items-start border-b border-[#252525] pb-2">
                <div>
                  <span className="font-mono font-black text-[#E51E2B] text-base block">
                    {foundBet.bookingCode}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    Placed: {new Date(foundBet.createdAt).toLocaleString()}
                  </span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                    foundBet.status === 'won'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : foundBet.status === 'lost'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                  }`}
                >
                  {foundBet.status}
                </span>
              </div>

              {/* Selections */}
              <div className="space-y-2">
                <p className="text-gray-400 uppercase font-bold text-[10px]">Match Selections:</p>
                {foundBet.selections.map((sel, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-[#1b1b1b] rounded border border-[#2a2a2a] flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-white">{sel.eventName}</p>
                      <p className="text-[10px] text-gray-400">{sel.marketName}: {sel.outcomeLabel}</p>
                    </div>
                    <span className="font-mono font-bold text-[#E51E2B] bg-[#222] px-2 py-0.5 rounded border border-[#333]">
                      {formatOdds(sel.odds)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial summary */}
              <div className="pt-2 border-t border-[#252525] grid grid-cols-3 text-center">
                <div>
                  <span className="text-gray-400 text-[10px] block">Stake</span>
                  <span className="font-mono font-bold text-white">{formatMoney(foundBet.stake)}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Total Odds</span>
                  <span className="font-mono font-bold text-white">{formatOdds(foundBet.totalOdds)}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Potential Payout</span>
                  <span className="font-mono font-black text-[#E51E2B]">
                    {formatMoney(foundBet.potentialPayout)}
                  </span>
                </div>
              </div>
            </div>
          ) : searched ? (
            <div className="text-center py-6 text-gray-400">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-yellow-500/60" />
              <p className="text-xs font-bold text-white">No Ticket Found for "{inputCode}"</p>
              <p className="text-[11px] text-gray-500 mt-1">
                Try booking code: <strong className="text-[#E51E2B]">VB-8841</strong>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
