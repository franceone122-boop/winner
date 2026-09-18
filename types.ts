export type SportId =
  | 'football'
  | 'basketball'
  | 'tennis'
  | 'esoccer'
  | 'mma'
  | 'baseball'
  | 'boxing'
  | 'rugby'
  | 'cricket'
  | 'futsal'
  | 'handball'
  | 'ice_hockey'
  | 'snooker'
  | 'squash'
  | 'table_tennis'
  | 'volleyball'
  | 'american_football';

export type EventTab = 'live' | 'top' | 'upcoming';

export type MarketType = '1x2' | 'ft_1x2_2up' | 'double_chance' | 'over_under' | 'btts' | 'draw_no_bet';

export type OddsFormat = 'decimal' | 'fractional' | 'american';

export interface SportCategory {
  id: SportId;
  name: string;
  iconName: string;
  eventCount: number;
  leagues?: League[];
}

export interface League {
  id: string;
  sportId: SportId;
  name: string;
  country: string;
  flagUrl?: string;
  eventCount: number;
  popular?: boolean;
}

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  logo: string;
  country?: string;
}

export interface OddsValue {
  id: string;
  label: string; // '1' | 'X' | '2' | 'Over 2.5' | etc.
  odds: number;
  marketName: string; // '1X2' | 'Double Chance' | etc.
  trend?: 'up' | 'down' | 'neutral';
  lastUpdated?: number;
}

export interface MatchMarket {
  id: string;
  name: string;
  type: MarketType;
  options: OddsValue[];
}

export interface MatchEvent {
  id: string;
  sportId: SportId;
  leagueId: string;
  leagueName: string;
  country: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: string; // e.g. "Today 20:45" or "17/09/26 12:00"
  timestamp: number;
  isLive: boolean;
  liveMinute?: string; // e.g. "67'"
  liveScore?: {
    home: number;
    away: number;
    period?: string;
  };
  featured?: boolean;
  marketsCount: number;
  mainMarkets: {
    homeWin: OddsValue;
    draw: OddsValue;
    awayWin: OddsValue;
    doubleChance1X?: OddsValue;
    doubleChance12?: OddsValue;
    doubleChanceX2?: OddsValue;
    over25?: OddsValue;
    under25?: OddsValue;
    bttsYes?: OddsValue;
    bttsNo?: OddsValue;
  };
  additionalMarkets?: MatchMarket[];
}

export interface BetSelection {
  matchId: string;
  eventId: string;
  eventName: string; // e.g. "Juventus vs NEC Nijmegen"
  leagueName: string;
  selectionId: string;
  marketName: string;
  outcomeLabel: string; // e.g. "1" or "Home Win"
  odds: number;
  isLive: boolean;
  trend?: 'up' | 'down' | 'neutral';
}

export type BetStatus = 'pending' | 'won' | 'lost' | 'cashed_out' | 'refunded';

export interface PlacedBet {
  id: string;
  bookingCode: string;
  userId: string;
  userName: string;
  type: 'single' | 'accumulator' | 'system';
  selections: BetSelection[];
  stake: number;
  totalOdds: number;
  bonusMultiplier: number;
  potentialPayout: number;
  status: BetStatus;
  createdAt: number;
  cashoutValue?: number;
  settledAt?: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  balance: number;
  bonusBalance: number;
  currency: string;
  isVerified: boolean;
  createdAt: number;
  dailyDepositLimit?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'bet_placed' | 'bet_payout' | 'bonus_credited';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod?: string;
  reference: string;
  timestamp: number;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  highlightAmount: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  imageIcon: string;
}
