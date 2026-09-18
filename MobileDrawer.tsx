import React from 'react';
import { X, Trophy, Radio, Coins, Plane, Gift, Shield, HelpCircle, Settings, LogOut, User } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { INITIAL_SPORTS } from '../data/mockData';
import { WinnerLogo } from './WinnerLogo';

export const MobileDrawer: React.FC = () => {
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    selectedSport,
    setSelectedSport,
    setSelectedLeague,
    setActiveEventTab,
    setAdminModalOpen,
    setUserAccountOpen,
    setUserAccountTab,
    isLoggedIn,
    user,
    logout,
    setAuthModalOpen,
    setAuthModalMode,
  } = useSportsbook();

  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-xs">
      <div className="w-4/5 max-w-xs bg-[#161616] h-full flex flex-col border-r border-[#333] shadow-2xl animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="p-3.5 bg-[#141414] border-b border-[#282828] flex items-center justify-between">
          <WinnerLogo size="sm" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="p-3 bg-[#1e1e1e] border-b border-[#282828]">
          {isLoggedIn && user ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white truncate">{user.fullName}</p>
                <p className="text-[11px] font-mono text-[#E51E2B]">
                  {user.balance.toLocaleString()} {user.currency}
                </p>
              </div>
              <button
                onClick={() => {
                  setUserAccountTab('deposit');
                  setUserAccountOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 bg-[#E51E2B] text-white font-black text-xs rounded"
              >
                Deposit
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-1.5 bg-[#252525] text-white border border-[#444] rounded text-xs font-bold"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-1.5 bg-[#E51E2B] text-white rounded text-xs font-black"
              >
                Join
              </button>
            </div>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
          <div className="px-2 py-1 text-[10px] text-gray-400 font-bold uppercase">Quick Navigation</div>

          <button
            onClick={() => {
              setActiveEventTab('top');
              setSelectedLeague(null);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-gray-200 hover:bg-[#222] rounded flex items-center gap-2 font-semibold"
          >
            <Trophy className="w-4 h-4 text-[#E51E2B]" />
            <span>Top Sports Events</span>
          </button>

          <button
            onClick={() => {
              setActiveEventTab('live');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#222] rounded flex items-center gap-2 font-semibold"
          >
            <Radio className="w-4 h-4 text-red-500" />
            <span>Live In-Play (Broadcasting)</span>
          </button>

          <button
            onClick={() => {
              alert('Casino & Slots: Over 1,000 top games available!');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-gray-200 hover:bg-[#222] rounded flex items-center gap-2 font-semibold"
          >
            <Coins className="w-4 h-4 text-orange-400" />
            <span>Casino & Slots</span>
          </button>

          <button
            onClick={() => {
              alert('Aviator crash game loaded!');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#222] rounded flex items-center gap-2 font-bold"
          >
            <Plane className="w-4 h-4 text-red-500" />
            <span>Aviator Cashout</span>
          </button>

          <div className="pt-2 px-2 text-[10px] text-gray-400 font-bold uppercase">All Sports</div>
          {INITIAL_SPORTS.map((sport) => (
            <button
              key={sport.id}
              onClick={() => {
                setSelectedSport(sport.id);
                setSelectedLeague(null);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 rounded flex items-center justify-between text-xs ${
                selectedSport === sport.id
                  ? 'bg-[#E51E2B] text-white font-bold'
                  : 'text-gray-300 hover:bg-[#222]'
              }`}
            >
              <span className="capitalize">{sport.name}</span>
              <span className="text-[10px] font-mono opacity-70">
                ({sport.eventCount.toLocaleString()})
              </span>
            </button>
          ))}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 bg-[#121212] border-t border-[#282828] text-xs space-y-2">
          <button
            onClick={() => {
              setAdminModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="w-full py-1.5 bg-[#252525] text-[#E51E2B] border border-[#3a3a3a] rounded font-bold flex items-center justify-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin Operator Console</span>
          </button>

          {isLoggedIn && (
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full py-1.5 text-red-400 hover:bg-[#222] rounded flex items-center justify-center gap-1.5 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
    </div>
  );
};
