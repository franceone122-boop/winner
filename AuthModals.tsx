import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User, Check, ShieldCheck, Zap } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { WinnerLogo } from './WinnerLogo';

export const AuthModals: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
  } = useSportsbook();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('jp.mugisha@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regReferral, setRegReferral] = useState('');
  const [regTerms, setRegTerms] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setErrorMsg('Please enter your phone number or email.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Please enter your password.');
      return;
    }
    login(loginIdentifier, 'user');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regPhone.trim() || !regEmail.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!regTerms) {
      setErrorMsg('You must be 18+ and accept the Terms & Conditions.');
      return;
    }
    login(regEmail, 'user');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#181818] border border-[#333] rounded-xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#282828] bg-[#141414]">
          <WinnerLogo size="sm" />

          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-[#282828] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch (Login / Register) */}
        <div className="grid grid-cols-2 border-b border-[#282828] bg-[#1a1a1a] text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setErrorMsg(null);
            }}
            className={`py-3 text-center transition-colors border-b-2 ${
              authModalMode === 'login'
                ? 'border-[#E51E2B] text-[#E51E2B] bg-[#241415]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setAuthModalMode('register');
              setErrorMsg(null);
            }}
            className={`py-3 text-center transition-colors border-b-2 ${
              authModalMode === 'register'
                ? 'border-[#E51E2B] text-[#E51E2B] bg-[#241415]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded">
              {errorMsg}
            </div>
          )}

          {authModalMode === 'login' ? (
            /* 9. LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Phone Number or Email
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. 0788123456 or name@gmail.com"
                    className="w-full pl-9 pr-3 py-2 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-300">Password</label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Password reset link sent to registered phone/email!');
                    }}
                    className="text-[11px] text-[#E51E2B] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3 text-gray-400" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#222] border-[#444] text-[#E51E2B] focus:ring-0 w-4 h-4 accent-[#E51E2B]"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-black text-xs uppercase tracking-wider rounded shadow-md transition-all"
              >
                LOGIN
              </button>

              {/* Quick Demo Logins for Testing */}
              <div className="pt-3 border-t border-[#292929]">
                <p className="text-[11px] text-gray-400 text-center mb-2 font-semibold">
                  Or instant 1-click demo login:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => login('jp.mugisha@gmail.com', 'user')}
                    className="py-1.5 px-2 bg-[#242424] hover:bg-[#2e2e2e] border border-[#3a3a3a] rounded text-[11px] text-white font-medium transition-colors"
                  >
                    👤 Punter Account
                  </button>
                  <button
                    type="button"
                    onClick={() => login('admin@winner.rw', 'admin')}
                    className="py-1.5 px-2 bg-[#241415] hover:bg-[#321719] border border-[#E51E2B]/50 rounded text-[11px] text-[#E51E2B] font-bold transition-colors"
                  >
                    ⚡ Admin Panel
                  </button>
                </div>
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                onClick={() => login('google.user@gmail.com', 'user')}
                className="w-full py-2 bg-[#222] hover:bg-[#2a2a2a] border border-[#383838] text-gray-200 text-xs font-semibold rounded flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>
          ) : (
            /* 9. REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Jean-Pierre Mugisha"
                  className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+250 788 123 456"
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="At least 6 chars"
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Confirm</label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  value={regReferral}
                  onChange={(e) => setRegReferral(e.target.value)}
                  placeholder="e.g. WINNER2000"
                  className="w-full px-3 py-1.5 bg-[#222] border border-[#383838] rounded text-white text-xs uppercase font-mono focus:border-[#E51E2B] focus:outline-none"
                />
              </div>

              <label className="flex items-start gap-2 text-[11px] text-gray-400 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={regTerms}
                  onChange={(e) => setRegTerms(e.target.checked)}
                  className="mt-0.5 rounded bg-[#222] border-[#444] text-[#E51E2B] focus:ring-0 w-3.5 h-3.5 accent-[#E51E2B]"
                  required
                />
                <span>
                  I confirm that I am at least 18 years of age and agree to the Terms & Conditions and Responsible Gaming Policy.
                </span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-black text-xs uppercase tracking-wider rounded shadow-md transition-all mt-2"
              >
                CREATE ACCOUNT
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
