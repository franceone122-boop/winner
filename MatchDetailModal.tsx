import React, { useState } from 'react';
import { X, Calendar, Radio, BarChart2, Shield, Trophy, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { MatchEvent, OddsValue } from '../types';

export const MatchDetailModal: React.FC = () => {
  const {
    activeDetailMatch,
    setActiveDetailMatch,
    selectedOddsIds,
    toggleSelection,
    formatOdds,
    oddsTrends,
  } = useSportsbook();

  const [activeMarketTab, setActiveMarketTab] = useState<'main' | 'goals' | 'halves' | 'correct_score'>('main');

  if (!activeDetailMatch) return null;

  const match = activeDetailMatch;

  const renderDetailOddsBtn = (oddsObj: OddsValue, label: string) => {
    const isSelected = selectedOddsIds.has(oddsObj.id);
    const trend = oddsTrends[oddsObj.id];

    return (
      <button
        key={oddsObj.id}
        onClick={() => toggleSelection(match, label, oddsObj.odds, oddsObj.marketName, oddsObj.id)}
        className={`flex items-center justify-between p-2 rounded text-xs transition-all border ${
          isSelected
            ? 'bg-[#E51E2B] text-white font-black border-[#E51E2B] shadow'
            : trend === 'up'
            ? 'bg-[#102919] text-emerald-300 border-emerald-600'
            : trend === 'down'
            ? 'bg-[#2b1414] text-rose-300 border-rose-600'
            : 'bg-[#222] hover:bg-[#2c2c2c] text-gray-200 border-[#383838]'
        }`}
      >
        <span className={isSelected ? 'text-white font-bold' : 'text-gray-400'}>{label}</span>
        <div className="flex items-center gap-1 font-mono font-bold">
          <span>{formatOdds(oddsObj.odds)}</span>
          {trend === 'up' && <ArrowUp className="w-2.5 h-2.5 text-emerald-400" />}
          {trend === 'down' && <ArrowDown className="w-2.5 h-2.5 text-rose-400" />}
        </div>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#181818] border border-[#333] rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="p-3 sm:p-4 bg-[#141414] border-b border-[#282828] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-400 truncate pr-2">
            <Trophy className="w-4 h-4 text-[#E51E2B] shrink-0" />
            <span className="font-semibold text-gray-300">{match.leagueName}</span>
            <span>•</span>
            <span>{match.country}</span>
          </div>

          <button
            onClick={() => setActiveDetailMatch(null)}
            className="p-1 rounded-full text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stadium & Match Header Scoreboard */}
        <div className="p-4 bg-gradient-to-b from-[#202020] to-[#171717] border-b border-[#282828]">
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="text-gray-400">
              {match.isLive ? (
                <span className="flex items-center gap-1.5 text-red-400 font-mono font-bold">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  LIVE IN-PLAY: {match.liveMinute}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-300 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#E51E2B]" />
                  Kickoff: {match.startTime}
                </span>
              )}
            </div>

            <span className="text-[11px] text-gray-400 font-mono">
              +{match.marketsCount} Available Markets
            </span>
          </div>

          {/* Teams match-up display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 w-5/12">
              <img
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover bg-[#333] shrink-0"
              />
              <span className="font-extrabold text-sm sm:text-base text-white truncate">
                {match.homeTeam.name}
              </span>
            </div>

            <div className="w-2/12 text-center">
              {match.isLive && match.liveScore ? (
                <div className="font-mono font-black text-2xl sm:text-3xl text-[#E51E2B]">
                  {match.liveScore.home} - {match.liveScore.away}
                </div>
              ) : (
                <div className="text-gray-500 font-black text-lg sm:text-xl font-mono">VS</div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 w-5/12 text-right">
              <span className="font-extrabold text-sm sm:text-base text-white truncate">
                {match.awayTeam.name}
              </span>
              <img
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover bg-[#333] shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Market Category Tabs */}
        <div className="flex border-b border-[#282828] bg-[#141414] px-3 text-xs font-semibold">
          {[
            { id: 'main', label: 'Main Markets' },
            { id: 'goals', label: 'Goals & Totals' },
            { id: 'halves', label: 'Half Betting' },
            { id: 'correct_score', label: 'Correct Score' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMarketTab(tab.id as any)}
              className={`py-2.5 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeMarketTab === tab.id
                  ? 'border-[#E51E2B] text-[#E51E2B] font-bold'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Market Odds Panels */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeMarketTab === 'main' && (
            <div className="space-y-4">
              {/* 1X2 Full Time */}
              <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#2d2d2d] space-y-2">
                <span className="text-xs font-bold text-gray-300 uppercase block">1X2 (Match Result)</span>
                <div className="grid grid-cols-3 gap-2">
                  {renderDetailOddsBtn(match.mainMarkets.homeWin, `1 (${match.homeTeam.name})`)}
                  {renderDetailOddsBtn(match.mainMarkets.draw, 'X (Draw)')}
                  {renderDetailOddsBtn(match.mainMarkets.awayWin, `2 (${match.awayTeam.name})`)}
                </div>
              </div>

              {/* FT 1X2 - 2UP (Early Payout) */}
              {match.mainMarkets.twoUpHome && (
                <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#2d2d2d] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E51E2B] uppercase flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>FT 1X2 - 2UP (Instant Payout if 2 Goals Ahead)</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {renderDetailOddsBtn(match.mainMarkets.twoUpHome, `1 (2UP)`)}
                    {renderDetailOddsBtn(match.mainMarkets.twoUpDraw!, `X (2UP)`)}
                    {renderDetailOddsBtn(match.mainMarkets.twoUpAway!, `2 (2UP)`)}
                  </div>
                </div>
              )}

              {/* Double Chance */}
              {match.mainMarkets.doubleChance1X && (
                <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#2d2d2d] space-y-2">
                  <span className="text-xs font-bold text-gray-300 uppercase block">Double Chance</span>
                  <div className="grid grid-cols-3 gap-2">
                    {renderDetailOddsBtn(match.mainMarkets.doubleChance1X, '1X (Home or Draw)')}
                    {renderDetailOddsBtn(match.mainMarkets.doubleChance12!, '12 (Home or Away)')}
                    {renderDetailOddsBtn(match.mainMarkets.doubleChanceX2!, 'X2 (Draw or Away)')}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMarketTab === 'goals' && (
            <div className="space-y-4">
              {/* Over / Under 2.5 */}
              {match.mainMarkets.over25 && (
                <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#2d2d2d] space-y-2">
                  <span className="text-xs font-bold text-gray-300 uppercase block">Total Goals Over/Under 2.5</span>
                  <div className="grid grid-cols-2 gap-2">
                    {renderDetailOddsBtn(match.mainMarkets.over25, 'Over 2.5 Goals')}
                    {renderDetailOddsBtn(match.mainMarkets.under25!, 'Under 2.5 Goals')}
                  </div>
                </div>
              )}

              {/* Both Teams to Score */}
              {match.mainMarkets.bttsYes && (
                <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#2d2d2d] space-y-2">
                  <span className="text-xs font-bold text-gray-300 uppercase block">Both Teams To Score (GG/NG)</span>
                  <div className="grid grid-cols-2 gap-2">
                    {renderDetailOddsBtn(match.mainMarkets.bttsYes, 'Yes (GG)')}
                    {renderDetailOddsBtn(match.mainMarkets.bttsNo!, 'No (NG)')}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeMarketTab === 'halves' && (
            <div className="space-y-4">
              <div className="bg-[#1c1c1c] p-3 rounded-lg border border-[#2d2d2d] space-y-2">
                <span className="text-xs font-bold text-gray-300 uppercase block">1st Half Result</span>
                <div className="grid grid-cols-3 gap-2">
                  {renderDetailOddsBtn(
                    { id: `${match.id}-1h-1`, label: '1', odds: 2.15, marketName: '1st Half' },
                    '1 (Home)'
                  )}
                  {renderDetailOddsBtn(
                    { id: `${match.id}-1h-x`, label: 'X', odds: 2.10, marketName: '1st Half' },
                    'X (Draw)'
                  )}
                  {renderDetailOddsBtn(
                    { id: `${match.id}-1h-2`, label: '2', odds: 3.80, marketName: '1st Half' },
                    '2 (Away)'
                  )}
                </div>
              </div>
            </div>
          )}

          {activeMarketTab === 'correct_score' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-300 uppercase block">Correct Score Grid</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { score: '1 - 0', odds: 5.50 },
                  { score: '2 - 0', odds: 6.50 },
                  { score: '2 - 1', odds: 8.00 },
                  { score: '0 - 0', odds: 8.50 },
                  { score: '1 - 1', odds: 6.00 },
                  { score: '2 - 2', odds: 12.00 },
                  { score: '0 - 1', odds: 9.00 },
                  { score: '0 - 2', odds: 14.00 },
                  { score: '1 - 2', odds: 11.00 },
                ].map((item, idx) =>
                  renderDetailOddsBtn(
                    {
                      id: `${match.id}-cs-${idx}`,
                      label: item.score,
                      odds: item.odds,
                      marketName: 'Correct Score',
                    },
                    item.score
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
