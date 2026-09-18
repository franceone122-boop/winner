import React, { useState, useRef, useEffect } from 'react';
import {
  Trophy,
  Radio,
  Zap,
  Gift,
  Plane,
  Coins,
  Receipt,
  HelpCircle,
  MoreHorizontal,
  Menu,
  Mail,
  Gamepad2,
  ChevronDown,
  User,
  Shield,
  LogOut,
  Wallet,
  Settings,
  CreditCard,
  ShoppingBag,
  Award,
  Sparkles,
  Flame,
  Layers,
  Search,
} from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { WinnerLogo } from './WinnerLogo';

export const Navbar: React.FC = () => {
  const {
    user,
    isLoggedIn,
    logout,
    switchDemoRole,
    setAuthModalOpen,
    setAuthModalMode,
    setUserAccountOpen,
    setUserAccountTab,
    setCurrentPage,
    setCheckBetslipModalOpen,
    setMobileMenuOpen,
    oddsFormat,
    setOddsFormat,
    language,
    setLanguage,
    formatMoney,
    activeEventTab,
    setActiveEventTab,
  } = useSportsbook();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [oddsDropdownOpen, setOddsDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close More dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    if (moreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#000000] border-b border-[#222222] text-white select-none">
      {/* ROW 1: TOP BAR (Logo, Messages, Language, Login/Join or Balance/Profile) */}
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 h-[46px] flex items-center justify-between gap-2 text-xs border-b border-[#1c1c1c]">
        {/* Left: Brand Logo & Messages */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1 rounded hover:bg-[#202020] text-gray-300"
            aria-label="Open sports menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* WiNNER Brand Logo */}
          <div
            onClick={() => {
              setActiveEventTab('top');
            }}
            className="flex items-center cursor-pointer select-none group pr-1 hover:opacity-95 transition-opacity"
            title="Winner.rw Home"
          >
            <WinnerLogo size="md" />
          </div>

          {/* Messages / Notification Mail Icon (Matching gg.PNG) */}
          <button
            onClick={() => {
              setUserAccountTab('overview');
              setUserAccountOpen(true);
            }}
            className="p-1.5 text-white hover:text-gray-300 hover:bg-[#1a1a1a] rounded transition-colors relative"
            title="Messages & Inbox"
          >
            <Mail className="w-4 h-4 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#E51E2B] rounded-full ring-2 ring-black" />
          </button>
        </div>

        {/* Right Section: Odds, Language & User / Auth Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Odds Format Selector (When logged in or desktop) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setOddsDropdownOpen(!oddsDropdownOpen)}
              className="flex items-center gap-1 px-2 py-1 bg-[#141414] hover:bg-[#222222] border border-[#2e2e2e] rounded text-gray-300 text-[11px]"
            >
              <span className="font-mono font-bold text-[#E51E2B]">
                {oddsFormat === 'decimal' ? '1.50' : oddsFormat === 'fractional' ? '1/2' : '+150'}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {oddsDropdownOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-[#1a1a1a] border border-[#333] rounded shadow-xl py-1 z-50">
                <button
                  onClick={() => {
                    setOddsFormat('decimal');
                    setOddsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#2a2a2a] flex justify-between items-center ${
                    oddsFormat === 'decimal' ? 'text-[#E51E2B] font-bold' : 'text-gray-300'
                  }`}
                >
                  <span>Decimal</span>
                  <span className="font-mono text-[10px]">1.50</span>
                </button>
                <button
                  onClick={() => {
                    setOddsFormat('fractional');
                    setOddsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#2a2a2a] flex justify-between items-center ${
                    oddsFormat === 'fractional' ? 'text-[#E51E2B] font-bold' : 'text-gray-300'
                  }`}
                >
                  <span>Fraction</span>
                  <span className="font-mono text-[10px]">1/2</span>
                </button>
                <button
                  onClick={() => {
                    setOddsFormat('american');
                    setOddsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-[#2a2a2a] flex justify-between items-center ${
                    oddsFormat === 'american' ? 'text-[#E51E2B] font-bold' : 'text-gray-300'
                  }`}
                >
                  <span>American</span>
                  <span className="font-mono text-[10px]">+150</span>
                </button>
              </div>
            )}
          </div>

          {/* Language Selector (Matching k.PNG: 🇬🇧 English ∨) */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2 py-1 bg-transparent hover:bg-[#1a1a1a] rounded text-white text-xs font-semibold transition-colors"
            >
              <span className="text-sm">
                {language === 'en' ? '🇬🇧' : language === 'rw' ? '🇷🇼' : '🇫🇷'}
              </span>
              <span className="font-semibold text-xs text-white">
                {language === 'en' ? 'English' : language === 'rw' ? 'Kinyarwanda' : 'Français'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white" />
            </button>
            {langDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-[#1a1a1a] border border-[#333] rounded shadow-xl py-1 z-50">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2a2a2a] flex items-center gap-2 text-white text-xs font-medium"
                >
                  <span>🇬🇧</span> English
                </button>
                <button
                  onClick={() => {
                    setLanguage('rw');
                    setLangDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2a2a2a] flex items-center gap-2 text-white text-xs font-medium"
                >
                  <span>🇷🇼</span> Kinyarwanda
                </button>
                <button
                  onClick={() => {
                    setLanguage('fr');
                    setLangDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2a2a2a] flex items-center gap-2 text-white text-xs font-medium"
                >
                  <span>🇫🇷</span> Français
                </button>
              </div>
            )}
          </div>

          {/* User Logged In vs Logged Out Controls (Matching k.PNG exactly) */}
          {isLoggedIn && user ? (
            <div className="relative">
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Yellow Deposit Button (Matching k.PNG: Deposit in yellow #FFE500 with black bold text) */}
                <button
                  onClick={() => {
                    setUserAccountTab('deposit');
                    setUserAccountOpen(true);
                  }}
                  className="bg-[#FFE500] hover:bg-[#ebd300] active:scale-95 text-black font-extrabold px-3.5 py-1.5 rounded text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Deposit</span>
                </button>

                {/* User Balance Display (Matching k.PNG with dynamic font size reduction when money amount grows large) */}
                <div
                  onClick={() => {
                    setUserAccountTab('overview');
                    setUserAccountOpen(true);
                  }}
                  className="cursor-pointer flex flex-col text-right leading-none select-none min-w-[48px] max-w-[130px] sm:max-w-[160px]"
                  title={`Current Balance: ${formatMoney(user.balance)}`}
                >
                  <span className="text-[10px] text-white font-bold tracking-tight">Balance</span>
                  {(() => {
                    const balNum = user.balance ?? 0;
                    const balStr = balNum.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                    // Dynamic size reduction for large numbers as explicitly requested by user
                    const fontSize =
                      balStr.length > 14
                        ? 'text-[9px]'
                        : balStr.length > 11
                        ? 'text-[10px]'
                        : balStr.length > 8
                        ? 'text-[11px]'
                        : 'text-xs sm:text-[13px]';

                    return (
                      <span className={`font-mono font-bold text-white tracking-tight ${fontSize} mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis`}>
                        {balStr}
                      </span>
                    );
                  })()}
                </div>

                {/* Circular Profile Avatar (Matching k.PNG: white circular border with white user icon) */}
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center bg-black text-white hover:border-[#FFE500] transition-colors shrink-0"
                  aria-label="User Account Menu"
                >
                  <User className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#181818] border border-[#333] rounded-lg shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#2d2d2d]">
                    <p className="font-bold text-white text-xs truncate">{user.fullName}</p>
                    <p className="text-[10px] text-gray-400 truncate">{user.phone || user.email}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#262626] text-[#E51E2B] rounded text-[9px] font-mono font-bold">
                      {user.role === 'admin' ? 'ADMIN OPERATOR' : 'VERIFIED PUNTER'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setUserAccountTab('overview');
                      setUserAccountOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#262626] flex items-center gap-2.5 text-gray-200"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <span>My Account</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserAccountTab('bets');
                      setUserAccountOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#262626] flex items-center gap-2.5 text-gray-200"
                  >
                    <Receipt className="w-4 h-4 text-gray-400" />
                    <span>My Bets & Slips</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserAccountTab('deposit');
                      setUserAccountOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#262626] flex items-center gap-2.5 text-gray-200"
                  >
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <span>Deposit / Withdraw</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserAccountTab('responsible');
                      setUserAccountOpen(true);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#262626] flex items-center gap-2.5 text-gray-200"
                  >
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span>Responsible Betting</span>
                  </button>

                  {/* Admin Dashboard & Logo Editor Entry */}
                  <div className="border-t border-[#2d2d2d] my-1">
                    <button
                      onClick={() => {
                        setCurrentPage('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#262626] flex items-center gap-2.5 text-[#FFE500] font-bold"
                    >
                      <Settings className="w-4 h-4 text-white" />
                      <span>Admin &amp; Logo Setup (Page)</span>
                    </button>
                    <button
                      onClick={() => {
                        switchDemoRole(user.role === 'admin' ? 'user' : 'admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-1.5 hover:bg-[#262626] text-[10px] text-gray-300 flex items-center gap-2"
                    >
                      <span>⇄ Switch Role to:</span>
                      <strong className="text-white">
                        {user.role === 'admin' ? 'Punter' : 'Admin'}
                      </strong>
                    </button>
                  </div>

                  <div className="border-t border-[#2d2d2d] pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#262626] flex items-center gap-2.5 text-gray-300 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 text-white" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out: White buttons, on click -> Yellow */
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-4 py-1.5 rounded font-bold uppercase tracking-wider text-[11px] bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black shadow transition-all"
              >
                LOGIN
              </button>
              <button
                onClick={() => {
                  setAuthModalMode('register');
                  setAuthModalOpen(true);
                }}
                className="px-4 py-1.5 rounded font-black uppercase tracking-wider text-[11px] bg-white hover:bg-[#FFE500] active:bg-[#FFE500] text-black shadow transition-all"
              >
                JOIN
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ROW 2: SUB-NAVIGATION CATEGORY BAR (Exact 1:1 match to nnn.PNG with responsive anti-clutter More) */}
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 h-[48px] flex items-center justify-between text-[10px] font-semibold uppercase tracking-tight relative">
        {/* Left Nav Group: Menu through More */}
        <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0">
          {/* Menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px]"
            title="All Sports Menu"
          >
            <Menu className="w-4 h-4 mb-0.5 text-white" />
            <span className="text-white">Menu</span>
          </button>

          {/* Sports (Active yellow highlight, white icon) */}
          <button
            onClick={() => setActiveEventTab('top')}
            className={`flex flex-col items-center justify-center px-2.5 py-1 rounded transition-all h-[44px] ${
              activeEventTab !== 'live'
                ? 'text-[#FFE500]'
                : 'text-white hover:text-[#FFE500]'
            }`}
          >
            <Trophy className={`w-4 h-4 mb-0.5 ${activeEventTab !== 'live' ? 'text-[#FFE500]' : 'text-white'}`} />
            <span className={activeEventTab !== 'live' ? 'font-bold text-[#FFE500]' : 'text-white'}>Sports</span>
          </button>

          {/* Live (Yellow indicator, white icon, NO RED) */}
          <button
            onClick={() => setActiveEventTab('live')}
            className={`flex flex-col items-center justify-center px-2.5 py-1 rounded transition-all h-[44px] relative ${
              activeEventTab === 'live'
                ? 'text-[#FFE500] font-bold'
                : 'text-white hover:text-[#FFE500]'
            }`}
          >
            <div className="relative">
              <Radio className={`w-4 h-4 mb-0.5 ${activeEventTab === 'live' ? 'text-[#FFE500]' : 'text-white'}`} />
              <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 bg-[#FFE500] rounded-full animate-ping" />
            </div>
            <span className={activeEventTab === 'live' ? 'text-[#FFE500]' : 'text-white'}>Live</span>
          </button>

          {/* Casino (777) */}
          <button
            onClick={() => alert('Casino: Over 1,500+ slot machines & live tables!')}
            className="flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px]"
          >
            <Coins className="w-4 h-4 mb-0.5 text-white" />
            <span className="text-white">Casino</span>
          </button>

          {/* Aviator */}
          <button
            onClick={() => alert('Aviator: Real-time crash game with instant payout!')}
            className="flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px]"
          >
            <Plane className="w-4 h-4 mb-0.5 text-white" />
            <span className="text-white">Aviator</span>
          </button>

          {/* Free2Play (F2P) - Hidden on mobile, visible on md+ */}
          <button
            onClick={() => alert('Free2Play: Predict match scores to win 10,000,000 RWF Jackpot!')}
            className="hidden md:flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px]"
          >
            <Gift className="w-4 h-4 mb-0.5 text-white" />
            <span className="text-white">Free2Play</span>
          </button>

          {/* Winner Leagues - Hidden on mobile, visible on md+ */}
          <button
            onClick={() => setActiveEventTab('top')}
            className="hidden md:flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px]"
          >
            <Zap className="w-4 h-4 mb-0.5 text-white" />
            <span className="whitespace-nowrap text-white">Winner Leagues</span>
          </button>

          {/* Crash Games (x999) - Hidden on mobile & tablet, visible on xl+ */}
          <button
            onClick={() => alert('Crash Games: Spaceman, JetX, Comet Crash with up to x1,000 multiplier!')}
            className="hidden xl:flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px]"
          >
            <div className="flex items-center justify-center h-4 mb-0.5">
              <span className="text-[9px] font-black text-white">x999</span>
            </div>
            <span className="whitespace-nowrap text-white">Crash Games</span>
          </button>

          {/* Promos - Hidden on mobile & tablet, visible on xl+ */}
          <button
            onClick={() => alert('Promotions: Freebets, Accumulator Boost & 2-Up Early Payouts!')}
            className="hidden xl:flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px]"
          >
            <Gift className="w-4 h-4 mb-0.5 text-white" />
            <span className="text-white">Promos</span>
          </button>

          {/* More Button (With Anti-Clutter Dropdown matching nnn.PNG) */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex flex-col items-center justify-center px-2.5 py-1 rounded transition-all h-[44px] ${
                moreDropdownOpen
                  ? 'text-white bg-[#222222]'
                  : 'text-white hover:text-[#FFE500] hover:bg-[#181818]'
              }`}
              title="More Categories & Options"
            >
              <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center mb-0.5">
                <MoreHorizontal className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="flex items-center gap-0.5 text-white">
                More
                <ChevronDown className={`w-2.5 h-2.5 text-white transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>

            {/* MORE POPUP DROPDOWN (Matches nnn.PNG layout + houses responsive overflow) */}
            {moreDropdownOpen && (
              <div className="absolute left-0 top-[48px] w-60 bg-[#161616] border border-[#2e2e2e] rounded-xl shadow-2xl z-50 py-2 text-xs divide-y divide-[#222]">
                {/* Section 1: Standard More Items with pure white icons */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      alert('Live Casino: Real-time Roulette, Blackjack & Baccarat with live dealers.');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                  >
                    <Shield className="w-4 h-4 text-white shrink-0" />
                    <span>Live Casino</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Virtual Sports: Virtual Football, Horses and Greyhounds every 3 minutes.');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                  >
                    <Gamepad2 className="w-4 h-4 text-white shrink-0" />
                    <span>Virtuals</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('How to Play: 1. Deposit via MTN/Airtel (*182#)\n2. Select matches\n3. Enter stake\n4. Win instant payout!');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                  >
                    <HelpCircle className="w-4 h-4 text-white shrink-0" />
                    <span>How To</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Winner Jackpot: Mega Jackpot 50,000,000 RWF for 15 match predictions!');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                  >
                    <Trophy className="w-4 h-4 text-white shrink-0" />
                    <span>Jackpot</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Big Winners: Punters who recently cashed out over 5,000,000 RWF!');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                  >
                    <Award className="w-4 h-4 text-white shrink-0" />
                    <span>Big Winners</span>
                  </button>
                </div>

                {/* Section 2: Items tucked in More on mobile / tablet to prevent clutter ("akajagari") */}
                <div className="py-1 xl:hidden">
                  <div className="px-3.5 py-1 text-[9px] font-black text-gray-400 uppercase tracking-wider">
                    Quick Entertainment
                  </div>

                  <button
                    onClick={() => {
                      alert('Promotions: Freebets, Accumulator Boost & 2-Up Early Payouts!');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                  >
                    <Gift className="w-4 h-4 text-white shrink-0" />
                    <span>Promotions &amp; Bonuses</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Crash Games: Spaceman, JetX, Comet Crash!');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                  >
                    <Flame className="w-4 h-4 text-white shrink-0" />
                    <span>Crash Games (x999)</span>
                  </button>

                  <div className="md:hidden">
                    <button
                      onClick={() => {
                        setActiveEventTab('top');
                        setMoreDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                    >
                      <Zap className="w-4 h-4 text-white shrink-0" />
                      <span>Winner Leagues</span>
                    </button>

                    <button
                      onClick={() => {
                        alert('Winner Free2Play: Predict scores to win 10,000,000 RWF!');
                        setMoreDropdownOpen(false);
                      }}
                      className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-white hover:text-[#FFE500] transition-colors text-left"
                    >
                      <Gift className="w-4 h-4 text-white shrink-0" />
                      <span>Free2Play</span>
                    </button>
                  </div>
                </div>

                {/* Section 3: Direct Admin Console & Operations Page */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setCurrentPage('admin');
                      setMoreDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-[#242424] flex items-center gap-2.5 text-[#FFE500] font-bold transition-colors text-left"
                  >
                    <Settings className="w-4 h-4 text-white shrink-0" />
                    <span>Admin Trading Console &amp; Logo (Page)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Nav Group: Prepaid, Check Betslip, Virtual Shop (Strictly aligned with k.PNG) */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0 pl-2">
          {/* Prepaid - Hidden on xs mobile, visible on sm+ */}
          <button
            onClick={() => {
              setUserAccountTab('deposit');
              setUserAccountOpen(true);
            }}
            className="hidden sm:flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px] group"
            title="Prepaid Vouchers"
          >
            <CreditCard className="w-4 h-4 mb-0.5 text-white" />
            <span className="text-white group-hover:text-[#FFE500]">Prepaid</span>
          </button>

          {/* Check Betslip - Exact 1:1 match to k.PNG with crisp white document & magnifying glass icon */}
          <button
            onClick={() => setCheckBetslipModalOpen(true)}
            className="flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px] group"
          >
            <div className="relative mb-0.5">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
                <path d="M8 7h8" />
                <path d="M8 11h4" />
              </svg>
              <Search className="w-2.5 h-2.5 text-white absolute -bottom-0.5 -right-1 bg-black rounded-full p-0.5" />
            </div>
            <span className="whitespace-nowrap text-white font-bold group-hover:text-[#FFE500]">Check Betslip</span>
          </button>

          {/* Virtual Shop - Exact 1:1 match to k.PNG with stylized 'V' and soccer ball in pure white */}
          <button
            onClick={() => alert('Winner Virtual Shop: Redeem reward points for freebets, jerseys, and tickets.')}
            className="hidden sm:flex flex-col items-center justify-center px-2 py-1 text-white hover:text-[#FFE500] rounded transition-colors h-[44px] group"
          >
            <div className="relative flex items-center justify-center h-4 mb-0.5">
              <span className="text-xs font-black italic tracking-tighter text-white mr-0.5">V</span>
              <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <polygon points="12,6 15.5,8.5 14,12.5 10,12.5 8.5,8.5" fill="currentColor" />
                <line x1="12" y1="6" x2="12" y2="2" stroke="currentColor" strokeWidth="1.5" />
                <line x1="15.5" y1="8.5" x2="19.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="12.5" x2="17" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="10" y1="12.5" x2="7" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8.5" y1="8.5" x2="4.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="whitespace-nowrap text-white font-bold group-hover:text-[#FFE500]">Virtual Shop</span>
          </button>
        </div>
      </div>
    </header>
  );
};
