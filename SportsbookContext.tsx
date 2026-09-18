import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  syncUserProfileToFirestore,
  saveBetToFirestore,
  updateBetInFirestore,
  saveTransactionToFirestore,
} from '../services/firestoreService';
import {
  SportId,
  EventTab,
  MarketType,
  OddsFormat,
  MatchEvent,
  BetSelection,
  PlacedBet,
  UserProfile,
  Transaction,
} from '../types';
import {
  INITIAL_MATCHES,
  DEFAULT_USER,
  ADMIN_USER,
  INITIAL_BETS,
  INITIAL_TRANSACTIONS,
} from '../data/mockData';

interface SportsbookContextType {
  // User & Auth
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (emailOrPhone: string, role?: 'user' | 'admin') => void;
  logout: () => void;
  switchDemoRole: (role: 'user' | 'admin') => void;

  // Sportsbook data & navigation
  matches: MatchEvent[];
  filteredMatches: MatchEvent[];
  activeEventTab: EventTab;
  setActiveEventTab: (tab: EventTab) => void;
  selectedSport: SportId;
  setSelectedSport: (sport: SportId) => void;
  selectedLeague: string | null;
  setSelectedLeague: (leagueId: string | null) => void;
  selectedMarketFilter: MarketType;
  setSelectedMarketFilter: (market: MarketType) => void;
  timeFilter: string;
  setTimeFilter: (time: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Betslip
  selections: BetSelection[];
  selectedOddsIds: Set<string>;
  toggleSelection: (
    match: MatchEvent,
    outcomeLabel: string,
    odds: number,
    marketName: string,
    selectionId: string
  ) => void;
  removeSelection: (selectionId: string) => void;
  clearBetslip: () => void;
  stake: number;
  setStake: (val: number) => void;
  acceptOddsChanges: boolean;
  setAcceptOddsChanges: (val: boolean) => void;
  bookingCodeInput: string;
  setBookingCodeInput: (code: string) => void;
  loadBookingCode: (code: string) => { success: boolean; message: string };
  generateBookingCode: () => string;
  totalOdds: number;
  accumulatorBonus: number;
  potentialPayout: number;
  placeBet: () => { success: boolean; message: string; bet?: PlacedBet };

  // Bets & Transactions History
  placedBets: PlacedBet[];
  transactions: Transaction[];
  cashoutBet: (betId: string) => boolean;
  depositFunds: (amount: number, method: string) => boolean;
  withdrawFunds: (amount: number, method: string) => { success: boolean; message: string };

  // Admin capabilities
  adminUpdateOdds: (matchId: string, marketId: string, newOdds: number) => void;
  adminToggleMatchStatus: (matchId: string) => void;
  adminSimulateGoal: (matchId: string, team: 'home' | 'away') => void;
  adminSettleBet: (betId: string, status: 'won' | 'lost') => void;
  adminCreateMatch: (match: MatchEvent) => void;

  // UI Modals & Settings
  oddsFormat: OddsFormat;
  setOddsFormat: (fmt: OddsFormat) => void;
  formatOdds: (odds: number) => string;
  formatMoney: (amount: number) => string;
  language: 'en' | 'rw' | 'fr';
  setLanguage: (lang: 'en' | 'rw' | 'fr') => void;

  // Branding & Logo
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;

  // Modals & Navigation visibility
  currentPage: 'sportsbook' | 'admin';
  setCurrentPage: (page: 'sportsbook' | 'admin') => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  userAccountOpen: boolean;
  setUserAccountOpen: (open: boolean) => void;
  userAccountTab: 'overview' | 'deposit' | 'withdraw' | 'bets' | 'transactions' | 'responsible';
  setUserAccountTab: (tab: 'overview' | 'deposit' | 'withdraw' | 'bets' | 'transactions' | 'responsible') => void;
  adminModalOpen: boolean;
  setAdminModalOpen: (open: boolean) => void;
  checkBetslipModalOpen: boolean;
  setCheckBetslipModalOpen: (open: boolean) => void;
  activeDetailMatch: MatchEvent | null;
  setActiveDetailMatch: (match: MatchEvent | null) => void;
  liveChatOpen: boolean;
  setLiveChatOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  mobileBetslipOpen: boolean;
  setMobileBetslipOpen: (open: boolean) => void;
  betslipSidebarTab: 'betslip' | 'mybets';
  setBetslipSidebarTab: (tab: 'betslip' | 'mybets') => void;

  // Odds Trends for pulse animations
  oddsTrends: Record<string, 'up' | 'down'>;
}

const SportsbookContext = createContext<SportsbookContextType | undefined>(undefined);

export const SportsbookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or use defaults
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('winner_user') || localStorage.getItem('voltbet_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [matches, setMatches] = useState<MatchEvent[]>(() => {
    const saved = localStorage.getItem('winner_matches') || localStorage.getItem('voltbet_matches');
    return saved ? JSON.parse(saved) : INITIAL_MATCHES;
  });

  const [selections, setSelections] = useState<BetSelection[]>(() => {
    const saved = localStorage.getItem('winner_selections') || localStorage.getItem('voltbet_selections');
    return saved ? JSON.parse(saved) : [];
  });

  const [placedBets, setPlacedBets] = useState<PlacedBet[]>(() => {
    const saved = localStorage.getItem('winner_bets') || localStorage.getItem('voltbet_bets');
    return saved ? JSON.parse(saved) : INITIAL_BETS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('winner_txs') || localStorage.getItem('voltbet_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  // Sportsbook navigation & filters
  const [activeEventTab, setActiveEventTab] = useState<EventTab>('top');
  const [selectedSport, setSelectedSport] = useState<SportId>('football');
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [selectedMarketFilter, setSelectedMarketFilter] = useState<MarketType>('1x2');
  const [timeFilter, setTimeFilter] = useState<string>('today');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Betslip controls
  const [stake, setStake] = useState<number>(1000);
  const [acceptOddsChanges, setAcceptOddsChanges] = useState<boolean>(true);
  const [bookingCodeInput, setBookingCodeInput] = useState<string>('');
  const [betslipSidebarTab, setBetslipSidebarTab] = useState<'betslip' | 'mybets'>('betslip');

  // Branding & Logo state (loaded from local storage)
  const [logoUrl, setLogoUrlState] = useState<string | null>(() => {
    return localStorage.getItem('winner_custom_logo') || null;
  });

  const setLogoUrl = (url: string | null) => {
    setLogoUrlState(url);
    if (url) {
      localStorage.setItem('winner_custom_logo', url);
    } else {
      localStorage.removeItem('winner_custom_logo');
    }
  };

  // Preferences
  const [oddsFormat, setOddsFormat] = useState<OddsFormat>('decimal');
  const [language, setLanguage] = useState<'en' | 'rw' | 'fr'>('en');

  // Modals & Navigation
  const [currentPage, setCurrentPage] = useState<'sportsbook' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin' ? 'admin' : 'sportsbook';
    }
    return 'sportsbook';
  });

  // Keep hash in sync with currentPage
  const handleSetCurrentPage = useCallback((page: 'sportsbook' | 'admin') => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      if (page === 'admin') {
        window.location.hash = 'admin';
      } else {
        if (window.location.hash === '#admin') {
          history.pushState(null, '', window.location.pathname + window.location.search);
        }
      }
    }
  }, []);

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [userAccountOpen, setUserAccountOpen] = useState<boolean>(false);
  const [userAccountTab, setUserAccountTab] = useState<'overview' | 'deposit' | 'withdraw' | 'bets' | 'transactions' | 'responsible'>('overview');
  const [adminModalOpen, setAdminModalOpenState] = useState<boolean>(false);
  const setAdminModalOpen = useCallback((open: boolean) => {
    setAdminModalOpenState(open);
    if (open) {
      handleSetCurrentPage('admin');
    }
  }, [handleSetCurrentPage]);
  const [checkBetslipModalOpen, setCheckBetslipModalOpen] = useState<boolean>(false);
  const [activeDetailMatch, setActiveDetailMatch] = useState<MatchEvent | null>(null);
  const [liveChatOpen, setLiveChatOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [mobileBetslipOpen, setMobileBetslipOpen] = useState<boolean>(false);

  // Live odds flash trends
  const [oddsTrends, setOddsTrends] = useState<Record<string, 'up' | 'down'>>({});

  // Sync state to local storage and Firestore
  useEffect(() => {
    if (user) {
      localStorage.setItem('winner_user', JSON.stringify(user));
      syncUserProfileToFirestore(user);
    } else {
      localStorage.removeItem('winner_user');
      localStorage.removeItem('voltbet_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('winner_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('winner_selections', JSON.stringify(selections));
  }, [selections]);

  useEffect(() => {
    localStorage.setItem('winner_bets', JSON.stringify(placedBets));
  }, [placedBets]);

  useEffect(() => {
    localStorage.setItem('winner_txs', JSON.stringify(transactions));
  }, [transactions]);

  // Real-time odds tick engine (simulating live sportsbook odds changes & match clocks)
  useEffect(() => {
    const interval = setInterval(() => {
      setMatches((prevMatches) => {
        const updated = [...prevMatches];
        // Pick 1 live match or 1 upcoming match to adjust
        const targetIndex = Math.floor(Math.random() * updated.length);
        const match = { ...updated[targetIndex] };

        // If match is live, advance minute or change score randomly
        if (match.isLive) {
          if (match.liveMinute && match.liveMinute.includes("'")) {
            const currentMin = parseInt(match.liveMinute.replace("'", ''), 10) || 45;
            if (currentMin < 90) {
              match.liveMinute = `${currentMin + 1}'`;
            }
          }
        }

        // Randomly adjust homeWin or draw or awayWin odds
        const marketKeys: Array<'homeWin' | 'draw' | 'awayWin'> = ['homeWin', 'draw', 'awayWin'];
        const chosenKey = marketKeys[Math.floor(Math.random() * marketKeys.length)];
        const currentVal = match.mainMarkets[chosenKey].odds;
        const delta = (Math.random() * 0.16 - 0.08); // -0.08 to +0.08
        let nextVal = Math.round((currentVal + delta) * 100) / 100;
        if (nextVal < 1.05) nextVal = 1.05;
        if (nextVal > 40.0) nextVal = 40.0;

        if (nextVal !== currentVal) {
          const trendDirection: 'up' | 'down' = nextVal > currentVal ? 'up' : 'down';
          const oddsId = match.mainMarkets[chosenKey].id;

          match.mainMarkets = {
            ...match.mainMarkets,
            [chosenKey]: {
              ...match.mainMarkets[chosenKey],
              odds: nextVal,
              trend: trendDirection,
              lastUpdated: Date.now(),
            },
          };

          // Register in oddsTrends for pulse styling
          setOddsTrends((prev) => ({ ...prev, [oddsId]: trendDirection }));
          setTimeout(() => {
            setOddsTrends((prev) => {
              const next = { ...prev };
              delete next[oddsId];
              return next;
            });
          }, 3000);
        }

        updated[targetIndex] = match;
        return updated;
      });
    }, 8500);

    return () => clearInterval(interval);
  }, []);

  // Quick lookup set of selected odds IDs
  const selectedOddsIds = useMemo(() => {
    return new Set(selections.map((s) => s.selectionId));
  }, [selections]);

  // Toggle selection
  const toggleSelection = useCallback(
    (
      match: MatchEvent,
      outcomeLabel: string,
      odds: number,
      marketName: string,
      selectionId: string
    ) => {
      setSelections((prev) => {
        // If already selected, remove it
        const exists = prev.find((s) => s.selectionId === selectionId);
        if (exists) {
          return prev.filter((s) => s.selectionId !== selectionId);
        }

        // Check if there's already a selection for this match in the same market
        // (In sports betting, clicking another outcome in the same market replaces it)
        const withoutSameMatchMarket = prev.filter(
          (s) => !(s.matchId === match.id && s.marketName === marketName)
        );

        const newSelection: BetSelection = {
          matchId: match.id,
          eventId: match.id,
          eventName: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          leagueName: match.leagueName,
          selectionId,
          marketName,
          outcomeLabel,
          odds,
          isLive: match.isLive,
        };

        return [...withoutSameMatchMarket, newSelection];
      });
    },
    []
  );

  const removeSelection = useCallback((selectionId: string) => {
    setSelections((prev) => prev.filter((s) => s.selectionId !== selectionId));
  }, []);

  const clearBetslip = useCallback(() => {
    setSelections([]);
  }, []);

  // Total odds calculation
  const totalOdds = useMemo(() => {
    if (selections.length === 0) return 0;
    const prod = selections.reduce((acc, curr) => acc * curr.odds, 1);
    return Math.round(prod * 100) / 100;
  }, [selections]);

  // Multi-bet Accumulator Boost (sportsbook bonus for 3+ selections)
  const accumulatorBonus = useMemo(() => {
    const count = selections.length;
    if (count <= 2) return 0;
    if (count === 3) return 0.05; // 5%
    if (count === 4) return 0.10; // 10%
    if (count === 5) return 0.15; // 15%
    if (count >= 6 && count <= 9) return 0.25; // 25%
    if (count >= 10) return 0.50; // 50%
    return 0;
  }, [selections]);

  const potentialPayout = useMemo(() => {
    if (selections.length === 0 || stake <= 0) return 0;
    const baseWin = stake * totalOdds;
    const withBonus = baseWin * (1 + accumulatorBonus);
    return Math.round(withBonus);
  }, [selections, stake, totalOdds, accumulatorBonus]);

  // Generate a random booking code
  const generateBookingCode = useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'VB-';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }, []);

  // Load a booking code
  const loadBookingCode = useCallback(
    (code: string) => {
      const cleanCode = code.trim().toUpperCase();
      // Search in existing placed bets or match demo tickets
      const existingBet = placedBets.find(
        (b) => b.bookingCode.toUpperCase() === cleanCode
      );

      if (existingBet) {
        setSelections(existingBet.selections);
        setStake(existingBet.stake);
        return { success: true, message: `Loaded ${existingBet.selections.length} selections from ${cleanCode}!` };
      }

      // If it's a new code format, generate popular accumulator selections
      if (cleanCode.length >= 4) {
        const topPicks: BetSelection[] = [
          {
            matchId: matches[0].id,
            eventId: matches[0].id,
            eventName: `${matches[0].homeTeam.name} vs ${matches[0].awayTeam.name}`,
            leagueName: matches[0].leagueName,
            selectionId: matches[0].mainMarkets.homeWin.id,
            marketName: '1X2',
            outcomeLabel: `${matches[0].homeTeam.shortName || 'Home'} (1)`,
            odds: matches[0].mainMarkets.homeWin.odds,
            isLive: matches[0].isLive,
          },
          {
            matchId: matches[1].id,
            eventId: matches[1].id,
            eventName: `${matches[1].homeTeam.name} vs ${matches[1].awayTeam.name}`,
            leagueName: matches[1].leagueName,
            selectionId: matches[1].mainMarkets.homeWin.id,
            marketName: '1X2',
            outcomeLabel: `${matches[1].homeTeam.shortName || 'Home'} (1)`,
            odds: matches[1].mainMarkets.homeWin.odds,
            isLive: matches[1].isLive,
          },
        ];
        setSelections(topPicks);
        setStake(2000);
        return { success: true, message: `Loaded popular ticket selections for ${cleanCode}!` };
      }

      return { success: false, message: 'Invalid booking code. Please check and try again.' };
    },
    [placedBets, matches]
  );

  // Place Bet
  const placeBet = useCallback(() => {
    if (!user) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return { success: false, message: 'Please log in to place a bet.' };
    }

    if (selections.length === 0) {
      return { success: false, message: 'Your betslip is empty. Add selections first.' };
    }

    if (stake <= 0) {
      return { success: false, message: 'Please enter a valid stake amount.' };
    }

    if (user.balance < stake) {
      setUserAccountTab('deposit');
      setUserAccountOpen(true);
      return {
        success: false,
        message: `Insufficient balance (${user.balance.toLocaleString()} ${user.currency}). Please deposit funds.`,
      };
    }

    // Deduct balance
    const newBalance = user.balance - stake;
    const bookingCode = generateBookingCode();
    const newBet: PlacedBet = {
      id: `bet-${Date.now().toString().slice(-6)}`,
      bookingCode,
      userId: user.id,
      userName: user.fullName,
      type: selections.length === 1 ? 'single' : 'accumulator',
      selections: [...selections],
      stake,
      totalOdds,
      bonusMultiplier: 1 + accumulatorBonus,
      potentialPayout,
      status: 'pending',
      createdAt: Date.now(),
      cashoutValue: Math.round(stake * 0.95),
    };

    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-6)}`,
      userId: user.id,
      type: 'bet_placed',
      amount: stake,
      currency: user.currency,
      status: 'completed',
      reference: `SLIP-${bookingCode}`,
      timestamp: Date.now(),
    };

    setUser({ ...user, balance: newBalance });
    setPlacedBets((prev) => [newBet, ...prev]);
    setTransactions((prev) => [newTx, ...prev]);
    setSelections([]);

    // Persist to Firestore
    saveBetToFirestore(newBet);
    saveTransactionToFirestore(newTx);

    // Celebrate with confetti
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#E51E2B', '#FFFFFF', '#10B981'],
    });

    return { success: true, message: `Bet placed successfully! Booking code: ${bookingCode}`, bet: newBet };
  }, [user, selections, stake, totalOdds, accumulatorBonus, potentialPayout, generateBookingCode]);

  // Cashout Bet
  const cashoutBet = useCallback(
    (betId: string) => {
      if (!user) return false;
      const targetBet = placedBets.find((b) => b.id === betId);
      if (!targetBet || targetBet.status !== 'pending' || !targetBet.cashoutValue) return false;

      const cashoutAmt = targetBet.cashoutValue;
      setUser((prev) => (prev ? { ...prev, balance: prev.balance + cashoutAmt } : null));

      setPlacedBets((prev) =>
        prev.map((b) => (b.id === betId ? { ...b, status: 'cashed_out', settledAt: Date.now() } : b))
      );

      const tx: Transaction = {
        id: `tx-co-${Date.now().toString().slice(-6)}`,
        userId: user.id,
        type: 'bet_payout',
        amount: cashoutAmt,
        currency: user.currency,
        status: 'completed',
        reference: `CASHOUT-${targetBet.bookingCode}`,
        timestamp: Date.now(),
      };
      setTransactions((prev) => [tx, ...prev]);

      // Persist to Firestore
      updateBetInFirestore(betId, 'cashed_out');
      saveTransactionToFirestore(tx);

      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#E51E2B', '#10B981'],
      });

      return true;
    },
    [user, placedBets]
  );

  // Deposit funds
  const depositFunds = useCallback(
    (amount: number, method: string) => {
      if (!user || amount <= 0) return false;
      const updatedBalance = user.balance + amount;
      setUser({ ...user, balance: updatedBalance });

      const tx: Transaction = {
        id: `tx-dep-${Date.now().toString().slice(-6)}`,
        userId: user.id,
        type: 'deposit',
        amount,
        currency: user.currency,
        status: 'completed',
        paymentMethod: method,
        reference: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: Date.now(),
      };
      setTransactions((prev) => [tx, ...prev]);
      saveTransactionToFirestore(tx);
      return true;
    },
    [user]
  );

  // Withdraw funds
  const withdrawFunds = useCallback(
    (amount: number, method: string) => {
      if (!user) return { success: false, message: 'Please log in' };
      if (amount <= 0) return { success: false, message: 'Invalid withdrawal amount' };
      if (user.balance < amount) return { success: false, message: 'Insufficient balance' };

      const updatedBalance = user.balance - amount;
      setUser({ ...user, balance: updatedBalance });

      const tx: Transaction = {
        id: `tx-wth-${Date.now().toString().slice(-6)}`,
        userId: user.id,
        type: 'withdrawal',
        amount,
        currency: user.currency,
        status: 'completed',
        paymentMethod: method,
        reference: `WTH-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: Date.now(),
      };
      setTransactions((prev) => [tx, ...prev]);
      saveTransactionToFirestore(tx);
      return { success: true, message: `Withdrawal of ${amount.toLocaleString()} ${user.currency} sent to ${method}!` };
    },
    [user]
  );

  // Admin capabilities
  const adminUpdateOdds = useCallback((matchId: string, marketId: string, newOdds: number) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        const mm = { ...m.mainMarkets };
        if (mm.homeWin.id === marketId) mm.homeWin = { ...mm.homeWin, odds: newOdds, trend: 'up' };
        else if (mm.draw.id === marketId) mm.draw = { ...mm.draw, odds: newOdds, trend: 'up' };
        else if (mm.awayWin.id === marketId) mm.awayWin = { ...mm.awayWin, odds: newOdds, trend: 'up' };
        return { ...m, mainMarkets: mm };
      })
    );
  }, []);

  const adminToggleMatchStatus = useCallback((matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        const willBeLive = !m.isLive;
        return {
          ...m,
          isLive: willBeLive,
          startTime: willBeLive ? 'LIVE' : 'Finished',
          liveMinute: willBeLive ? "12'" : undefined,
          liveScore: willBeLive ? { home: 0, away: 0, period: '1st Half' } : m.liveScore,
        };
      })
    );
  }, []);

  const adminSimulateGoal = useCallback((matchId: string, team: 'home' | 'away') => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId) return m;
        const score = m.liveScore ? { ...m.liveScore } : { home: 0, away: 0, period: '1st Half' };
        if (team === 'home') score.home += 1;
        else score.away += 1;

        return {
          ...m,
          isLive: true,
          liveScore: score,
        };
      })
    );
  }, []);

  const adminSettleBet = useCallback((betId: string, status: 'won' | 'lost') => {
    setPlacedBets((prev) =>
      prev.map((b) => {
        if (b.id !== betId) return b;
        return {
          ...b,
          status,
          settledAt: Date.now(),
        };
      })
    );
    updateBetInFirestore(betId, status);
  }, []);

  const adminCreateMatch = useCallback((match: MatchEvent) => {
    setMatches((prev) => [match, ...prev]);
  }, []);

  // Authentication helpers
  const login = useCallback((emailOrPhone: string, role: 'user' | 'admin' = 'user') => {
    if (role === 'admin') {
      setUser(ADMIN_USER);
    } else {
      setUser({
        ...DEFAULT_USER,
        email: emailOrPhone.includes('@') ? emailOrPhone : 'punter@winner.rw',
        phone: !emailOrPhone.includes('@') ? emailOrPhone : '+250 788 123 456',
      });
    }
    setAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchDemoRole = useCallback((role: 'user' | 'admin') => {
    if (role === 'admin') setUser(ADMIN_USER);
    else setUser(DEFAULT_USER);
  }, []);

  // Format odds
  const formatOdds = useCallback(
    (odds: number): string => {
      if (oddsFormat === 'decimal') return odds.toFixed(2);
      if (oddsFormat === 'american') {
        if (odds >= 2.0) {
          const am = Math.round((odds - 1) * 100);
          return `+${am}`;
        } else {
          const am = Math.round(-100 / (odds - 1));
          return `${am}`;
        }
      }
      if (oddsFormat === 'fractional') {
        const val = odds - 1;
        if (Math.abs(val - 0.5) < 0.05) return '1/2';
        if (Math.abs(val - 1.0) < 0.05) return '1/1';
        if (Math.abs(val - 1.5) < 0.05) return '3/2';
        if (Math.abs(val - 2.0) < 0.05) return '2/1';
        if (Math.abs(val - 3.0) < 0.05) return '3/1';
        return `${val.toFixed(1)}/1`;
      }
      return odds.toFixed(2);
    },
    [oddsFormat]
  );

  const formatMoney = useCallback(
    (amount: number): string => {
      const cur = user?.currency || 'RWF';
      return `${amount.toLocaleString()} ${cur}`;
    },
    [user]
  );

  // Filtered matches based on active tab, sport, league, search, and time
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      // Tab filter
      if (activeEventTab === 'live' && !m.isLive) return false;
      if (activeEventTab === 'upcoming' && m.isLive) return false;
      if (activeEventTab === 'top' && !m.featured && !m.isLive) return false;

      // Sport filter
      if (selectedSport && m.sportId !== selectedSport) return false;

      // League filter
      if (selectedLeague && m.leagueId !== selectedLeague) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = `${m.homeTeam.name} ${m.awayTeam.name} ${m.leagueName} ${m.country}`.toLowerCase();
        if (!matchName.includes(q)) return false;
      }

      return true;
    });
  }, [matches, activeEventTab, selectedSport, selectedLeague, searchQuery]);

  return (
    <SportsbookContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
        switchDemoRole,
        matches,
        filteredMatches,
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
        searchQuery,
        setSearchQuery,
        selections,
        selectedOddsIds,
        toggleSelection,
        removeSelection,
        clearBetslip,
        stake,
        setStake,
        acceptOddsChanges,
        setAcceptOddsChanges,
        bookingCodeInput,
        setBookingCodeInput,
        loadBookingCode,
        generateBookingCode,
        totalOdds,
        accumulatorBonus,
        potentialPayout,
        placeBet,
        placedBets,
        transactions,
        cashoutBet,
        depositFunds,
        withdrawFunds,
        adminUpdateOdds,
        adminToggleMatchStatus,
        adminSimulateGoal,
        adminSettleBet,
        adminCreateMatch,
        oddsFormat,
        setOddsFormat,
        formatOdds,
        formatMoney,
        language,
        setLanguage,
        currentPage,
        setCurrentPage: handleSetCurrentPage,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        userAccountOpen,
        setUserAccountOpen,
        userAccountTab,
        setUserAccountTab,
        adminModalOpen,
        setAdminModalOpen,
        checkBetslipModalOpen,
        setCheckBetslipModalOpen,
        activeDetailMatch,
        setActiveDetailMatch,
        liveChatOpen,
        setLiveChatOpen,
        mobileMenuOpen,
        setMobileMenuOpen,
        mobileBetslipOpen,
        setMobileBetslipOpen,
        betslipSidebarTab,
        setBetslipSidebarTab,
        logoUrl,
        setLogoUrl,
        oddsTrends,
      }}
    >
      {children}
    </SportsbookContext.Provider>
  );
};

export const useSportsbook = () => {
  const context = useContext(SportsbookContext);
  if (!context) {
    throw new Error('useSportsbook must be used within a SportsbookProvider');
  }
  return context;
};
