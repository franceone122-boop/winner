import React, { useState, useRef } from 'react';
import {
  Settings,
  PlusCircle,
  Radio,
  Receipt,
  Users,
  CheckCircle,
  Clock,
  ArrowLeft,
  DollarSign,
  Shield,
  Zap,
  Image as ImageIcon,
  Upload,
  Check,
  RotateCcw,
  Link,
  AlertCircle,
  Search,
  RefreshCw,
  TrendingUp,
  Volume2,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { WinnerLogo } from './WinnerLogo';
import { MatchEvent } from '../types';

export const AdminPage: React.FC = () => {
  const {
    matches,
    user,
    switchDemoRole,
    adminUpdateOdds,
    adminToggleMatchStatus,
    adminSimulateGoal,
    adminSettleBet,
    adminCreateMatch,
    placedBets,
    formatMoney,
    formatOdds,
    logoUrl,
    setLogoUrl,
    setCurrentPage,
  } = useSportsbook();

  const [activeTab, setActiveTab] = useState<'matches' | 'bets' | 'punters' | 'add_match' | 'branding'>('matches');
  const [matchSearch, setMatchSearch] = useState('');
  const [matchFilterStatus, setMatchFilterStatus] = useState<'all' | 'live' | 'upcoming'>('all');

  // Logo upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoInputUrl, setLogoInputUrl] = useState('');
  const [logoSuccess, setLogoSuccess] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  // Add Match form state
  const [newHome, setNewHome] = useState('');
  const [newAway, setNewAway] = useState('');
  const [newLeague, setNewLeague] = useState('Premier League');
  const [newCategory, setNewCategory] = useState('ENGLAND');
  const [newOdd1, setNewOdd1] = useState(2.1);
  const [newOddX, setNewOddX] = useState(3.2);
  const [newOdd2, setNewOdd2] = useState(3.5);
  const [matchSuccess, setMatchSuccess] = useState(false);

  // Punter balance management state
  const [punters, setPunters] = useState([
    { id: 'p1', name: 'John Mugisha', phone: '+250 788 123 456', balance: 142500, role: 'punter', bets: 28 },
    { id: 'p2', name: 'Kagabo Eric', phone: '+250 783 987 654', balance: 65000, role: 'punter', bets: 14 },
    { id: 'p3', name: 'Diane Uwase', phone: '+250 722 456 789', balance: 340000, role: 'punter', bets: 42 },
    { id: 'p4', name: 'Claude Nshimiyimana', phone: '+250 788 555 112', balance: 12000, role: 'punter', bets: 9 },
  ]);
  const [punterSearch, setPunterSearch] = useState('');
  const [punterFeedback, setPunterFeedback] = useState<string | null>(null);

  // Filter matches
  const filteredMatches = matches.filter((m) => {
    const matchesSearch =
      m.homeTeam.name.toLowerCase().includes(matchSearch.toLowerCase()) ||
      m.awayTeam.name.toLowerCase().includes(matchSearch.toLowerCase()) ||
      m.leagueName.toLowerCase().includes(matchSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (matchFilterStatus === 'live') return m.isLive;
    if (matchFilterStatus === 'upcoming') return !m.isLive;
    return true;
  });

  const liveMatchesCount = matches.filter((m) => m.isLive).length;
  const pendingBetsCount = placedBets.filter((b) => b.status === 'pending').length;

  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHome.trim() || !newAway.trim()) return;

    const id = `custom_${Date.now()}`;
    const newMatch: MatchEvent = {
      id,
      sportId: 'football',
      leagueId: 'l-rwanda-prem',
      leagueName: newLeague,
      country: newCategory,
      homeTeam: {
        id: `t_${Date.now()}_1`,
        name: newHome.trim(),
        logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=64&q=80',
      },
      awayTeam: {
        id: `t_${Date.now()}_2`,
        name: newAway.trim(),
        logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=64&q=80',
      },
      startTime: 'Today 21:00',
      timestamp: Date.now() + 3600000,
      isLive: false,
      marketsCount: 16,
      mainMarkets: {
        homeWin: { id: `${id}_1`, label: '1', odds: Number(newOdd1) || 2.1, marketName: '1X2 Full Time' },
        draw: { id: `${id}_X`, label: 'X', odds: Number(newOddX) || 3.2, marketName: '1X2 Full Time' },
        awayWin: { id: `${id}_2`, label: '2', odds: Number(newOdd2) || 3.5, marketName: '1X2 Full Time' },
      },
    };

    adminCreateMatch(newMatch);
    setNewHome('');
    setNewAway('');
    setMatchSuccess(true);
    setTimeout(() => setMatchSuccess(false), 3000);
  };

  const handleAdjustBalance = (punterId: string, amount: number) => {
    setPunters((prev) =>
      prev.map((p) => (p.id === punterId ? { ...p, balance: Math.max(0, p.balance + amount) } : p))
    );
    setPunterFeedback(`Balance updated successfully (${amount > 0 ? '+' : ''}${formatMoney(amount)})!`);
    setTimeout(() => setPunterFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col font-sans select-none">
      {/* 1. TOP HEADER (Branded & Actionable) */}
      <header className="bg-[#000000] border-b border-[#222222] sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between gap-4">
          {/* Brand & Console Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              onClick={() => setCurrentPage('sportsbook')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
              title="Return to Sportsbook"
            >
              <WinnerLogo size="md" />
            </div>

            <div className="hidden sm:block h-6 w-px bg-[#262626]" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#E51E2B] flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                    Winner Operator &amp; Trading Console
                  </h1>
                  <span className="px-1.5 py-0.5 text-[9px] font-black bg-red-600/30 text-[#E51E2B] border border-red-500/40 rounded tracking-widest uppercase">
                    Super Admin
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 hidden md:block">
                  Real-time odds trader, live score broadcaster, bet settlement engine &amp; brand customizer
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions (Switch Role & Return to Sportsbook) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={switchDemoRole}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#181818] hover:bg-[#242424] border border-[#333] rounded text-xs text-gray-300 hover:text-white transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-yellow-400" />
              <span>Role: <strong className="text-white">{user?.role === 'admin' ? 'Admin' : 'Punter'}</strong></span>
            </button>

            <button
              onClick={() => setCurrentPage('sportsbook')}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#FFE500] hover:bg-[#ebd300] text-black font-extrabold text-xs uppercase tracking-wider rounded transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Subira kuri Sportsbook (Back)</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. EXECUTIVE METRICS BAR (Matching hf.PNG, Expanded) */}
      <section className="bg-[#141414] border-b border-[#242424] py-3.5 px-4 sm:px-6">
        <div className="max-w-[1920px] mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
          {/* Metric 1: Total Turnover */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-3">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block mb-1">
              TOTAL TURNOVER (GGR)
            </span>
            <div className="text-base sm:text-lg font-mono font-black text-[#E51E2B]">
              148,290,000 RWF
            </div>
            <span className="text-[10px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2% Today
            </span>
          </div>

          {/* Metric 2: Live Events Trading */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-3">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block mb-1">
              LIVE EVENTS TRADING
            </span>
            <div className="text-base sm:text-lg font-mono font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>{liveMatchesCount} Active</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-0.5 block">
              {matches.length} Total Matches
            </span>
          </div>

          {/* Metric 3: Pending Bets */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-3">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block mb-1">
              PENDING BETS
            </span>
            <div className="text-base sm:text-lg font-mono font-black text-cyan-400">
              {pendingBetsCount} Tickets
            </div>
            <span className="text-[10px] text-gray-400 mt-0.5 block">
              {placedBets.length} Total Placed
            </span>
          </div>

          {/* Metric 4: Punter Payout Ratio */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-3">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block mb-1">
              PUNTER PAYOUT RATIO
            </span>
            <div className="text-base sm:text-lg font-mono font-black text-emerald-400">
              92.4%
            </div>
            <span className="text-[10px] text-gray-400 mt-0.5 block">
              Target: &lt;94.0%
            </span>
          </div>

          {/* Metric 5: Active Punters */}
          <div className="bg-[#1a1a1a] border border-[#2d2d2d] rounded-lg p-3 hidden lg:block">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block mb-1">
              REGISTERED PUNTERS
            </span>
            <div className="text-base sm:text-lg font-mono font-black text-yellow-400">
              1,284 Users
            </div>
            <span className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> System Operational
            </span>
          </div>
        </div>
      </section>

      {/* 3. NAVIGATION TABS (Spacious & Clean) */}
      <div className="bg-[#121212] border-b border-[#242424] px-4 sm:px-6 sticky top-[56px] z-30">
        <div className="max-w-[1920px] mx-auto flex items-center space-x-1 sm:space-x-3 overflow-x-auto no-scrollbar text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'matches', label: 'In-Play & Matches (Odds Trader)', icon: Radio },
            { id: 'bets', label: `Bet Settlements (${pendingBetsCount})`, icon: Receipt },
            { id: 'punters', label: 'Punters & Balances', icon: Users },
            { id: 'add_match', label: 'Create New Event', icon: PlusCircle },
            { id: 'branding', label: 'Logo & Branding (Gushyiramo Logo)', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3.5 sm:px-4 flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
                  isSel
                    ? 'border-[#E51E2B] text-white bg-[#1c1c1c] font-black'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-[#181818]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSel ? 'text-[#E51E2B]' : 'text-gray-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN PAGE CONTENT AREA */}
      <main className="max-w-[1920px] w-full mx-auto p-4 sm:p-6 flex-1">
        {/* ============================================================ */}
        {/* TAB 1: IN-PLAY & MATCHES (Real-time Odds Trading & Scores) */}
        {/* ============================================================ */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            {/* Control Bar: Search & Status Filters */}
            <div className="bg-[#181818] border border-[#2b2b2b] p-3 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Shakisha umukino (Search team or league)..."
                  value={matchSearch}
                  onChange={(e) => setMatchSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#101010] border border-[#333] rounded text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#E51E2B]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setMatchFilterStatus('all')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                    matchFilterStatus === 'all'
                      ? 'bg-[#E51E2B] text-white'
                      : 'bg-[#222] text-gray-400 hover:text-white'
                  }`}
                >
                  All ({matches.length})
                </button>
                <button
                  onClick={() => setMatchFilterStatus('live')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    matchFilterStatus === 'live'
                      ? 'bg-red-950 border border-red-600 text-red-400'
                      : 'bg-[#222] text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>Live ({liveMatchesCount})</span>
                </button>
                <button
                  onClick={() => setMatchFilterStatus('upcoming')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                    matchFilterStatus === 'upcoming'
                      ? 'bg-[#333] text-white'
                      : 'bg-[#222] text-gray-400 hover:text-white'
                  }`}
                >
                  Upcoming
                </button>
              </div>
            </div>

            {/* Matches List (Card grid matching hf.PNG) */}
            <div className="space-y-3">
              {filteredMatches.map((m) => {
                const odd1 = m.mainMarkets?.homeWin;
                const oddX = m.mainMarkets?.draw;
                const odd2 = m.mainMarkets?.awayWin;

                return (
                  <div
                    key={m.id}
                    className="bg-[#181818] border border-[#2b2b2b] hover:border-[#383838] p-4 rounded-xl transition-all shadow-md"
                  >
                    {/* Match Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#262626]">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm sm:text-base text-white">
                            {m.homeTeam.name} vs {m.awayTeam.name}
                          </h3>
                          {m.isLive ? (
                            <span className="px-2 py-0.5 bg-red-950/80 border border-red-700/60 text-red-400 text-[10px] font-black rounded uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                              LIVE {m.liveMinute || "12'"}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-[#252525] border border-[#3a3a3a] text-gray-400 text-[10px] font-bold rounded">
                              UPCOMING
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {m.country} — {m.leagueName} ({m.startTime})
                        </p>
                      </div>

                      {/* Live Status Switch & Goal Controls */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => adminToggleMatchStatus(m.id)}
                          className={`px-3 py-1 rounded text-xs font-bold uppercase transition-all ${
                            m.isLive
                              ? 'bg-[#222] hover:bg-[#2d2d2d] text-gray-300 border border-[#444]'
                              : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                          }`}
                        >
                          {m.isLive ? 'End / Pause Live' : 'Click to Go Live'}
                        </button>

                        {m.isLive && (
                          <div className="flex items-center gap-1 bg-[#121212] p-1 rounded border border-[#333]">
                            <button
                              onClick={() => adminSimulateGoal(m.id, 'home')}
                              className="px-2 py-0.5 bg-[#2a2a2a] hover:bg-[#E51E2B] text-white rounded text-xs font-mono font-bold transition-colors"
                              title={`Goal for ${m.homeTeam.name}`}
                            >
                              ⚽ +1 {m.homeTeam.name.slice(0, 3)}
                            </button>
                            <span className="font-mono font-black text-sm px-1.5 text-yellow-400">
                              {m.liveScore?.home ?? 0} - {m.liveScore?.away ?? 0}
                            </span>
                            <button
                              onClick={() => adminSimulateGoal(m.id, 'away')}
                              className="px-2 py-0.5 bg-[#2a2a2a] hover:bg-[#E51E2B] text-white rounded text-xs font-mono font-bold transition-colors"
                              title={`Goal for ${m.awayTeam.name}`}
                            >
                              ⚽ +1 {m.awayTeam.name.slice(0, 3)}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Odds Manipulator (Directly matching hf.PNG: 1 (Home Win) | X (Draw) | 2 (Away Win)) */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Home Win Odd */}
                      <div className="flex items-center justify-between bg-[#121212] border border-[#2e2e2e] p-2.5 rounded-lg">
                        <span className="text-xs text-gray-300 font-semibold">1 (Home Win)</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.05"
                            min="1.01"
                            value={odd1?.odds || 1.5}
                            onChange={(e) => {
                              if (odd1) adminUpdateOdds(m.id, odd1.id, parseFloat(e.target.value) || 1.01);
                            }}
                            className="w-20 px-2 py-1 bg-[#202020] border border-[#444] rounded text-white font-mono font-black text-xs text-center focus:outline-none focus:border-[#E51E2B]"
                          />
                        </div>
                      </div>

                      {/* Draw Odd */}
                      <div className="flex items-center justify-between bg-[#121212] border border-[#2e2e2e] p-2.5 rounded-lg">
                        <span className="text-xs text-gray-300 font-semibold">X (Draw)</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.05"
                            min="1.01"
                            value={oddX?.odds || 3.0}
                            onChange={(e) => {
                              if (oddX) adminUpdateOdds(m.id, oddX.id, parseFloat(e.target.value) || 1.01);
                            }}
                            className="w-20 px-2 py-1 bg-[#202020] border border-[#444] rounded text-white font-mono font-black text-xs text-center focus:outline-none focus:border-[#E51E2B]"
                          />
                        </div>
                      </div>

                      {/* Away Win Odd */}
                      <div className="flex items-center justify-between bg-[#121212] border border-[#2e2e2e] p-2.5 rounded-lg">
                        <span className="text-xs text-gray-300 font-semibold">2 (Away Win)</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.05"
                            min="1.01"
                            value={odd2?.odds || 2.5}
                            onChange={(e) => {
                              if (odd2) adminUpdateOdds(m.id, odd2.id, parseFloat(e.target.value) || 1.01);
                            }}
                            className="w-20 px-2 py-1 bg-[#202020] border border-[#444] rounded text-white font-mono font-black text-xs text-center focus:outline-none focus:border-[#E51E2B]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: BET SETTLEMENTS & TICKETS */}
        {/* ============================================================ */}
        {activeTab === 'bets' && (
          <div className="space-y-4">
            <div className="bg-[#181818] border border-[#2b2b2b] p-4 rounded-xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#E51E2B]" />
                  Bet Settlements &amp; Ticket Clearing
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Settle pending customer betting tickets, trigger instant wallet payouts, or refund cancelled fixtures.
                </p>
              </div>
              <span className="px-3 py-1 bg-[#242424] border border-[#383838] rounded text-xs font-mono font-bold text-white">
                {pendingBetsCount} Pending Clearing
              </span>
            </div>

            {placedBets.length === 0 ? (
              <div className="bg-[#161616] border border-[#282828] rounded-xl p-12 text-center text-gray-400">
                <Receipt className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="font-bold text-white text-sm">No Bets Recorded in Session</p>
                <p className="text-xs text-gray-500 mt-1">
                  Place a bet in the Sportsbook to test live ticket settlements and instant wallet payouts.
                </p>
                <button
                  onClick={() => setCurrentPage('sportsbook')}
                  className="mt-4 px-4 py-2 bg-[#E51E2B] text-white rounded font-bold text-xs"
                >
                  Go Place a Bet
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {placedBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="bg-[#181818] border border-[#2b2b2b] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-xs text-white bg-[#262626] px-2 py-0.5 rounded border border-[#383838]">
                          Code: {bet.id.slice(0, 10).toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            bet.status === 'won'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                              : bet.status === 'lost'
                              ? 'bg-rose-950 text-rose-400 border border-rose-600'
                              : 'bg-yellow-950 text-yellow-400 border border-yellow-600'
                          }`}
                        >
                          {bet.status}
                        </span>
                        <span className="text-[11px] text-gray-400">{bet.timestamp}</span>
                      </div>

                      <div className="text-xs text-gray-300">
                        {bet.selections.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="font-bold text-white">{s.eventName}</span>
                            <span className="text-gray-400">({s.marketName}: {s.outcomeLabel} @ {s.odds})</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono pt-1">
                        <span className="text-gray-400">
                          Stake: <strong className="text-white">{formatMoney(bet.stake)}</strong>
                        </span>
                        <span className="text-gray-400">
                          Potential Return: <strong className="text-[#E51E2B]">{formatMoney(bet.potentialPayout)}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Settlement Controls */}
                    {bet.status === 'pending' ? (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => adminSettleBet(bet.id, 'won')}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs rounded transition-colors shadow"
                        >
                          ✓ Settle as WON
                        </button>
                        <button
                          onClick={() => adminSettleBet(bet.id, 'lost')}
                          className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-extrabold text-xs rounded transition-colors shadow"
                        >
                          ✗ Settle as LOST
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 italic">Settled and wallet updated</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: PUNTERS & BALANCES */}
        {/* ============================================================ */}
        {activeTab === 'punters' && (
          <div className="space-y-4">
            <div className="bg-[#181818] border border-[#2b2b2b] p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#E51E2B]" />
                  Punter Wallets &amp; Customer Relationship Management
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  View punter balances, credit promotional funds, manage VIP limits, or grant operator roles.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter punter..."
                  value={punterSearch}
                  onChange={(e) => setPunterSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#101010] border border-[#333] rounded text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#E51E2B]"
                />
              </div>
            </div>

            {punterFeedback && (
              <div className="p-3 bg-emerald-950/70 border border-emerald-600 rounded text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{punterFeedback}</span>
              </div>
            )}

            {/* Punters Table */}
            <div className="bg-[#181818] border border-[#2b2b2b] rounded-xl overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#2d2d2d] bg-[#141414] text-gray-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Punter Name</th>
                    <th className="py-3 px-4">Phone / ID</th>
                    <th className="py-3 px-4">Total Bets</th>
                    <th className="py-3 px-4">Current Balance</th>
                    <th className="py-3 px-4 text-right">Quick Wallet Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242424]">
                  {punters
                    .filter((p) => p.name.toLowerCase().includes(punterSearch.toLowerCase()) || p.phone.includes(punterSearch))
                    .map((punter) => (
                      <tr key={punter.id} className="hover:bg-[#1f1f1f] transition-colors">
                        <td className="py-3 px-4 font-bold text-white">
                          {punter.name}
                          <span className="ml-2 px-1.5 py-0.2 bg-[#2a2a2a] text-[9px] text-gray-400 rounded uppercase">
                            VIP Silver
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-300">{punter.phone}</td>
                        <td className="py-3 px-4 font-mono text-gray-300">{punter.bets} bets</td>
                        <td className="py-3 px-4 font-mono font-black text-white text-sm">
                          {formatMoney(punter.balance)}
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5">
                          <button
                            onClick={() => handleAdjustBalance(punter.id, 10000)}
                            className="px-2 py-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-600/50 text-emerald-300 rounded font-bold text-[11px] transition-colors"
                          >
                            +10k RWF
                          </button>
                          <button
                            onClick={() => handleAdjustBalance(punter.id, 50000)}
                            className="px-2 py-1 bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-600/50 text-emerald-300 rounded font-bold text-[11px] transition-colors"
                          >
                            +50k RWF
                          </button>
                          <button
                            onClick={() => handleAdjustBalance(punter.id, -10000)}
                            className="px-2 py-1 bg-rose-900/60 hover:bg-rose-800 border border-rose-600/50 text-rose-300 rounded font-bold text-[11px] transition-colors"
                          >
                            -10k RWF
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: CREATE EVENT */}
        {/* ============================================================ */}
        {activeTab === 'add_match' && (
          <div className="max-w-2xl mx-auto bg-[#181818] border border-[#2b2b2b] rounded-xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <PlusCircle className="w-5 h-5 text-[#E51E2B]" />
              Publish a New Match Event to Sportsbook
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Create an upcoming match. It will immediately show up in the live betting schedule.
            </p>

            {matchSuccess && (
              <div className="mb-4 p-3 bg-emerald-950/80 border border-emerald-600 rounded text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Match created successfully and published to Sportsbook feed!</span>
              </div>
            )}

            <form onSubmit={handleCreateMatch} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Home Team</label>
                  <input
                    type="text"
                    required
                    value={newHome}
                    onChange={(e) => setNewHome(e.target.value)}
                    placeholder="e.g. Rayon Sports"
                    className="w-full px-3 py-2 bg-[#121212] border border-[#383838] rounded text-white text-xs focus:outline-none focus:border-[#E51E2B]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Away Team</label>
                  <input
                    type="text"
                    required
                    value={newAway}
                    onChange={(e) => setNewAway(e.target.value)}
                    placeholder="e.g. APR FC"
                    className="w-full px-3 py-2 bg-[#121212] border border-[#383838] rounded text-white text-xs focus:outline-none focus:border-[#E51E2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">League Name</label>
                  <input
                    type="text"
                    required
                    value={newLeague}
                    onChange={(e) => setNewLeague(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#383838] rounded text-white text-xs focus:outline-none focus:border-[#E51E2B]"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Country / Category</label>
                  <input
                    type="text"
                    required
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#383838] rounded text-white text-xs focus:outline-none focus:border-[#E51E2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Odd 1 (Home)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newOdd1}
                    onChange={(e) => setNewOdd1(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#383838] rounded text-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Odd X (Draw)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newOddX}
                    onChange={(e) => setNewOddX(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#383838] rounded text-white font-mono font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Odd 2 (Away)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newOdd2}
                    onChange={(e) => setNewOdd2(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-[#121212] border border-[#383838] rounded text-white font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-extrabold text-xs uppercase tracking-wider rounded transition-colors shadow"
              >
                Publish Match to Sportsbook
              </button>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: LOGO & BRANDING (Gushyiramo ifoto ya Logo) */}
        {/* ============================================================ */}
        {activeTab === 'branding' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#181818] border border-[#2b2b2b] p-5 rounded-xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#E51E2B]" />
                    Custom Logo Management (Gushyiramo ifoto ya Logo)
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Upload a custom logo image or paste an image link. This immediately updates the logo across the top navigation bar, footer, and mobile screens.
                  </p>
                </div>
                {logoUrl ? (
                  <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-700/50 text-emerald-400 text-xs font-bold rounded flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Custom Logo Active
                  </span>
                ) : (
                  <span className="px-2.5 py-1 bg-[#242424] border border-[#3a3a3a] text-gray-300 text-xs font-bold rounded">
                    Official SVG Logo Active
                  </span>
                )}
              </div>

              {logoSuccess && (
                <div className="mt-4 p-3 bg-emerald-950/70 border border-emerald-600 rounded text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{logoSuccess}</span>
                </div>
              )}

              {logoError && (
                <div className="mt-4 p-3 bg-red-950/70 border border-red-600 rounded text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{logoError}</span>
                </div>
              )}
            </div>

            {/* Live Preview Display */}
            <div className="bg-[#141414] border border-[#2b2b2b] p-5 rounded-xl">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">
                Live Preview of Logo in App
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Navbar Black Preview */}
                <div className="bg-[#000000] border border-[#262626] p-5 rounded-lg flex flex-col items-center justify-center min-h-[110px]">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 self-start font-semibold">
                    Black Header Bar Preview
                  </span>
                  <WinnerLogo size="lg" />
                </div>

                {/* Dark Grey Footer/Cards Preview */}
                <div className="bg-[#1a1a1a] border border-[#333] p-5 rounded-lg flex flex-col items-center justify-center min-h-[110px]">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-3 self-start font-semibold">
                    Dark Background Preview
                  </span>
                  <WinnerLogo size="md" />
                </div>
              </div>
            </div>

            {/* Option 1: File Upload */}
            <div className="bg-[#181818] border border-[#2b2b2b] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                <Upload className="w-4 h-4 text-[#E51E2B]" />
                Option 1: Hitamo ifoto muri mudasobwa cyangwa telefoni (Upload File)
              </h4>
              <p className="text-xs text-gray-400">
                Select a PNG, JPG, SVG or WEBP file from your device. Recommended format: Transparent PNG, height 40px to 60px.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 2.5 * 1024 * 1024) {
                    setLogoError('Ifoto igomba kuba munsi ya 2.5MB (File size must be under 2.5MB)');
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    const dataUrl = reader.result as string;
                    setLogoUrl(dataUrl);
                    setLogoError(null);
                    setLogoSuccess('Ifoto ya logo yashyizwemo neza! (Logo uploaded successfully!)');
                    setTimeout(() => setLogoSuccess(null), 4000);
                  };
                  reader.readAsDataURL(file);
                }}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#3d3d3d] hover:border-[#E51E2B] bg-[#121212] hover:bg-[#161616] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-[#222] group-hover:bg-[#E51E2B]/10 flex items-center justify-center mb-3 transition-colors">
                  <Upload className="w-7 h-7 text-gray-400 group-hover:text-[#E51E2B] transition-colors" />
                </div>
                <span className="text-sm font-bold text-gray-200 group-hover:text-white">
                  Kanda hano uhitemo ifoto (Click to choose logo file)
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  PNG, SVG, WEBP cyangwa JPG (Max 2.5MB)
                </span>
              </div>
            </div>

            {/* Option 2: Image URL */}
            <div className="bg-[#181818] border border-[#2b2b2b] p-5 rounded-xl space-y-4">
              <h4 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
                <Link className="w-4 h-4 text-[#E51E2B]" />
                Option 2: Shyiramo link y&apos;ifoto (Paste Image URL)
              </h4>
              <div className="flex gap-2.5">
                <input
                  type="url"
                  value={logoInputUrl}
                  onChange={(e) => setLogoInputUrl(e.target.value)}
                  placeholder="https://example.com/winner-logo.png"
                  className="flex-1 px-3.5 py-2.5 bg-[#121212] border border-[#383838] rounded-lg text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#E51E2B]"
                />
                <button
                  onClick={() => {
                    if (!logoInputUrl.trim()) {
                      setLogoError('Ugomba gushyiramo URL y&apos;ifoto (Please enter an image URL)');
                      return;
                    }
                    setLogoUrl(logoInputUrl.trim());
                    setLogoError(null);
                    setLogoSuccess('Logo yashyizwemo binyuze kuri URL! (Logo URL applied successfully!)');
                    setLogoInputUrl('');
                    setTimeout(() => setLogoSuccess(null), 4000);
                  }}
                  className="px-5 py-2.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-extrabold rounded-lg text-xs transition-colors shrink-0"
                >
                  Bika (Apply)
                </button>
              </div>
            </div>

            {/* Reset to Default Logo */}
            <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
              <span className="text-xs text-gray-400">
                Logo ibikwa muri gahunda y&apos;ububiko bwawe (Persisted in storage).
              </span>
              <button
                onClick={() => {
                  setLogoUrl(null);
                  setLogoSuccess('Gahunda yasubiye kuri logo isanzwe ya Winner! (Reset to official Winner SVG logo!)');
                  setTimeout(() => setLogoSuccess(null), 4000);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#252525] hover:bg-[#303030] border border-[#3e3e3e] text-gray-300 hover:text-white rounded-lg text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Subiza kuri Logo Isanzwe (Reset to Default Logo)</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
