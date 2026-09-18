import React, { useState } from 'react';
import { ArrowLeft, Lock, Eye, EyeOff, ChevronDown, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { useSportsbook } from '../context/SportsbookContext';
import { WinnerFooter } from './WinnerFooter';

export const WinnerAuthView: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
  } = useSportsbook();

  const [phone, setPhone] = useState('791059409');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [promoExpanded, setPromoExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(true);

  if (!authModalOpen) return null;

  const isLogin = authModalMode === 'login';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    setPasswordTouched(true);

    if (!phone.trim()) return;
    if (!password.trim() || password.length < 4) return;

    login(phone.startsWith('+250') ? phone : `+250${phone.replace(/^0+/, '')}`, 'user');
    setAuthModalOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneTouched(true);
    setPasswordTouched(true);

    if (!phone.trim()) return;
    if (!password.trim() || password.length < 4) return;
    if (!termsAccepted) return;

    login(phone.startsWith('+250') ? phone : `+250${phone.replace(/^0+/, '')}`, 'user');
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#0f0f0f] text-white flex flex-col overflow-y-auto pt-[50px] animate-in fade-in duration-150">
      {/* Sub-header Bar (Exact match to gdg.PNG and jhgf.PNG) */}
      <div className="w-full bg-[#242424] border-b border-[#333] px-4 py-2.5 flex items-center shadow-md">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="flex items-center gap-2 text-white hover:text-gray-300 font-extrabold text-sm uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" />
          <span>{isLogin ? 'LOGIN' : 'REGISTER'}</span>
        </button>
      </div>

      {/* Main Form Center Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 min-h-[560px]">
        <div className="w-full max-w-md bg-[#161616] border border-[#2b2b2b] rounded-lg p-6 sm:p-8 shadow-2xl">
          {isLogin ? (
            /* =================== LOGIN FORM (gdg.PNG) =================== */
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Phone Input with +250 selector */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#202020] border border-[#383838] rounded text-xs text-gray-200 shrink-0">
                    <span className="text-sm">🇷🇼</span>
                    <span className="font-bold">+250</span>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => setPhoneTouched(true)}
                      placeholder="Phone number"
                      className="w-full px-3 py-2 bg-[#202020] border border-[#383838] rounded text-white text-xs font-mono focus:border-[#E51E2B] focus:outline-none placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
                  Deposits accepted from Airtel and MTN only
                </p>
                {phoneTouched && !phone.trim() && (
                  <p className="text-[11px] text-[#E51E2B] mt-1 ml-1 font-semibold">
                    Phone number is required
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    placeholder="Password"
                    className="w-full pl-9 pr-9 py-2 bg-[#202020] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] mt-1.5 px-1">
                  <span className="text-gray-400">Min. 4 characters</span>
                  <button
                    type="button"
                    onClick={() => alert('Password reset SMS will be sent to your registered MTN or Airtel phone number.')}
                    className="text-blue-500 hover:text-blue-400 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                {passwordTouched && password.length < 4 && (
                  <p className="text-[11px] text-[#E51E2B] mt-1 ml-1 font-semibold">
                    Password must be at least 4 characters
                  </p>
                )}
              </div>

              {/* Big Green LOGIN Button (as in gdg.PNG) */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#19a53b] hover:bg-[#158f33] text-white font-extrabold text-sm uppercase rounded shadow transition-colors active:scale-[0.99] mt-2"
              >
                LOGIN
              </button>

              {/* Switch to Register link */}
              <div className="text-center pt-2">
                <span className="text-xs text-gray-400">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('register');
                    setPhoneTouched(false);
                    setPasswordTouched(false);
                  }}
                  className="text-xs text-blue-500 hover:text-blue-400 font-bold ml-1"
                >
                  Join Now
                </button>
              </div>

              {/* Quick Admin test access */}
              <div className="pt-4 border-t border-[#252525] flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    login('admin@winner.rw', 'admin');
                    setAuthModalOpen(false);
                  }}
                  className="text-[11px] text-[#E51E2B] hover:underline font-bold"
                >
                  ⚙️ Quick Login as Sportsbook Admin
                </button>
              </div>
            </form>
          ) : (
            /* =================== REGISTER FORM (jhgf.PNG) =================== */
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Phone Input with +250 */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#202020] border border-[#383838] rounded text-xs text-gray-200 shrink-0">
                    <span className="text-sm">🇷🇼</span>
                    <span className="font-bold">+250</span>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => setPhoneTouched(true)}
                      placeholder="Phone*"
                      className="w-full px-3 py-2 bg-[#202020] border border-[#383838] rounded text-white text-xs font-mono focus:border-[#E51E2B] focus:outline-none placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
                  Deposits accepted from Airtel and MTN only
                </p>
                {phoneTouched && !phone.trim() && (
                  <p className="text-[11px] text-[#E51E2B] mt-1 ml-1 font-semibold">
                    Phone number is required
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative flex items-center">
                  <div className="absolute left-3 text-gray-400 pointer-events-none">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    placeholder="Password*"
                    className="w-full pl-9 pr-9 py-2 bg-[#202020] border border-[#383838] rounded text-white text-xs focus:border-[#E51E2B] focus:outline-none placeholder:text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5 ml-1">
                  Min. 4 characters
                </p>
                {passwordTouched && (!password || password.length < 4) && (
                  <p className="text-[11px] text-[#E51E2B] mt-1 ml-1 font-semibold">
                    Password is required
                  </p>
                )}
              </div>

              {/* Promo Code Collapsible */}
              <div className="border border-[#282828] rounded p-2 bg-[#1b1b1b]">
                <button
                  type="button"
                  onClick={() => setPromoExpanded(!promoExpanded)}
                  className="w-full flex items-center justify-between text-xs text-gray-300 hover:text-white"
                >
                  <span>Have a Promo Code? (optional)</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${promoExpanded ? 'rotate-180' : ''}`} />
                </button>
                {promoExpanded && (
                  <div className="mt-2 pt-2 border-t border-[#333]">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="e.g. WINNER2000"
                      className="w-full px-3 py-1.5 bg-[#252525] border border-[#444] rounded text-xs uppercase font-mono text-white"
                    />
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-300 select-none">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded bg-[#222] border-[#444] text-[#E51E2B] focus:ring-0 accent-[#E51E2B]"
                />
                <span className="leading-snug">
                  I accept the <strong className="text-blue-400 underline">terms and conditions</strong> and confirm I am over 18 years old.
                </span>
              </label>

              {/* Cloudflare Captcha Box (Exact match to jhgf.PNG) */}
              <div className="border border-[#383838] bg-[#1a1a1a] rounded p-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => setCaptchaVerified(!captchaVerified)}
                    className="w-4 h-4 rounded border border-gray-400 bg-[#252525] flex items-center justify-center cursor-pointer"
                  >
                    {captchaVerified && <Check className="w-3 h-3 text-green-400 stroke-[3]" />}
                  </div>
                  <span className="text-[11px] text-gray-300">
                    {captchaVerified ? 'Verified human' : 'Verify you are human'}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-[10px] text-orange-400 tracking-wider uppercase">CLOUDFLARE</span>
                  <span className="text-[9px] text-gray-500">Privacy - Help</span>
                </div>
              </div>

              {/* JOIN NOW Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#E51E2B] hover:bg-[#c91824] text-white font-black text-sm uppercase rounded shadow-lg shadow-red-600/25 transition-transform active:scale-[0.99] mt-2"
              >
                JOIN NOW
              </button>

              {/* Switch to Login */}
              <div className="text-center pt-2">
                <span className="text-xs text-gray-400">Already Registered? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalMode('login');
                    setPhoneTouched(false);
                    setPasswordTouched(false);
                  }}
                  className="text-xs text-blue-500 hover:text-blue-400 font-bold ml-1"
                >
                  LOGIN
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Exact Footer from Screenshots */}
      <WinnerFooter />
    </div>
  );
};
