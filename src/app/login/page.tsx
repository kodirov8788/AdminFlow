"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { LogIn, Mail, ArrowRight, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await signIn("resend", { email, callbackUrl: "/" });
      setIsSent(true);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>

      {/* Login Card */}
      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-10 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="h-16 w-16 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 mb-8 transform hover:rotate-3 transition-transform">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter text-center antialiased">ADMINFLOW</h1>
            <p className="mt-3 text-slate-400 font-medium text-xs tracking-[0.2em] text-center uppercase">Experience the next generation of SaaS management.</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-sky-400 transition-colors ml-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-14 bg-slate-950/50 border border-slate-700/50 rounded-2xl pl-14 pr-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 text-white placeholder-slate-600 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-xl disabled:opacity-50 group antialiased"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="uppercase tracking-[0.1em] text-xs">Send Magic Link</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-6 w-6 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mx-auto">
                We've sent a magic link to <span className="text-white font-semibold">{email}</span>. Click the link to log in.
              </p>
            </div>
          )}

          <div className="mt-12 text-center border-t border-slate-800/60 pt-8">
            <p className="text-slate-500 text-[10px] font-medium tracking-[0.15em] uppercase antialiased leading-relaxed">
              By continuing, you agree to our <br />
              <a href="#" className="text-sky-400 hover:text-sky-300 transition-colors">Terms of Service</a> & <a href="#" className="text-sky-400 hover:text-sky-300 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
