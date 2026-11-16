import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Building2, HeartPulse, ShieldCheck, Zap } from 'lucide-react';

interface HeroSectionProps {
  onScrollToForm: () => void;
  onLoadSwasthyaDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToForm,
  onLoadSwasthyaDemo,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 border-b border-slate-200">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-200/40 to-violet-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Research-Backed AI Prompt Framework • FUTURE_PE_01</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Create Professional Website Content in{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 bg-clip-text text-transparent">
            Minutes with AI.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Generate engaging, professional and customized website content for your business using artificial intelligence.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToForm}
            className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-300 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 text-base"
          >
            <span>Generate Website Content</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onLoadSwasthyaDemo}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-300 shadow-sm transition-all hover:border-indigo-300 flex items-center justify-center space-x-2 text-base"
          >
            <HeartPulse className="w-4 h-4 text-rose-500" />
            <span>Load Demo (Swasthya Clinic)</span>
          </button>
        </div>

        {/* Value Highlights */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/60 border border-slate-200/60 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">7 Core Sections</h4>
              <p className="text-xs text-slate-700">Headline to CTA & Contact</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/60 border border-slate-200/60 shadow-sm">
            <Building2 className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">6 Local Niches</h4>
              <p className="text-xs text-slate-700">Healthcare to Salons & Retail</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/60 border border-slate-200/60 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">No Hallucinations</h4>
              <p className="text-xs text-slate-700">Zero fake numbers or claims</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/60 border border-slate-200/60 shadow-sm">
            <Zap className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-800">Google Gemini</h4>
              <p className="text-xs text-slate-700">Powered by official GenAI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
