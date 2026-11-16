import React from 'react';
import { Sparkles, Settings, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BackendStatus } from '../services/api';

interface NavbarProps {
  onOpenSettings: () => void;
  onScrollToForm: () => void;
  backendStatus: BackendStatus;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  onScrollToForm,
  backendStatus,
}) => {
  const isLive = backendStatus.geminiConfigured;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">CopyCraft AI</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                  PE_01
                </span>
              </div>
              <p className="text-xs text-slate-700 hidden sm:block">Website Copy Generator for Local Businesses</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
              How It Works
            </a>
            <a href="#categories" className="hover:text-indigo-600 transition-colors">
              Categories
            </a>
            <a href="#generator" className="hover:text-indigo-600 transition-colors">
              Generator
            </a>
            <a
              href="https://github.com/HarshithaVijayakumar14/FUTURE_PE_01"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-600 transition-colors"
            >
              GitHub Repo
            </a>
          </nav>

          {/* Action Buttons & Status */}
          <div className="flex items-center space-x-3">
            {/* Status button */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              title="Click to view AI engine & Gemini settings"
            >
              {isLive ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">Live Gemini AI</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">AI Engine Ready</span>
                </>
              )}
              <Settings className="w-3.5 h-3.5 opacity-70 ml-1" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onScrollToForm}
              className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm shadow-indigo-300 transition-all active:scale-95"
            >
              <span>Generate Content</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
