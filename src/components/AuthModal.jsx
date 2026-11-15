import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, User, CheckCircle2, ArrowRight, Sparkles, RefreshCw, Gift, Flame } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('1234');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const otpInputsRef = useRef([]);

  useEffect(() => {
    if (isAuthModalOpen) {
      setStep('phone');
      setName('');
      setPhone('');
      setOtp(['', '', '', '']);
      setError('');
      setIsLoading(false);
    }
  }, [isAuthModalOpen]);

  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const demoCode = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(demoCode);
      setIsLoading(false);
      setStep('otp');
      setTimer(30);
      setOtp(['', '', '', '']);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setError('Please enter the 4-digit verification code');
      return;
    }

    if (enteredOtp !== generatedOtp && enteredOtp !== '1234') {
      setError(`Invalid OTP. Please enter code: ${generatedOtp}`);
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('success');

      const userData = {
        name: name.trim(),
        phone: phone.trim(),
        hasMemberDiscount: true,
        joinedAt: new Date().toISOString()
      };

      setTimeout(() => {
        login(userData);
      }, 900);
    }, 500);
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    const demoCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(demoCode);
    setTimer(30);
    setError('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-black border border-white/15 rounded-md p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-8 h-8 rounded bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors border border-white/10"
          >
            <X size={16} />
          </button>

          {/* STEP 1: Phone & Name Input */}
          {step === 'phone' && (
            <div className="space-y-5">
              {/* Enticing Sign In Offer Banner */}
              <div className="p-3 bg-[#B30000]/15 border border-[#B30000]/40 rounded-sm space-y-1">
                <div className="flex items-center gap-2 text-[#B30000] font-black text-xs uppercase tracking-wider">
                  <Gift size={16} />
                  <span>Exclusive Member Offer</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-snug">
                  Sign in or create your account to unlock instant ordering, <strong className="text-white">Free Delivery</strong> on selected meals & special member pricing!
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Sign In to Place Order
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Enter your mobile number to verify with an instant OTP.
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Your Full Name <span className="text-[#B30000]">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-black border border-white/20 rounded pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B30000] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Mobile Phone Number <span className="text-[#B30000]">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full bg-black border border-white/20 rounded pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B30000] transition-colors"
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-[#B30000] font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-none bg-[#B30000] hover:bg-[#8A0000] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#B30000]/30 cursor-pointer disabled:opacity-50"
                >
                  <span>{isLoading ? 'Sending SMS OTP...' : 'Get OTP & Unlock Offers'}</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 'otp' && (
            <div className="space-y-5">
              <div>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-neutral-400 hover:text-white transition-colors mb-2 inline-block"
                >
                  ← Edit Phone Number
                </button>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Verify Your Number
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  We sent a 4-digit code to <span className="text-white font-semibold">{phone}</span>.
                </p>

                {/* Simulated SMS notification bubble */}
                <div className="mt-3 p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-neutral-300">
                    Simulated SMS: Your OTP code is <strong className="text-[#829B32]">{generatedOtp}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setOtp(generatedOtp.split(''))}
                    className="text-[#B30000] hover:underline text-[11px] font-bold"
                  >
                    Auto-Fill
                  </button>
                </div>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="flex justify-center gap-3 my-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpInputsRef.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-12 h-14 text-center text-xl font-black bg-black border-2 border-white/20 rounded-none focus:border-[#B30000] focus:outline-none text-white transition-colors"
                    />
                  ))}
                </div>

                {error && <p className="text-xs text-[#B30000] font-medium text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-none bg-[#B30000] hover:bg-[#8A0000] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all transform active:scale-95 shadow-md shadow-[#B30000]/30 cursor-pointer disabled:opacity-50"
                >
                  <span>{isLoading ? 'Verifying...' : 'Verify & Continue Ordering'}</span>
                  <CheckCircle2 size={16} />
                </button>

                <div className="text-center pt-2">
                  {timer > 0 ? (
                    <p className="text-xs text-neutral-400">
                      Resend code in <span className="text-white font-bold">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-xs text-[#B30000] hover:underline font-bold inline-flex items-center gap-1"
                    >
                      <RefreshCw size={12} /> Resend OTP Code
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Success Screen */}
          {step === 'success' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#829B32]/20 border border-[#829B32]/40 text-[#829B32] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Account Verified!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-xs mx-auto">
                Welcome, <span className="text-white font-bold">{name}</span>. Member offers unlocked. You can now complete your order!
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
