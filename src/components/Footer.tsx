import React from 'react';
import { Sparkles, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">CopyCraft AI</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-indigo-900/60 text-indigo-300 rounded border border-indigo-700/50">
                FUTURE_PE_01
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering local businesses with clear, conversion-oriented website copy using Google Gemini and structured prompt engineering.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <a
                href="https://github.com/HarshithaVijayakumar14/FUTURE_PE_01"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Business Niches */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-3">
              Supported Niches
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Healthcare & Family Clinics</li>
              <li>Restaurants & Cafes</li>
              <li>Salons & Spas</li>
              <li>Coaching & Academies</li>
              <li>Retail & Boutiques</li>
              <li>Professional Small Businesses</li>
            </ul>
          </div>

          {/* Research & Documentation */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-3">
              Research & Framework
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Swasthya Care Clinic Benchmark</li>
              <li>7-Section Conversion Architecture</li>
              <li>Anti-Hallucination Guardrails</li>
              <li>Multi-Tone Adaptation Engine</li>
              <li>Google Gemini GenAI Integration</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FUTURE_PE_01 • Created by Harshitha Vijayakumar</p>
          <p className="flex items-center space-x-1">
            <span>Built with React, TypeScript, Tailwind CSS &</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Local Businesses</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
