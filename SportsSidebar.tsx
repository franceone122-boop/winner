import React, { useState } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Flame,
  CircleDot,
  Activity,
  Gamepad2,
  ShieldAlert,
  Zap,
  Swords,
  Dna,
  Target,
  Compass,
  Trophy,
  Disc,
  Sparkles,
  Crosshair,
  Sliders,
  Radio,
  Shield,
  X,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { INITIAL_SPORTS, POPULAR_LEAGUES } from '../data/mockData';
import { SportId } from '../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Flame: <Flame className="w-4 h-4 text-[#E51E2B]" />,
  CircleDot: <CircleDot className="w-4 h-4 text-orange-400" />,
  Activity: <Activity className="w-4 h-4 text-lime-400" />,
  Gamepad2: <Gamepad2 className="w-4 h-4 text-purple-400" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-red-400" />,
  Zap: <Zap className="w-4 h-4 text-[#E51E2B]" />,
  Swords: <Swords className="w-4 h-4 text-amber-500" />,
  Dna: <Dna className="w-4 h-4 text-blue-400" />,
  Target: <Target className="w-4 h-4 text-emerald-400" />,
  Compass: <Compass className="w-4 h-4 text-teal-400" />,
  Trophy: <Trophy className="w-4 h-4 text-[#E51E2B]" />,
  Disc: <Disc className="w-4 h-4 text-cyan-400" />,
  Sparkles: <Sparkles className="w-4 h-4 text-pink-400" />,
  Crosshair: <Crosshair className="w-4 h-4 text-indigo-400" />,
  Sliders: <Sliders className="w-4 h-4 text-rose-400" />,
  Radio: <Radio className="w-4 h-4 text-amber-400" />,
  Shield: <Shield className="w-4 h-4 text-[#E51E2B]" />,
};

export const SportsSidebar: React.FC = () => {
  const {
    selectedSport,
    setSelectedSport,
    selectedLeague,
    setSelectedLeague,
    searchQuery,
    setSearchQuery,
    mobileMenuOpen,
    setMobileMenuOpen,
  } = useSportsbook();

  const [expandedSports, setExpandedSports] = useState<Record<string, boolean>>({
    football: true,
  });

  const toggleSportExpand = (sportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSports((prev) => ({
      ...prev,
      [sportId]: !prev[sportId],
    }));
  };

  const handleSelectSport = (sportId: SportId) => {
    setSelectedSport(sportId);
    setSelectedLeague(null);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleSelectLeague = (leagueId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLeague(selectedLeague === leagueId ? null : leagueId);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <aside className="w-full lg:w-[220px] shrink-0 bg-[#161616] border-r border-[#262626] flex flex-col h-full select-none">
      {/* Search Field */}
      <div className="p-2 border-b border-[#262626]">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams, events, leagues"
            className="w-full pl-8 pr-7 py-1.5 bg-[#222222] hover:bg-[#262626] focus:bg-[#282828] text-gray-200 text-xs rounded border border-[#333] focus:border-[#E51E2B] focus:outline-none transition-all placeholder:text-gray-500 placeholder:text-[11px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category List */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-1">
        <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-gray-400">
          Sports A-Z
        </div>

        {INITIAL_SPORTS.map((sport) => {
          const isSelected = selectedSport === sport.id;
          const isExpanded = !!expandedSports[sport.id];
          const sportLeagues = POPULAR_LEAGUES.filter((l) => l.sportId === sport.id);

          return (
            <div key={sport.id} className="mb-0.5">
              {/* Category Row */}
              <div
                onClick={() => handleSelectSport(sport.id)}
                className={`group flex items-center justify-between px-2.5 py-1.5 cursor-pointer text-xs transition-colors rounded mx-1 ${
                  isSelected && !selectedLeague
                    ? 'bg-[#261011] text-[#E51E2B] font-bold border-l-2 border-[#E51E2B]'
                    : 'text-gray-300 hover:bg-[#202020] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="shrink-0">{ICON_MAP[sport.iconName] || <Trophy className="w-4 h-4" />}</span>
                  <span className="font-semibold tracking-tight text-[11px] truncate uppercase">
                    {sport.name}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] text-gray-400 font-mono">
                    ({sport.eventCount.toLocaleString()})
                  </span>
                  <button
                    onClick={(e) => toggleSportExpand(sport.id, e)}
                    className="p-0.5 text-gray-400 hover:text-white rounded"
                    aria-label={`Toggle ${sport.name}`}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sub-Leagues list when expanded */}
              {isExpanded && sportLeagues.length > 0 && (
                <div className="ml-4 pl-2 border-l border-[#2e2e2e] py-0.5 space-y-0.5">
                  {sportLeagues.map((league) => {
                    const isLeagueSelected = selectedLeague === league.id;
                    return (
                      <div
                        key={league.id}
                        onClick={(e) => handleSelectLeague(league.id, e)}
                        className={`flex items-center justify-between px-2 py-1 text-[11px] cursor-pointer rounded transition-colors ${
                          isLeagueSelected
                            ? 'bg-[#E51E2B] text-white font-bold'
                            : 'text-gray-300 hover:bg-[#242424] hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-1">{league.name}</span>
                        <span
                          className={`text-[9px] font-mono shrink-0 px-1 py-0.2 rounded ${
                            isLeagueSelected ? 'bg-black/30 text-white' : 'text-gray-400 bg-[#222]'
                          }`}
                        >
                          {league.eventCount}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer Help / Quick Link */}
      <div className="p-2 border-t border-[#262626] bg-[#141414] text-[10px] text-gray-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-[#E51E2B]" />
          <span>Licensed 18+</span>
        </span>
        <span className="font-mono text-[9px] text-gray-400">RDB #998-RW</span>
      </div>
    </aside>
  );
};
