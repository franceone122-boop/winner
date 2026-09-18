import React, { useState } from 'react';
import {
  Receipt,
  Trash2,
  Share2,
  Check,
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  X,
  Zap,
  Gift,
  Headphones,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const BetslipSidebar: React.FC = () => {
  const {
    selections,
    removeSelection,
    clearBetslip,
    stake,
    setStake,
    acceptOddsChanges,
    setAcceptOddsChanges,
    bookingCodeInput,
    setBookingCodeInput,
    loadBookingCode,
    totalOdds,
    accumulatorBonus,
    potentialPayout,
    placeBet,
    placedBets,
    cashoutBet,
    formatOdds,
    formatMoney,
    betslipSidebarTab,
    setBetslipSidebarTab,
    setLiveChatOpen,
    setUserAccountOpen,
    setUserAccountTab,
    setCheckBetslipModalOpen,
    isLoggedIn,
    setAuthModalOpen,
    setAuthModalMode,
  } = useSportsbook();

  const [notification, setNotification] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleLoadCode = () => {
    if (!bookingCodeInput.trim()) return;
    const res = loadBookingCode(bookingCodeInput);
    setNotification(res.message);
    setTimeout(() => setNotification(null), 3500);
  };

  const handlePlaceBet = () => {
    const res = placeBet();
    setNotification(res.message);
    if (res.success && res.bet) {
      setCopiedCode(res.bet.bookingCode);
    }
    setTimeout(() => setNotification(null), 4000);
  };

  const pendingBets = placedBets.filter((b) => b.status === 'pending');

  return (
    <aside className="w-full lg:w-[310px] shrink-0 bg-[#161616] border-l border-[#262626] flex flex-col h-full select-none">
      {/* 6. Top Tabs: BETSLIP (count) and MY BETS (count) */}
      <div className="grid grid-cols-2 bg-[#121212] border-b border-[#262626] text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setBetslipSidebarTab('betslip')}
          className={`py-3 flex items-center justify-center gap-1.5 transition-all border-b-2 ${
            betslipSidebarTab === 'betslip'
              ? 'border-[#E51E2B] text-[#E51E2B] bg-[#1a0f10]'
              : 'border-transparent text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Receipt className="w-3.5 h-3.5" />
          <span>BETSLIP ({selections.length})</span>
        </button>

        <button
          onClick={() => setBetslipSidebarTab('mybets')}
          className={`py-3 flex items-center justify-center gap-1.5 transition-all border-b-2 ${
            betslipSidebarTab === 'mybets'
              ? 'border-[#E51E2B] text-[#E51E2B] bg-[#1a0f10]'
              : 'border-transparent text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>MY BETS ({pendingBets.length})</span>
        </button>
      </div>

      {/* BETSLIP CONTENT */}
      {betslipSidebarTab === 'betslip' ? (
        <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
          <div>
            {/* Accept Odds Changes & Remove All Header */}
            <div className="p-2.5 border-b border-[#262626] flex items-center justify-between text-[11px] bg-[#181818]">
              <label className="flex items-center gap-1.5 cursor-pointer text-gray-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={acceptOddsChanges}
                  onChange={(e) => setAcceptOddsChanges(e.target.checked)}
                  className="rounded bg-[#2a2a2a] border-[#444] text-[#E51E2B] focus:ring-0 w-3.5 h-3.5 accent-[#E51E2B]"
                />
                <span className="select-none">Accept Odds Changes</span>
              </label>

              {selections.length > 0 && (
                <button
                  onClick={clearBetslip}
                  className="text-gray-400 hover:text-red-400 flex items-center gap-1 font-semibold transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove All</span>
                </button>
              )}
            </div>

            {/* Booking Code Section */}
            <div className="p-2.5 border-b border-[#262626] bg-[#141414]">
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={bookingCodeInput}
                  onChange={(e) => setBookingCodeInput(e.target.value)}
                  placeholder="Booking Code"
                  className="flex-1 px-2.5 py-1.5 bg-[#202020] border border-[#333] rounded text-gray-100 text-xs focus:border-[#E51E2B] focus:outline-none uppercase font-mono placeholder:normal-case placeholder:text-gray-500"
                />
                <button
                  onClick={handleLoadCode}
                  className="px-3.5 py-1.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-extrabold text-xs rounded uppercase tracking-wider transition-colors shrink-0 shadow"
                >
                  LOAD
                </button>
              </div>

              {notification && (
                <div className="mt-2 p-2 rounded bg-[#202020] border border-[#3a3a3a] text-xs text-red-300 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#E51E2B]" />
                  <span className="leading-tight">{notification}</span>
                </div>
              )}
            </div>

            {/* SELECTIONS LIST OR EMPTY STATE */}
            {selections.length === 0 ? (
              <div className="p-6 text-center text-gray-400 flex flex-col items-center justify-center my-4">
                <div className="w-16 h-16 rounded-full bg-[#202020] flex items-center justify-center mb-3 border border-[#333]">
                  <Receipt className="w-8 h-8 text-gray-500" />
                </div>
                <h2 className="text-sm font-bold text-gray-200">Your Betslip Is Empty</h2>
                <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                  Please click on any match odds to add selections to your betslip.
                </p>

                <div className="mt-4 pt-3 border-t border-[#262626] w-full">
                  <span className="text-[11px] text-gray-400 block mb-2 font-semibold">
                    Need inspiration?
                  </span>
                  <button
                    onClick={() => {
                      setBookingCodeInput('WIN-8841');
                      loadBookingCode('WIN-8841');
                    }}
                    className="w-full py-1.5 px-2 bg-[#222] hover:bg-[#2c2c2c] border border-[#383838] rounded text-xs text-[#E51E2B] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Load Popular Treble (x1.76)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-2 space-y-2 max-h-[290px] overflow-y-auto no-scrollbar">
                {selections.map((sel) => (
                  <div
                    key={sel.selectionId}
                    className="bg-[#1d1d1d] border border-[#2d2d2d] rounded-lg p-2 relative group hover:border-[#3d3d3d] transition-all"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => removeSelection(sel.selectionId)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-red-400 p-0.5 rounded transition-colors"
                      title="Remove selection"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="pr-5">
                      <p className="text-xs font-bold text-white truncate">{sel.eventName}</p>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5">{sel.leagueName}</p>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-[#262626] flex items-center justify-between">
                      <div className="text-[11px]">
                        <span className="text-gray-400">{sel.marketName}: </span>
                        <span className="font-bold text-[#E51E2B]">{sel.outcomeLabel}</span>
                      </div>
                      <span className="font-mono font-black text-xs text-white bg-[#282828] px-2 py-0.5 rounded border border-[#383838]">
                        {formatOdds(sel.odds)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BETSLIP FOOTER / STAKE & SUMMARY (Active when selections exist) */}
          {selections.length > 0 && (
            <div className="p-3 bg-[#131313] border-t border-[#262626] space-y-2.5">
              {/* Accumulator Bonus Banner */}
              {accumulatorBonus > 0 && (
                <div className="bg-[#241011] border border-[#E51E2B]/40 rounded p-1.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[#E51E2B] font-bold">
                    <Gift className="w-3.5 h-3.5" />
                    <span>Accumulator Boost</span>
                  </div>
                  <span className="font-mono font-black text-[#E51E2B]">
                    +{(accumulatorBonus * 100).toFixed(0)}%
                  </span>
                </div>
              )}

              {/* Total Odds */}
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>Total Odds:</span>
                <span className="font-mono font-black text-sm text-white">
                  {formatOdds(totalOdds)}
                </span>
              </div>

              {/* Quick Stake buttons */}
              <div>
                <div className="grid grid-cols-4 gap-1 mb-1.5">
                  {[500, 1000, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setStake(amt)}
                      className={`py-1 rounded text-[10px] font-mono font-bold transition-all border ${
                        stake === amt
                          ? 'bg-[#E51E2B] text-white border-[#E51E2B]'
                          : 'bg-[#222] hover:bg-[#2b2b2b] text-gray-300 border-[#333]'
                      }`}
                    >
                      {amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  ))}
                </div>

                {/* Custom Stake Input */}
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={stake || ''}
                    onChange={(e) => setStake(Number(e.target.value))}
                    min={100}
                    step={100}
                    placeholder="Enter Stake (RWF)"
                    className="w-full pl-3 pr-12 py-2 bg-[#1f1f1f] border border-[#383838] rounded text-white font-mono font-bold text-xs focus:outline-none focus:border-[#E51E2B]"
                  />
                  <span className="absolute right-3 text-xs font-bold text-gray-400 pointer-events-none">
                    RWF
                  </span>
                </div>
              </div>

              {/* Potential Payout */}
              <div className="bg-[#1c1c1c] p-2 rounded border border-[#2d2d2d] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">
                    Potential Win
                  </span>
                  <span className="text-sm font-mono font-black text-[#E51E2B]">
                    {formatMoney(potentialPayout)}
                  </span>
                </div>
                <TrendingUp className="w-5 h-5 text-[#E51E2B]" />
              </div>

              {/* Action Buttons: Exact 1:1 match to nnn.PNG */}
              {!isLoggedIn ? (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setAuthModalMode('login');
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-[#FFE500] hover:bg-[#ebd300] text-black font-black text-xs uppercase tracking-wider rounded transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>LOGIN TO BET</span>
                  </button>

                  <button
                    onClick={() => {
                      const code = `WN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
                      setCopiedCode(code);
                    }}
                    className="w-full py-2 bg-[#262626] hover:bg-[#303030] text-white border border-[#3d3d3d] font-bold text-xs uppercase tracking-wider rounded transition-all"
                  >
                    BOOK A BET
                  </button>

                  <div className="text-center text-[11px] text-gray-400 pt-1">
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => {
                        setAuthModalMode('register');
                        setAuthModalOpen(true);
                      }}
                      className="text-[#FFE500] hover:underline font-bold"
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <button
                    onClick={handlePlaceBet}
                    className="w-full py-2.5 bg-[#FFE500] hover:bg-[#ebd300] text-black font-black text-sm uppercase tracking-wider rounded shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5"
                  >
                    <span>PLACE BET</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      const code = `WN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
                      setCopiedCode(code);
                    }}
                    className="w-full py-1.5 bg-[#222] hover:bg-[#2c2c2c] text-gray-300 hover:text-white border border-[#333] font-semibold text-xs uppercase tracking-wider rounded transition-all"
                  >
                    BOOK BETSLIP CODE
                  </button>
                </div>
              )}

              {copiedCode && (
                <div className="text-center text-[11px] text-emerald-400 font-mono">
                  Ticket Created: <strong>{copiedCode}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* MY BETS TAB (Open Bets & Live Cashout) */
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-2">
          {pendingBets.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-300">No Open Bets</p>
              <p className="text-[11px] text-gray-500 mt-1">
                You do not have any pending sports bets.
              </p>
            </div>
          ) : (
            pendingBets.map((bet) => (
              <div
                key={bet.id}
                className="bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg p-2.5 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-[11px] border-b border-[#282828] pb-1.5">
                  <span className="font-mono font-bold text-[#E51E2B]">{bet.bookingCode}</span>
                  <span className="text-[10px] bg-red-950 text-red-400 px-1.5 py-0.2 rounded border border-red-800/40 uppercase font-semibold">
                    {bet.status}
                  </span>
                </div>

                <div className="space-y-1">
                  {bet.selections.map((s, idx) => (
                    <div key={idx} className="flex justify-between text-[11px]">
                      <span className="text-gray-300 truncate pr-2">{s.eventName}</span>
                      <span className="text-white font-mono shrink-0">
                        {formatOdds(s.odds)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-1.5 border-t border-[#282828] flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-gray-400">Stake: </span>
                    <span className="font-mono text-white">{formatMoney(bet.stake)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">To Win: </span>
                    <span className="font-mono font-bold text-[#E51E2B]">
                      {formatMoney(bet.potentialPayout)}
                    </span>
                  </div>
                </div>

                {/* Instant Cashout Button */}
                {bet.cashoutValue && (
                  <button
                    onClick={() => cashoutBet(bet.id)}
                    className="w-full mt-1 py-1.5 bg-[#252525] hover:bg-[#303030] text-emerald-400 hover:text-emerald-300 font-bold border border-emerald-500/40 rounded flex items-center justify-center gap-1 text-[11px] transition-colors"
                  >
                    <span>Cashout Now: </span>
                    <strong className="font-mono">{formatMoney(bet.cashoutValue)}</strong>
                  </button>
                )}
              </div>
            ))
          )}

          <div className="p-2 text-center">
            <button
              onClick={() => {
                setUserAccountTab('bets');
                setUserAccountOpen(true);
              }}
              className="text-[11px] text-[#E51E2B] hover:underline font-semibold"
            >
              View Full Bet History ➔
            </button>
          </div>
        </div>
      )}

      {/* 7. RIGHT-SIDE PROMOTIONAL / CONTACT AREA (Original artwork & layout inspired by "Twandikire" reference) */}
      <div className="p-2.5 bg-[#121212] border-t border-[#262626]">
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#7f1d1d] p-3 text-white shadow-lg">
          {/* Subtle background decoration */}
          <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              {/* Twandikire / Need Help headline in Rwandan/English */}
              <h3 className="font-black text-sm uppercase tracking-wide flex items-center gap-1 text-white">
                <Headphones className="w-4 h-4 text-white" />
                <span>Twandikire</span>
              </h3>
              <p className="text-[10px] text-gray-200 mt-0.5">
                24/7 Customer Care & Support
              </p>

              <div className="mt-2 space-y-1 text-[11px]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Phone className="w-3 h-3 text-white" />
                  <span>899</span>
                  <span className="text-[9px] bg-black/40 px-1 py-0.2 rounded text-white uppercase font-mono">
                    Toll Free
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-200 truncate">
                  <Mail className="w-3 h-3 text-white shrink-0" />
                  <span className="truncate">customercare@winner.rw</span>
                </div>
              </div>
            </div>

            {/* Support Live Chat Action */}
            <button
              onClick={() => setLiveChatOpen(true)}
              className="p-2.5 rounded-full bg-white hover:bg-gray-100 text-[#E51E2B] transition-transform hover:scale-110 shadow-md shrink-0 ml-2"
              title="Open Live Chat"
              aria-label="Open Live Chat"
            >
              <MessageSquare className="w-4 h-4 fill-[#E51E2B]" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
