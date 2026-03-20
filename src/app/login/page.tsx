"use client"

import { LogIn, Github, Mail } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>

      {/* Login Card */}
      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 p-10 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <div className="h-14 w-14 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 mb-6">
              <LogIn className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight text-center antialiased uppercase">AdminFlow</h1>
            <p className="mt-2 text-slate-400 font-medium text-sm tracking-wide text-center uppercase">Experience the next generation of SaaS management.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn("github")}
              className="w-full h-14 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] shadow-xl antialiased uppercase tracking-widest text-xs"
            >
              <Github className="mr-3 h-5 w-5" />
              Continue with GitHub
            </button>

            <button
              className="w-full h-14 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 text-slate-300 font-bold rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] shadow-xl antialiased uppercase tracking-widest text-xs"
            >
              <Mail className="mr-3 h-5 w-5 text-sky-400" />
              Continue with Email
            </button>
          </div>

          <div className="mt-12 text-center border-t border-slate-800/60 pt-8">
            <p className="text-slate-500 text-xs font-medium tracking-widest uppercase antialiased">
              By continuing, you agree to our <a href="#" className="text-sky-400 hover:text-sky-300 transition-colors">Terms of Service</a> and <a href="#" className="text-sky-400 hover:text-sky-300 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
