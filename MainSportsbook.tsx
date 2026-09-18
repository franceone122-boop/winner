import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Radio,
  Clock,
  Flame,
  Zap,
  TrendingUp,
  SlidersHorizontal,
  ChevronDown,
  BarChart2,
  Trophy,
  ArrowUp,
  ArrowDown,
  Info,
  Calendar,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { PROMO_BANNERS, POPULAR_LEAGUES, INITIAL_SPORTS } from '../data/mockData';
import { EventTab, MatchEvent, OddsValue, SportId } from '../types';

export const MainSportsbook: React.FC = () => {
  const {
    filteredMatches,
    matches,
    activeEventTab,
    setActiveEventTab,
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    selectedMarketFilter,
    setSelectedMarketFilter,
    timeFilter,
    setTimeFilter,
    selectedOddsIds,
    toggleSelection,
    formatOdds,
    oddsTrends,
    setActiveDetailMatch,
    setUserAccountOpen,
    setUserAccountTab,
  } = useSportsbook();

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % PROMO_BANNERS.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
  };

  const activeBanner = PROMO_BANNERS[currentBannerIndex];

  // Horizontal featured cards (top 6 matches)
  const featuredCards = matches.filter((m) => m.featured || m.isLive).slice(0, 6);

  // Render an interactive odds button
  const renderOddsButton = (
    match: MatchEvent,
    oddsObj: OddsValue,
    labelFallback?: string
  ) => {
    const isSelected = selectedOddsIds.has(oddsObj.id);
    const trend = oddsTrends[oddsObj.id];

    return (
      <button
        key={oddsObj.id}
        onClick={(e) => {
          e.stopPropagation();
          toggleSelection(
            match,
            `${labelFallback || oddsObj.label}`,
            oddsObj.odds,
            oddsObj.marketName,
            oddsObj.id
          );
        }}
        className={`relative flex items-center justify-between px-2.5 py-1.5 rounded transition-all duration-150 font-mono text-xs border ${
          isSelected
            ? 'bg-[#FFE500] text-black font-black border-[#FFE500] shadow-md'
            : trend === 'up'
            ? 'bg-[#102919] text-emerald-300 border-emerald-500/60 font-bold'
            : trend === 'down'
            ? 'bg-[#2b1414] text-rose-300 border-rose-500/60 font-bold'
            : 'bg-[#262626] hover:bg-[#303030] text-gray-100 hover:text-white border-[#383838]'
        }`}
      >
        <span className={`text-[11px] font-bold ${isSelected ? 'text-black' : 'text-gray-400'}`}>
          {labelFallback || oddsObj.label}
        </span>
        <div className="flex items-center gap-0.5">
          <span className="text-[12px] tracking-tight">{formatOdds(oddsObj.odds)}</span>
          {trend === 'up' && <ArrowUp className="w-2.5 h-2.5 text-emerald-400 animate-bounce" />}
          {trend === 'down' && <ArrowDown className="w-2.5 h-2.5 text-rose-400 animate-bounce" />}
        </div>
      </button>
    );
  };

  return (
    <main className="flex-1 bg-[#121212] overflow-y-auto min-w-0 pb-12">
      {/* 3. A. LARGE PROMOTIONAL BANNER (Original artwork & layout inspired by reference) */}
      <div className="p-2 sm:p-3">
        <div
          className={`relative rounded-xl overflow-hidden border border-[#2e2e2e] bg-gradient-to-r ${activeBanner.bgGradient} min-h-[170px] sm:min-h-[200px] flex items-center p-4 sm:p-6 shadow-2xl transition-all`}
        >
          {/* Background decorative sport/betting graphics */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none flex items-center justify-end pr-8">
            <div className="relative w-48 h-48 rounded-full border border-yellow-500/20 flex items-center justify-center">
              <Zap className="w-32 h-32 text-yellow-500/20" />
            </div>
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                {activeBanner.title}
              </span>
              <span className="bg-[#FFE500] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shadow">
                {activeBanner.badge}
              </span>
            </div>

            {/* Big bold punchy headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-md">
              <span className="text-white">GET A </span>
              <span className="text-[#FFE500]">2,000 RWF </span>
              <span className="text-white">FREEBET</span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm mt-2 max-w-md font-medium">
              {activeBanner.subtitle}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  setUserAccountTab('deposit');
                  setUserAccountOpen(true);
                }}
                className="bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-2 rounded shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                {activeBanner.ctaText}
              </button>
              <span className="text-[11px] text-gray-400 hidden sm:inline">
                T&Cs Apply • 18+ • Instant Mobile Money Payouts
              </span>
            </div>
          </div>

          {/* Banner Controls */}
          <button
            onClick={prevBanner}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-[#444] transition-colors"
            aria-label="Previous promo"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-[#444] transition-colors"
            aria-label="Next promo"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {PROMO_BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBannerIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentBannerIndex ? 'w-5 bg-[#FFE500]' : 'w-1.5 bg-gray-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. B. POPULAR LEAGUES HORIZONTAL CAROUSEL */}
      <div className="px-2 sm:px-3 mb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedLeague(null)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
              selectedLeague === null
                ? 'bg-[#FFE500] text-black border-[#FFE500]'
                : 'bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black border-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-black" />
            <span>All Leagues</span>
          </button>

          {POPULAR_LEAGUES.map((league) => {
            const isSelected = selectedLeague === league.id;
            return (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(isSelected ? null : league.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-[#FFE500] text-black font-extrabold border-[#FFE500]'
                    : 'bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black border-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-black' : 'bg-gray-800'}`} />
                <span className="whitespace-nowrap">{league.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/20 text-black font-bold' : 'bg-gray-200 text-black'
                  }`}
                >
                  {league.eventCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. C. FEATURED MATCH CARDS HORIZONTAL STRIP */}
      <div className="px-2 sm:px-3 mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
            <Flame className="w-4 h-4 text-white" />
            <span>Featured Highlights</span>
          </div>
          <span className="text-[11px] text-gray-400">Scroll for more ➔</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {featuredCards.map((match) => (
            <div
              key={match.id}
              className="w-[230px] shrink-0 bg-[#1c1c1c] border border-[#2e2e2e] hover:border-[#444] rounded-lg p-2.5 flex flex-col justify-between transition-colors cursor-pointer"
              onClick={() => setActiveDetailMatch(match)}
            >
              {/* Card Header: League & Time */}
              <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2 border-b border-[#292929] pb-1">
                <span className="truncate pr-2 font-medium">{match.leagueName.split('-')[1] || match.leagueName}</span>
                <span className="shrink-0 font-mono text-white">
                  {match.isLive ? (
                    <span className="text-[#FFE500] flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 bg-[#FFE500] rounded-full animate-pulse" />
                      {match.liveMinute || 'LIVE'}
                    </span>
                  ) : (
                    match.startTime
                  )}
                </span>
              </div>

              {/* Teams & Logos */}
              <div className="space-y-1.5 mb-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <img
                      src={match.homeTeam.logo}
                      alt={match.homeTeam.name}
                      referrerPolicy="no-referrer"
                      className="w-4 h-4 rounded-full object-cover shrink-0 bg-[#333]"
                    />
                    <span className="text-xs font-bold text-white truncate hover:text-[#FFE500]">
                      {match.homeTeam.name}
                    </span>
                  </div>
                  {match.isLive && match.liveScore && (
                    <span className="font-mono font-black text-sm text-[#FFE500]">
                      {match.liveScore.home}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <img
                      src={match.awayTeam.logo}
                      alt={match.awayTeam.name}
                      referrerPolicy="no-referrer"
                      className="w-4 h-4 rounded-full object-cover shrink-0 bg-[#333]"
                    />
                    <span className="text-xs font-bold text-white truncate hover:text-[#FFE500]">
                      {match.awayTeam.name}
                    </span>
                  </div>
                  {match.isLive && match.liveScore && (
                    <span className="font-mono font-black text-sm text-[#FFE500]">
                      {match.liveScore.away}
                    </span>
                  )}
                </div>
              </div>

              {/* 1 X 2 Odds Strip */}
              <div className="grid grid-cols-3 gap-1">
                {renderOddsButton(match, match.mainMarkets.homeWin, '1')}
                {renderOddsButton(match, match.mainMarkets.draw, 'X')}
                {renderOddsButton(match, match.mainMarkets.awayWin, '2')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EVENT SECTION TABS (Live, Top Events, Upcoming) - White buttons, on-click yellow */}
      <div className="px-2 sm:px-3 mb-2">
        <div className="grid grid-cols-3 gap-1.5 bg-[#141414] p-1.5 rounded-lg border border-[#2e2e2e] text-center font-bold text-xs uppercase tracking-wider">
          <button
            onClick={() => setActiveEventTab('live')}
            className={`py-2 rounded flex items-center justify-center gap-1.5 transition-all ${
              activeEventTab === 'live'
                ? 'bg-[#FFE500] text-black shadow font-black'
                : 'bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black font-bold'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-black" />
            <span>Live</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                activeEventTab === 'live' ? 'bg-black/20 text-black' : 'bg-gray-200 text-black'
              }`}
            >
              {matches.filter((m) => m.isLive).length}
            </span>
          </button>

          <button
            onClick={() => setActiveEventTab('top')}
            className={`py-2 rounded flex items-center justify-center gap-1.5 transition-all ${
              activeEventTab === 'top'
                ? 'bg-[#FFE500] text-black shadow font-black'
                : 'bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black font-bold'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-black" />
            <span>Top Events</span>
          </button>

          <button
            onClick={() => setActiveEventTab('upcoming')}
            className={`py-2 rounded flex items-center justify-center gap-1.5 transition-all ${
              activeEventTab === 'upcoming'
                ? 'bg-[#FFE500] text-black shadow font-black'
                : 'bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black font-bold'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-black" />
            <span>Upcoming</span>
          </button>
        </div>
      </div>

      {/* 4. SPORTS FILTER ICONS ROW - White buttons, on-click yellow */}
      <div className="px-2 sm:px-3 mb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {INITIAL_SPORTS.slice(0, 14).map((sport) => {
            const isSelected = selectedSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => {
                  setSelectedSport(sport.id);
                  setSelectedLeague(null);
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-[#FFE500] text-black font-extrabold border-[#FFE500]'
                    : 'bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black border-white'
                }`}
              >
                <span>{sport.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. BETTING FILTERS BAR */}
      <div className="px-2 sm:px-3 mb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1a1a1a] p-2 rounded-lg border border-[#2e2e2e] text-xs text-gray-300">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sort by time button */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-[#242424] border border-[#383838] rounded text-white">
              <Clock className="w-3.5 h-3.5 text-white" />
              <span className="font-semibold">By Time</span>
            </div>

            {/* Time filter dropdown */}
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-[#242424] border border-[#383838] rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#FFE500] font-medium"
            >
              <option value="today">Today</option>
              <option value="3hours">Next 3 Hours</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="weekend">This Weekend</option>
              <option value="all">All Available</option>
            </select>

            {/* Main Market selector */}
            <select
              value={selectedMarketFilter}
              onChange={(e) => setSelectedMarketFilter(e.target.value as any)}
              className="bg-[#242424] border border-[#383838] rounded px-2.5 py-1 text-white font-bold focus:outline-none focus:border-[#FFE500]"
            >
              <option value="1x2">1X2 (Match Result)</option>
              <option value="ft_1x2_2up">FT 1X2 - 2UP (Early Payout)</option>
              <option value="double_chance">Double Chance (1X / 12 / X2)</option>
              <option value="over_under">Total Goals (Over/Under)</option>
              <option value="btts">Both Teams To Score (GG/NG)</option>
            </select>
          </div>

          <div className="text-[11px] text-gray-300 flex items-center gap-1 font-mono">
            <span>Showing:</span>
            <strong className="text-[#FFE500] font-bold">{filteredMatches.length} Matches</strong>
          </div>
        </div>
      </div>

      {/* 5. MATCH CARDS LIST (Dense, Terminal-Style Rows with 1/X/2 & Market Counts) */}
      <div className="px-2 sm:px-3 space-y-2">
        {filteredMatches.length === 0 ? (
          <div className="bg-[#181818] border border-[#2a2a2a] rounded-lg p-8 text-center">
            <Info className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white font-bold text-sm">Please note we couldn't find any results for your filters.</p>
            <p className="text-gray-400 text-xs mt-1">
              Try switching tabs (Top Events / Live), clearing search, or selecting another sport.
            </p>
            <button
              onClick={() => {
                setActiveEventTab('top');
                setSelectedSport('football');
                setSelectedLeague(null);
              }}
              className="mt-4 px-4 py-1.5 bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black font-bold text-xs rounded transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-[#1a1a1a] hover:bg-[#1e1e1e] border border-[#282828] hover:border-[#3a3a3a] rounded-lg p-2.5 transition-all"
            >
              {/* Top Row: League, Country, Time, Status */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 mb-2 border-b border-[#252525] pb-1.5">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-semibold text-gray-300 truncate">
                    {match.leagueName}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{match.country}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {match.isLive ? (
                    <span className="flex items-center gap-1.5 bg-black text-[#FFE500] border border-[#FFE500]/50 px-2 py-0.5 rounded font-mono font-bold text-[10px]">
                      <span className="w-2 h-2 bg-[#FFE500] rounded-full animate-ping" />
                      LIVE {match.liveMinute}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400 font-mono text-[11px]">
                      <Calendar className="w-3 h-3 text-white" />
                      {match.startTime}
                    </span>
                  )}
                  <button
                    onClick={() => setActiveDetailMatch(match)}
                    className="p-1 hover:bg-[#292929] rounded text-gray-400 hover:text-white"
                    title="View match statistics & head-to-head"
                  >
                    <BarChart2 className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Middle Row: Teams, Scores and Betting Markets */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
                {/* Team Names & Live Scores (5 cols on lg) */}
                <div
                  className="lg:col-span-5 cursor-pointer"
                  onClick={() => setActiveDetailMatch(match)}
                >
                  <div className="space-y-1.5">
                    {/* Home Team */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img
                          src={match.homeTeam.logo}
                          alt={match.homeTeam.name}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover shrink-0 bg-[#333]"
                        />
                        <span className="font-bold text-sm text-white truncate hover:text-[#FFE500]">
                          {match.homeTeam.name}
                        </span>
                      </div>
                      {match.isLive && match.liveScore && (
                        <span className="font-mono font-black text-base text-[#FFE500] px-1.5">
                          {match.liveScore.home}
                        </span>
                      )}
                    </div>

                    {/* Away Team */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img
                          src={match.awayTeam.logo}
                          alt={match.awayTeam.name}
                          referrerPolicy="no-referrer"
                          className="w-5 h-5 rounded-full object-cover shrink-0 bg-[#333]"
                        />
                        <span className="font-bold text-sm text-white truncate hover:text-[#FFE500]">
                          {match.awayTeam.name}
                        </span>
                      </div>
                      {match.isLive && match.liveScore && (
                        <span className="font-mono font-black text-base text-[#FFE500] px-1.5">
                          {match.liveScore.away}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Odds Buttons based on selectedMarketFilter (6 cols on lg) */}
                <div className="lg:col-span-6">
                  {selectedMarketFilter === 'double_chance' && match.mainMarkets.doubleChance1X ? (
                    <div className="grid grid-cols-3 gap-1.5">
                      {renderOddsButton(match, match.mainMarkets.doubleChance1X, '1X')}
                      {renderOddsButton(match, match.mainMarkets.doubleChance12!, '12')}
                      {renderOddsButton(match, match.mainMarkets.doubleChanceX2!, 'X2')}
                    </div>
                  ) : selectedMarketFilter === 'over_under' && match.mainMarkets.over25 ? (
                    <div className="grid grid-cols-2 gap-1.5">
                      {renderOddsButton(match, match.mainMarkets.over25, 'Over 2.5')}
                      {renderOddsButton(match, match.mainMarkets.under25!, 'Under 2.5')}
                    </div>
                  ) : selectedMarketFilter === 'btts' && match.mainMarkets.bttsYes ? (
                    <div className="grid grid-cols-2 gap-1.5">
                      {renderOddsButton(match, match.mainMarkets.bttsYes, 'GG (Yes)')}
                      {renderOddsButton(match, match.mainMarkets.bttsNo!, 'NG (No)')}
                    </div>
                  ) : (
                    /* Default: 1 X 2 or FT 1X2 - 2UP */
                    <div className="grid grid-cols-3 gap-1.5">
                      {renderOddsButton(match, match.mainMarkets.homeWin, '1')}
                      {renderOddsButton(match, match.mainMarkets.draw, 'X')}
                      {renderOddsButton(match, match.mainMarkets.awayWin, '2')}
                    </div>
                  )}
                </div>

                {/* Additional Markets Button (1 col on lg) */}
                <div className="lg:col-span-1 flex justify-end">
                  <button
                    onClick={() => setActiveDetailMatch(match)}
                    className="w-full lg:w-auto px-2.5 py-1.5 bg-[#252525] hover:bg-[#333] text-white border border-[#383838] rounded text-[11px] font-mono font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>+{match.marketsCount}</span>
                    <ChevronRight className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};
