import React, { useState, useEffect } from 'react';
import {
  X,
  Key,
  Server,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import {
  getStoredApiKey,
  setStoredApiKey,
  getStoredBackendUrl,
  setStoredBackendUrl,
  checkBackendHealth,
  BackendStatus,
} from '../services/api';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (status: BackendStatus) => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  onStatusChange,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [backendUrl, setBackendUrl] = useState('');
  const [status, setStatus] = useState<BackendStatus>({
    online: false,
    geminiConfigured: false,
    message: 'Checking...',
  });
  const [isChecking, setIsChecking] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
      setBackendUrl(getStoredBackendUrl());
      runHealthCheck();
    }
  }, [isOpen]);

  const runHealthCheck = async () => {
    setIsChecking(true);
    const result = await checkBackendHealth();
    setStatus(result);
    onStatusChange(result);
    setIsChecking(false);
  };

  const handleSave = async () => {
    setStoredApiKey(apiKey);
    setStoredBackendUrl(backendUrl);
    setSavedSuccess(true);
    await runHealthCheck();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">AI Engine & Gemini Settings</h3>
            <p className="text-xs text-slate-700">Manage your copywriting connection</p>
          </div>
        </div>

        {/* Live Status Card */}
        <div className="p-4 rounded-2xl border mb-6 bg-emerald-50/80 border-emerald-200 text-emerald-900">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2.5">
              {status.geminiConfigured ? (
                <ShieldCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              ) : (
                <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
              )}
              <div>
                <p className="font-bold text-sm">
                  {status.geminiConfigured ? 'Live Gemini AI Connected' : 'CopyCraft AI Engine Ready'}
                </p>
                <p className="text-xs mt-0.5 opacity-90 leading-relaxed">
                  {status.geminiConfigured
                    ? 'Using live Google Gemini Flash model for dynamic copy generation.'
                    : 'Application is fully functional! You can enter a Gemini API key below anytime for live model responses.'}
                </p>
              </div>
            </div>
            <button
              onClick={runHealthCheck}
              disabled={isChecking}
              className="p-1.5 rounded-lg bg-white/70 hover:bg-white text-slate-700 text-xs shadow-sm"
              title="Refresh status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="space-y-5">
          {/* Option 1: Backend URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Backend Server URL
            </label>
            <div className="relative">
              <Server className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder="http://localhost:5000"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-700">
              Default is <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600">http://localhost:5000</code>.
            </p>
          </div>

          {/* Option 2: Direct Gemini API Key */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Google Gemini API Key (Optional)
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 font-semibold"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... (leave blank to use built-in engine)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-mono text-xs"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-700 leading-relaxed">
              Paste your key here to connect directly to Google Gemini. Stored only in your private browser memory.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all flex items-center space-x-1.5"
          >
            {savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save & Connect</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
