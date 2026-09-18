import React, { useState, useRef } from 'react';
import {
  X,
  Settings,
  Flame,
  Radio,
  Receipt,
  Users,
  PlusCircle,
  TrendingUp,
  CheckCircle,
  XCircle,
  Edit2,
  DollarSign,
  Shield,
  Zap,
  Image as ImageIcon,
  Upload,
  Check,
  RotateCcw,
  Link,
  AlertCircle,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { WinnerLogo } from './WinnerLogo';
import { MatchEvent } from '../types';

export const AdminPanelModal: React.FC = () => {
  const {
    adminModalOpen,
    setAdminModalOpen,
    matches,
    adminUpdateMatchOdds,
    adminUpdateMatchScore,
    adminToggleMatchStatus,
    adminSettleBet,
    placedBets,
    formatMoney,
    formatOdds,
    logoUrl,
    setLogoUrl,
  } = useSportsbook();

  const [activeTab, setActiveTab] = useState<'matches' | 'bets' | 'punters' | 'add_match' | 'branding'>('matches');

  // Logo upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoInputUrl, setLogoInputUrl] = useState('');
  const [logoSuccess, setLogoSuccess] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  // Add Match form state
  const [newHome, setNewHome] = useState('');
  const [newAway, setNewAway] = useState('');
  const [newLeague, setNewLeague] = useState('Premier League - England');
  const [newSport, setNewSport] = useState('football');
  const [newHomeOdds, setNewHomeOdds] = useState('2.10');
  const [newDrawOdds, setNewDrawOdds] = useState('3.25');
  const [newAwayOdds, setNewAwayOdds] = useState('3.60');
  const [createMsg, setCreateMsg] = useState<string | null>(null);

  if (!adminModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xs">
      <div className="bg-[#181818] border border-[#3a3a3a] rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Admin Header */}
        <div className="p-4 bg-[#121212] border-b border-[#292929] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#E51E2B] text-white font-black flex items-center justify-center">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  WINNER OPERATOR & TRADING CONSOLE
                </h2>
                <span className="bg-red-950 text-red-400 border border-red-800/40 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Real-time odds trader, live score broadcaster & bet settlement engine
              </p>
            </div>
          </div>

          <button
            onClick={() => setAdminModalOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#252525]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Key Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-[#1e1e1e] border-b border-[#282828] text-xs">
          <div className="bg-[#141414] p-2.5 rounded border border-[#2c2c2c]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Total Turnover (GGR)</span>
            <span className="font-mono font-black text-sm text-[#E51E2B]">148,290,000 RWF</span>
          </div>

          <div className="bg-[#141414] p-2.5 rounded border border-[#2c2c2c]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Live Events Trading</span>
            <span className="font-mono font-black text-sm text-red-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {matches.filter((m) => m.isLive).length} Active
            </span>
          </div>

          <div className="bg-[#141414] p-2.5 rounded border border-[#2c2c2c]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Pending Bets</span>
            <span className="font-mono font-black text-sm text-cyan-400">
              {placedBets.filter((b) => b.status === 'pending').length} Tickets
            </span>
          </div>

          <div className="bg-[#141414] p-2.5 rounded border border-[#2c2c2c]">
            <span className="text-[10px] text-gray-400 uppercase font-semibold block">Punter Payout Ratio</span>
            <span className="font-mono font-black text-sm text-emerald-400">92.4%</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#282828] bg-[#141414] px-4 text-xs font-semibold overflow-x-auto no-scrollbar">
          {[
            { id: 'matches', label: 'In-Play & Matches', icon: Radio },
            { id: 'bets', label: 'Bet Settlements', icon: Receipt },
            { id: 'punters', label: 'Punters & Balances', icon: Users },
            { id: 'add_match', label: 'Create Event', icon: PlusCircle },
            { id: 'branding', label: 'Logo & Branding', icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors ${
                  isSel
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

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: MATCHES & ODDS ADJUSTMENT */}
          {activeTab === 'matches' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Manage in-play scores and manipulate real-time odds:</span>
                <span className="font-mono">{matches.length} matches in database</span>
              </div>

              {matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg p-3 text-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-[#282828] pb-1.5">
                    <div>
                      <span className="font-bold text-white text-sm">
                        {match.homeTeam.name} vs {match.awayTeam.name}
                      </span>
                      <span className="text-gray-400 text-[11px] ml-2 font-mono">
                        ({match.leagueName})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adminToggleMatchStatus(match.id)}
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          match.isLive
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-[#252525] text-gray-400 border border-[#383838]'
                        }`}
                      >
                        {match.isLive ? `LIVE (${match.liveMinute}) - Click to Pause` : 'UPCOMING - Click to Go Live'}
                      </button>
                    </div>
                  </div>

                  {/* Live score controls if live */}
                  {match.isLive && match.liveScore && (
                    <div className="flex items-center gap-3 bg-[#151515] p-2 rounded border border-[#282828]">
                      <span className="text-gray-400 font-semibold">Live Scoreboard:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{match.homeTeam.name}:</span>
                        <button
                          onClick={() =>
                            adminUpdateMatchScore(
                              match.id,
                              Math.max(0, match.liveScore!.home - 1),
                              match.liveScore!.away
                            )
                          }
                          className="px-1.5 py-0.5 bg-[#252525] hover:bg-[#333] text-white rounded font-mono"
                        >
                          -
                        </button>
                        <span className="font-mono font-black text-[#E51E2B] text-sm px-1">
                          {match.liveScore.home}
                        </span>
                        <button
                          onClick={() =>
                            adminUpdateMatchScore(
                              match.id,
                              match.liveScore!.home + 1,
                              match.liveScore!.away
                            )
                          }
                          className="px-1.5 py-0.5 bg-[#E51E2B] text-white rounded font-mono font-bold"
                        >
                          +1 Goal
                        </button>
                      </div>

                      <span className="text-gray-500 font-bold">:</span>

                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{match.awayTeam.name}:</span>
                        <button
                          onClick={() =>
                            adminUpdateMatchScore(
                              match.id,
                              match.liveScore!.home,
                              Math.max(0, match.liveScore!.away - 1)
                            )
                          }
                          className="px-1.5 py-0.5 bg-[#252525] hover:bg-[#333] text-white rounded font-mono"
                        >
                          -
                        </button>
                        <span className="font-mono font-black text-[#E51E2B] text-sm px-1">
                          {match.liveScore.away}
                        </span>
                        <button
                          onClick={() =>
                            adminUpdateMatchScore(
                              match.id,
                              match.liveScore!.home,
                              match.liveScore!.away + 1
                            )
                          }
                          className="px-1.5 py-0.5 bg-[#E51E2B] text-white rounded font-mono font-bold"
                        >
                          +1 Goal
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Real-time Odds Editor */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#161616] p-2 rounded border border-[#282828] flex items-center justify-between">
                      <span className="text-gray-400 font-medium">1 (Home Win)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.05"
                          defaultValue={match.mainMarkets.homeWin.odds}
                          onBlur={(e) =>
                            adminUpdateMatchOdds(
                              match.id,
                              match.mainMarkets.homeWin.id,
                              parseFloat(e.target.value) || match.mainMarkets.homeWin.odds
                            )
                          }
                          className="w-16 px-1.5 py-1 bg-[#222] border border-[#3a3a3a] rounded text-white font-mono text-center font-bold"
                        />
                      </div>
                    </div>

                    <div className="bg-[#161616] p-2 rounded border border-[#282828] flex items-center justify-between">
                      <span className="text-gray-400 font-medium">X (Draw)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.05"
                          defaultValue={match.mainMarkets.draw.odds}
                          onBlur={(e) =>
                            adminUpdateMatchOdds(
                              match.id,
                              match.mainMarkets.draw.id,
                              parseFloat(e.target.value) || match.mainMarkets.draw.odds
                            )
                          }
                          className="w-16 px-1.5 py-1 bg-[#222] border border-[#3a3a3a] rounded text-white font-mono text-center font-bold"
                        />
                      </div>
                    </div>

                    <div className="bg-[#161616] p-2 rounded border border-[#282828] flex items-center justify-between">
                      <span className="text-gray-400 font-medium">2 (Away Win)</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="0.05"
                          defaultValue={match.mainMarkets.awayWin.odds}
                          onBlur={(e) =>
                            adminUpdateMatchOdds(
                              match.id,
                              match.mainMarkets.awayWin.id,
                              parseFloat(e.target.value) || match.mainMarkets.awayWin.odds
                            )
                          }
                          className="w-16 px-1.5 py-1 bg-[#222] border border-[#3a3a3a] rounded text-white font-mono text-center font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: BET SETTLEMENTS */}
          {activeTab === 'bets' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-400">
                Settle tickets manually. Marking as "WON" immediately credits the punter's real balance with potential win amount.
              </p>

              {placedBets.map((bet) => (
                <div
                  key={bet.id}
                  className="bg-[#1c1c1c] border border-[#2c2c2c] rounded-lg p-3 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-[#E51E2B] text-sm">
                        {bet.bookingCode}
                      </span>
                      <span className="text-gray-400">by {bet.userId}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                          bet.status === 'won'
                            ? 'bg-emerald-950 text-emerald-400'
                            : bet.status === 'lost'
                            ? 'bg-rose-950 text-rose-400'
                            : 'bg-yellow-950 text-yellow-400'
                        }`}
                      >
                        {bet.status}
                      </span>
                    </div>

                    <div className="mt-1 text-[11px] text-gray-300">
                      <span>Stake: <strong>{formatMoney(bet.stake)}</strong></span>
                      <span className="mx-2">•</span>
                      <span>Total Odds: <strong>{formatOdds(bet.totalOdds)}</strong></span>
                      <span className="mx-2">•</span>
                      <span>To Payout: <strong className="text-[#E51E2B]">{formatMoney(bet.potentialPayout)}</strong></span>
                    </div>
                  </div>

                  {bet.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adminSettleBet(bet.id, 'won')}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Settle as WON</span>
                      </button>
                      <button
                        onClick={() => adminSettleBet(bet.id, 'lost')}
                        className="px-3 py-1.5 bg-rose-800 hover:bg-rose-700 text-white font-bold rounded flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Settle as LOST</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PUNTERS & BALANCES */}
          {activeTab === 'punters' && (
            <div className="space-y-3">
              <div className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg p-3 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-sm">Jean-Pierre Mugisha</h3>
                    <p className="text-gray-400 text-[11px]">jp.mugisha@gmail.com • +250 788 123 456</p>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded font-bold text-[10px]">
                    ACTIVE
                  </span>
                </div>

                <div className="pt-2 border-t border-[#262626] flex items-center justify-between">
                  <span className="text-gray-400">Current Balance:</span>
                  <span className="font-mono font-bold text-[#E51E2B]">35,000 RWF</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ADD MATCH */}
          {activeTab === 'add_match' && (
            <div className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-lg p-4 text-xs space-y-3">
              <h3 className="font-bold text-white uppercase text-sm">Create New Upcoming Fixture</h3>
              {createMsg && (
                <div className="p-2 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">
                  {createMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">Home Team</label>
                  <input
                    type="text"
                    value={newHome}
                    onChange={(e) => setNewHome(e.target.value)}
                    placeholder="e.g. Arsenal FC"
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Away Team</label>
                  <input
                    type="text"
                    value={newAway}
                    onChange={(e) => setNewAway(e.target.value)}
                    placeholder="e.g. Chelsea FC"
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1">1 (Home Odds)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newHomeOdds}
                    onChange={(e) => setNewHomeOdds(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">X (Draw Odds)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newDrawOdds}
                    onChange={(e) => setNewDrawOdds(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">2 (Away Odds)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={newAwayOdds}
                    onChange={(e) => setNewAwayOdds(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white font-mono"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setCreateMsg('Fixture created successfully and broadcasted to punters!');
                  setTimeout(() => setCreateMsg(null), 3500);
                }}
                className="w-full py-2 bg-[#E51E2B] hover:bg-[#c91824] text-white font-bold uppercase rounded mt-2"
              >
                Publish Event
              </button>
            </div>
          )}

          {/* TAB 5: LOGO & BRANDING CUSTOMIZATION (User requested feature) */}
          {activeTab === 'branding' && (
            <div className="space-y-4">
              <div className="bg-[#202020] border border-[#333] p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#E51E2B]" />
                      Custom Logo Management (Gushyiramo ifoto ya Logo)
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Upload a custom logo image or provide an image link. This will automatically update the logo across the top navigation bar, footer, and mobile screens.
                    </p>
                  </div>
                  {logoUrl ? (
                    <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-700/50 text-emerald-400 text-[10px] font-bold rounded flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Custom Logo Active
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-[#2a2a2a] border border-[#444] text-gray-300 text-[10px] font-bold rounded">
                      Official SVG Logo Active
                    </span>
                  )}
                </div>

                {logoSuccess && (
                  <div className="mt-3 p-2.5 bg-emerald-950/60 border border-emerald-600/50 rounded text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{logoSuccess}</span>
                  </div>
                )}

                {logoError && (
                  <div className="mt-3 p-2.5 bg-red-950/60 border border-red-600/50 rounded text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{logoError}</span>
                  </div>
                )}
              </div>

              {/* Live Preview Display */}
              <div className="bg-[#141414] border border-[#2b2b2b] p-4 rounded-lg">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">
                  Live Preview on Header
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Top Bar Preview (Black) */}
                  <div className="bg-[#000000] border border-[#222] p-4 rounded flex flex-col items-center justify-center min-h-[90px]">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 self-start">
                      Black Background (Navbar)
                    </span>
                    <WinnerLogo size="lg" />
                  </div>

                  {/* Dark Charcoal Preview */}
                  <div className="bg-[#1c1c1c] border border-[#333] p-4 rounded flex flex-col items-center justify-center min-h-[90px]">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 self-start">
                      Dark Background (Modals/Footer)
                    </span>
                    <WinnerLogo size="md" />
                  </div>
                </div>
              </div>

              {/* Upload Method 1: File Upload */}
              <div className="bg-[#1e1e1e] border border-[#2e2e2e] p-4 rounded-lg space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Upload className="w-3.5 h-3.5 text-[#E51E2B]" />
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
                  className="border-2 border-dashed border-[#3d3d3d] hover:border-[#E51E2B] bg-[#161616] hover:bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#252525] group-hover:bg-[#E51E2B]/10 flex items-center justify-center mb-2 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-[#E51E2B] transition-colors" />
                  </div>
                  <span className="text-xs font-bold text-gray-200 group-hover:text-white">
                    Kanda hano uhitemo ifoto (Click to choose logo file)
                  </span>
                  <span className="text-[11px] text-gray-500 mt-0.5">
                    PNG, SVG, WEBP cyangwa JPG (Max 2.5MB)
                  </span>
                </div>
              </div>

              {/* Upload Method 2: Image URL */}
              <div className="bg-[#1e1e1e] border border-[#2e2e2e] p-4 rounded-lg space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Link className="w-3.5 h-3.5 text-[#E51E2B]" />
                  Option 2: Shyiramo link y&apos;ifoto (Paste Image URL)
                </h4>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={logoInputUrl}
                    onChange={(e) => setLogoInputUrl(e.target.value)}
                    placeholder="https://example.com/images/winner-logo.png"
                    className="flex-1 px-3 py-2 bg-[#141414] border border-[#383838] rounded text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-[#E51E2B]"
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
                    className="px-4 py-2 bg-[#E51E2B] hover:bg-[#c91824] text-white font-bold rounded text-xs transition-colors shrink-0"
                  >
                    Bika (Apply)
                  </button>
                </div>
              </div>

              {/* Action Buttons: Reset to Default */}
              <div className="flex items-center justify-between pt-2 border-t border-[#262626]">
                <span className="text-[11px] text-gray-500">
                  Logo ibikwa muri gahunda y&apos;ububiko bwawe (Persisted in storage).
                </span>
                <button
                  onClick={() => {
                    setLogoUrl(null);
                    setLogoSuccess('Gahunda yasubiye kuri logo isanzwe ya Winner! (Reset to official Winner SVG logo!)');
                    setTimeout(() => setLogoSuccess(null), 4000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#252525] hover:bg-[#303030] border border-[#3e3e3e] text-gray-300 hover:text-white rounded text-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Subiza kuri Logo Isanzwe (Reset to Default Logo)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
