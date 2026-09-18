import React, { useState } from 'react';
import {
  X,
  User,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt,
  Clock,
  History,
  Shield,
  LogOut,
  CheckCircle,
  CreditCard,
  Smartphone,
  AlertCircle,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';

export const UserAccountModal: React.FC = () => {
  const {
    user,
    userAccountOpen,
    setUserAccountOpen,
    userAccountTab,
    setUserAccountTab,
    depositFunds,
    withdrawFunds,
    placedBets,
    transactions,
    cashoutBet,
    formatOdds,
    formatMoney,
    logout,
  } = useSportsbook();

  // Deposit state
  const [depositAmount, setDepositAmount] = useState<number>(5000);
  const [depositMethod, setDepositMethod] = useState<string>('MTN Mobile Money');
  const [depositPhoneNumber, setDepositPhoneNumber] = useState<string>(user?.phone || '0788123456');
  const [depositSuccessMsg, setDepositSuccessMsg] = useState<string | null>(null);

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState<number>(10000);
  const [withdrawMethod, setWithdrawMethod] = useState<string>('MTN Mobile Money');
  const [withdrawMsg, setWithdrawMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Responsible gaming limits state
  const [dailyLimit, setDailyLimit] = useState<number>(user?.dailyDepositLimit || 500000);
  const [limitSaved, setLimitSaved] = useState(false);

  if (!userAccountOpen || !user) return null;

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;
    const ok = depositFunds(depositAmount, `${depositMethod} (${depositPhoneNumber})`);
    if (ok) {
      setDepositSuccessMsg(
        `Successfully deposited ${depositAmount.toLocaleString()} ${user.currency} via ${depositMethod}! Funds are ready.`
      );
      setTimeout(() => setDepositSuccessMsg(null), 4000);
    }
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = withdrawFunds(withdrawAmount, withdrawMethod);
    setWithdrawMsg({ success: res.success, text: res.message });
    setTimeout(() => setWithdrawMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#181818] border border-[#333] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#282828] bg-[#141414] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E51E2B] text-white font-black flex items-center justify-center text-sm shadow">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-sm">{user.fullName}</h2>
                <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800/40 rounded text-[9px] font-semibold flex items-center gap-0.5">
                  <CheckCircle className="w-2.5 h-2.5" />
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">{user.phone || user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setUserAccountOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#252525]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-[#1e1e1e] border-b border-[#282828]">
          <div className="bg-[#151515] p-2.5 rounded border border-[#2c2c2c]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Real Balance</span>
            <span className="text-base sm:text-lg font-mono font-black text-[#E51E2B]">
              {formatMoney(user.balance)}
            </span>
          </div>

          <div className="bg-[#151515] p-2.5 rounded border border-[#2c2c2c]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Bonus Freebets</span>
            <span className="text-base sm:text-lg font-mono font-black text-green-400">
              {formatMoney(user.bonusBalance)}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
            <button
              onClick={() => setUserAccountTab('deposit')}
              className="flex-1 py-2 bg-[#E51E2B] hover:bg-[#c91824] text-white font-black text-xs uppercase rounded tracking-wider transition-colors flex items-center justify-center gap-1 shadow"
            >
              <ArrowDownCircle className="w-3.5 h-3.5" />
              <span>Deposit</span>
            </button>
            <button
              onClick={() => setUserAccountTab('withdraw')}
              className="flex-1 py-2 bg-[#252525] hover:bg-[#303030] text-gray-200 border border-[#444] font-bold text-xs uppercase rounded tracking-wider transition-colors flex items-center justify-center gap-1"
            >
              <ArrowUpCircle className="w-3.5 h-3.5" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-[#282828] bg-[#141414] px-3 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'deposit', label: 'Deposit', icon: ArrowDownCircle },
            { id: 'withdraw', label: 'Withdraw', icon: ArrowUpCircle },
            { id: 'bets', label: 'Bet History', icon: Receipt },
            { id: 'transactions', label: 'Transactions', icon: History },
            { id: 'responsible', label: 'Responsible Gaming', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = userAccountTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setUserAccountTab(tab.id as any)}
                className={`py-2.5 px-3 flex items-center gap-1.5 whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'border-[#E51E2B] text-[#E51E2B] font-bold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 1. OVERVIEW */}
          {userAccountTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg p-3">
                  <h3 className="text-xs font-bold text-white mb-2 uppercase">Account Details</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account ID:</span>
                      <span className="font-mono text-gray-200">{user.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Currency:</span>
                      <span className="font-bold text-white">{user.currency} (Rwandan Franc)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Registered Phone:</span>
                      <span className="font-mono text-gray-200">{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Role:</span>
                      <span className="font-bold uppercase text-[#E51E2B]">{user.role}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg p-3">
                  <h3 className="text-xs font-bold text-white mb-2 uppercase">Betting Activity</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Placed Bets:</span>
                      <span className="font-mono text-white font-bold">{placedBets.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pending Tickets:</span>
                      <span className="font-mono text-yellow-400 font-bold">
                        {placedBets.filter((b) => b.status === 'pending').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Won Tickets:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {placedBets.filter((b) => b.status === 'won').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#161616] p-3 rounded-lg border border-[#282828] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Need to sign out of this device?</p>
                  <p className="text-[11px] text-gray-400">Your betslip and pending bets will remain safe.</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setUserAccountOpen(false);
                  }}
                  className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs rounded transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. DEPOSIT */}
          {userAccountTab === 'deposit' && (
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              {depositSuccessMsg && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs rounded flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{depositSuccessMsg}</span>
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">Select Payment Method</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'MTN Mobile Money', label: 'MTN MoMo', icon: Smartphone, tag: '*182#' },
                    { id: 'Airtel Money', label: 'Airtel Money', icon: Smartphone, tag: 'Instant' },
                    { id: 'Visa / Mastercard', label: 'Bank Card', icon: CreditCard, tag: 'Instant' },
                    { id: 'Prepaid Voucher', label: 'Winner Voucher', icon: Receipt, tag: 'Code' },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSel = depositMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setDepositMethod(method.id)}
                        className={`cursor-pointer p-2.5 rounded-lg border text-center transition-all ${
                          isSel
                            ? 'bg-[#2b1214] border-[#E51E2B] text-[#E51E2B]'
                            : 'bg-[#1c1c1c] border-[#2f2f2f] text-gray-300 hover:bg-[#252525]'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="block text-xs font-bold truncate">{method.label}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{method.tag}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Phone or Account input */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Mobile Number / Account
                </label>
                <input
                  type="text"
                  value={depositPhoneNumber}
                  onChange={(e) => setDepositPhoneNumber(e.target.value)}
                  placeholder="0788 123 456"
                  className="w-full px-3 py-2 bg-[#222] border border-[#383838] rounded text-white font-mono text-xs focus:border-[#E51E2B] focus:outline-none"
                  required
                />
              </div>

              {/* Quick Amount presets */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Select Amount (RWF)</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[1000, 2000, 5000, 10000, 20000, 50000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDepositAmount(amt)}
                      className={`py-1.5 rounded text-xs font-mono font-bold transition-colors border ${
                        depositAmount === amt
                          ? 'bg-[#E51E2B] text-white border-[#E51E2B]'
                          : 'bg-[#222] text-gray-300 border-[#333] hover:bg-[#2a2a2a]'
                      }`}
                    >
                      {amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    min={100}
                    step={500}
                    className="w-full pl-3 pr-14 py-2 bg-[#222] border border-[#383838] rounded text-white font-mono font-bold text-sm focus:border-[#E51E2B] focus:outline-none"
                    required
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-gray-400 font-bold">RWF</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-black text-xs uppercase tracking-wider rounded shadow transition-transform active:scale-95"
              >
                PROCEED TO DEPOSIT ({depositAmount.toLocaleString()} RWF)
              </button>
            </form>
          )}

          {/* 3. WITHDRAW */}
          {userAccountTab === 'withdraw' && (
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              {withdrawMsg && (
                <div
                  className={`p-3 text-xs rounded border ${
                    withdrawMsg.success
                      ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
                      : 'bg-red-950/80 border-red-700 text-red-200'
                  }`}
                >
                  {withdrawMsg.text}
                </div>
              )}

              <div className="bg-[#1e1e1e] p-3 rounded-lg border border-[#2d2d2d] flex items-center justify-between text-xs">
                <span className="text-gray-400">Available For Instant Withdrawal:</span>
                <span className="font-mono font-black text-[#E51E2B] text-sm">
                  {formatMoney(user.balance)}
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Withdrawal Method
                </label>
                <select
                  value={withdrawMethod}
                  onChange={(e) => setWithdrawMethod(e.target.value)}
                  className="w-full px-3 py-2 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                >
                  <option value="MTN Mobile Money">MTN Mobile Money ({user.phone})</option>
                  <option value="Airtel Money">Airtel Money ({user.phone})</option>
                  <option value="Direct Bank Transfer">Direct Bank Transfer (BPR / BK)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Amount to Withdraw (RWF)
                </label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  min={500}
                  max={user.balance}
                  step={500}
                  className="w-full px-3 py-2 bg-[#222] border border-[#383838] rounded text-white font-mono font-bold text-sm focus:border-[#E51E2B] focus:outline-none"
                  required
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Minimum withdrawal: 500 RWF • Processing time: Under 3 minutes.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-black text-xs uppercase tracking-wider rounded shadow transition-transform active:scale-95"
              >
                REQUEST INSTANT WITHDRAWAL
              </button>
            </form>
          )}

          {/* 4. BETS HISTORY */}
          {userAccountTab === 'bets' && (
            <div className="space-y-3">
              {placedBets.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Receipt className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs">No bets placed yet.</p>
                </div>
              ) : (
                placedBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-lg p-3 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between border-b border-[#282828] pb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-[#E51E2B]">{bet.bookingCode}</span>
                        <span className="text-[10px] text-gray-400 capitalize">({bet.type})</span>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                          bet.status === 'won'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : bet.status === 'lost'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : bet.status === 'cashed_out'
                            ? 'bg-blue-950 text-blue-400 border border-blue-800'
                            : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                        }`}
                      >
                        {bet.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {bet.selections.map((sel, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px]">
                          <div>
                            <span className="font-semibold text-white">{sel.eventName}</span>
                            <span className="text-gray-400 ml-1.5">
                              [{sel.marketName}: {sel.outcomeLabel}]
                            </span>
                          </div>
                          <span className="font-mono text-gray-300">{formatOdds(sel.odds)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#262626] flex items-center justify-between text-[11px]">
                      <div>
                        <span className="text-gray-400">Stake: </span>
                        <span className="font-mono text-white font-bold">{formatMoney(bet.stake)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Total Odds: </span>
                        <span className="font-mono text-white font-bold">{formatOdds(bet.totalOdds)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Payout: </span>
                        <span className="font-mono text-[#E51E2B] font-black">
                          {formatMoney(bet.potentialPayout)}
                        </span>
                      </div>
                    </div>

                    {bet.status === 'pending' && bet.cashoutValue && (
                      <button
                        onClick={() => cashoutBet(bet.id)}
                        className="w-full py-1.5 bg-[#252525] hover:bg-[#333] text-emerald-400 border border-emerald-600/40 rounded font-bold text-xs"
                      >
                        Cashout for {formatMoney(bet.cashoutValue)}
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* 5. TRANSACTIONS */}
          {userAccountTab === 'transactions' && (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-[#1c1c1c] border border-[#2d2d2d] rounded p-2.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    {tx.type === 'deposit' || tx.type === 'bet_payout' || tx.type === 'bonus_credited' ? (
                      <ArrowDownCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ArrowUpCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-white capitalize">{tx.type.replace('_', ' ')}</p>
                      <p className="text-[10px] text-gray-400 font-mono">{tx.reference}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`font-mono font-bold text-xs ${
                        tx.type === 'deposit' || tx.type === 'bet_payout' || tx.type === 'bonus_credited'
                          ? 'text-emerald-400'
                          : 'text-gray-200'
                      }`}
                    >
                      {tx.type === 'deposit' || tx.type === 'bet_payout' || tx.type === 'bonus_credited'
                        ? '+'
                        : '-'}
                      {formatMoney(tx.amount)}
                    </span>
                    <span className="block text-[9px] text-gray-500">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. RESPONSIBLE GAMING */}
          {userAccountTab === 'responsible' && (
            <div className="space-y-4 text-xs">
              <div className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg p-3 space-y-2">
                <h3 className="font-bold text-white uppercase flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#E51E2B]" />
                  <span>Daily Deposit Limit</span>
                </h3>
                <p className="text-gray-400 text-[11px]">
                  Set a mandatory ceiling on how much real money you can deposit per 24 hours.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="number"
                    value={dailyLimit}
                    onChange={(e) => setDailyLimit(Number(e.target.value))}
                    step={10000}
                    className="px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white font-mono text-xs w-44"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setLimitSaved(true);
                      setTimeout(() => setLimitSaved(false), 3000);
                    }}
                    className="px-3 py-1.5 bg-[#E51E2B] text-white font-bold rounded"
                  >
                    Save Limit
                  </button>
                  {limitSaved && <span className="text-emerald-400 font-semibold">Saved!</span>}
                </div>
              </div>

              <div className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg p-3 space-y-2">
                <h3 className="font-bold text-white uppercase">Self-Exclusion & Timeout</h3>
                <p className="text-gray-400 text-[11px]">
                  Take a break from sports betting. You can temporarily lock your account for 24 hours, 7 days, or 30 days.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('Account locked for 24 Hours. You will be logged out.')}
                    className="px-3 py-1 bg-[#282828] hover:bg-[#333] text-gray-300 rounded border border-[#3a3a3a]"
                  >
                    24h Cooloff
                  </button>
                  <button
                    onClick={() => alert('Account locked for 7 Days.')}
                    className="px-3 py-1 bg-[#282828] hover:bg-[#333] text-gray-300 rounded border border-[#3a3a3a]"
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => alert('Self-Exclusion activated for 6 Months.')}
                    className="px-3 py-1 bg-red-950 text-red-300 rounded border border-red-800"
                  >
                    6 Months Exclusion
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
