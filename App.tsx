import React from 'react';
import { SportsbookProvider } from './context/SportsbookContext';
import { Navbar } from './components/Navbar';
import { SportsSidebar } from './components/SportsSidebar';
import { MainSportsbook } from './components/MainSportsbook';
import { BetslipSidebar } from './components/BetslipSidebar';
import { BottomSEOSection } from './components/BottomSEOSection';
import { WinnerAuthView } from './components/WinnerAuthView';
import { UserAccountModal } from './components/UserAccountModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { CheckBetslipModal } from './components/CheckBetslipModal';
import { MatchDetailModal } from './components/MatchDetailModal';
import { LiveChatModal } from './components/LiveChatModal';
import { MobileDrawer } from './components/MobileDrawer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { AdminPage } from './components/AdminPage';
import { useSportsbook } from './context/SportsbookContext';

export function SportsbookApp() {
  const { currentPage } = useSportsbook();

  if (currentPage === 'admin') {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans selection:bg-[#E51E2B] selection:text-white">
      {/* 1. Fixed Top Header */}
      <Navbar />

      {/* 2. Main 3-Column Sportsbook Workspace */}
      <div className="pt-[94px] pb-14 lg:pb-0 flex-1 flex flex-col">
        <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
          {/* Left Column: Sports Sidebar (~220px) */}
          <div className="hidden lg:block">
            <SportsSidebar />
          </div>

          {/* Center Column: Main Sportsbook (Banners, Highlights, Tabs, Match Cards) */}
          <div className="flex-1 flex flex-col min-w-0">
            <MainSportsbook />
            {/* Content below sportsbook: SEO, Responsible Gaming, FAQ, Footer */}
            <BottomSEOSection />
          </div>

          {/* Right Column: Betslip Sidebar (~310px) */}
          <div className="hidden lg:block">
            <BetslipSidebar />
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation & Drawers */}
      <MobileBottomBar />
      <MobileDrawer />

      {/* 4. Interactive Full Screen Views & Modals */}
      <WinnerAuthView />
      <UserAccountModal />
      <AdminPanelModal />
      <CheckBetslipModal />
      <MatchDetailModal />
      <LiveChatModal />
    </div>
  );
}

export default function App() {
  return (
    <SportsbookProvider>
      <SportsbookApp />
    </SportsbookProvider>
  );
}
