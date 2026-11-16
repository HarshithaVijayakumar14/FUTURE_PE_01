import React, { useState } from 'react';
import {
  Sparkles,
  Building2,
  MapPin,
  Users,
  Briefcase,
  HelpCircle,
  RotateCcw,
  AlertCircle,
  Loader2,
  HeartPulse,
} from 'lucide-react';
import { BusinessCategory, BusinessFormData, WritingTone } from '../types';
import { SWASTHYA_CARE_CLINIC_PRESET, OTHER_PRESETS } from '../constants/presets';

interface BusinessFormProps {
  formData: BusinessFormData;
  onChange: (updated: BusinessFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const CATEGORIES: BusinessCategory[] = [
  'Healthcare clinics',
  'Restaurants',
  'Beauty salons',
  'Coaching centres',
  'Retail shops',
  'Small businesses',
];

const TONES: WritingTone[] = [
  'Professional',
  'Friendly',
  'Conversational',
  'Simple English',
  'Persuasive',
];

export const BusinessForm: React.FC<BusinessFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  errorMessage,
}) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.businessName.trim()) {
      errors.businessName = 'Business Name is required.';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location (e.g. Indiranagar, Bangalore) is required.';
    }
    if (!formData.description.trim()) {
      errors.description = 'Please provide a short description or mission of your business.';
    } else if (formData.description.trim().length < 20) {
      errors.description = 'Description should be at least 20 characters for best AI quality.';
    }
    if (!formData.servicesOffered.trim()) {
      errors.servicesOffered = 'Please list at least 1-2 services you offer.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit();
    }
  };

  const handleFieldChange = (field: keyof BusinessFormData, value: string) => {
    onChange({
      ...formData,
      [field]: value,
    });
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const resetForm = () => {
    onChange({
      businessName: '',
      category: 'Healthcare clinics',
      location: '',
      description: '',
      targetAudience: '',
      servicesOffered: '',
      tone: 'Professional',
    });
    setValidationErrors({});
  };

  return (
    <div id="generator" className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-300 text-xs uppercase font-bold tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Step 1 & 2: Input Details & Tone</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Business Information Form
            </h2>
            <p className="mt-1 text-slate-300 text-sm max-w-xl">
              Fill in your business specifics below. The AI will weave this exact context into high-impact copy.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onChange(SWASTHYA_CARE_CLINIC_PRESET);
                setValidationErrors({});
              }}
              className="px-3.5 py-2 bg-indigo-600/90 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
              title="Load Swasthya Care Clinic from previous research"
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-300" />
              <span>Load Swasthya Clinic Demo</span>
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition-colors"
              title="Clear form"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category presets pills */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 shrink-0 font-medium">Quick Presets:</span>
          <button
            type="button"
            onClick={() => onChange(OTHER_PRESETS.restaurant)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
          >
            🍽️ Restaurant
          </button>
          <button
            type="button"
            onClick={() => onChange(OTHER_PRESETS.salon)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
          >
            💇 Salon
          </button>
          <button
            type="button"
            onClick={() => onChange(OTHER_PRESETS.coaching)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
          >
            📚 Coaching
          </button>
          <button
            type="button"
            onClick={() => onChange(OTHER_PRESETS.retail)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
          >
            🛍️ Retail
          </button>
          <button
            type="button"
            onClick={() => onChange(OTHER_PRESETS.small_business)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 shrink-0 transition-colors"
          >
            💼 Accounting
          </button>
        </div>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 text-sm">
            <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">Generation Failed</p>
              <p className="mt-0.5 text-rose-700">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Business Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleFieldChange('businessName', e.target.value)}
                placeholder="e.g. Swasthya Care Clinic"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  validationErrors.businessName
                    ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
            </div>
            {validationErrors.businessName && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{validationErrors.businessName}</p>
            )}
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Business Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleFieldChange('category', e.target.value as BusinessCategory)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Business Location <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleFieldChange('location', e.target.value)}
                placeholder="e.g. Indiranagar, Bangalore"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  validationErrors.location
                    ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
            </div>
            {validationErrors.location && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{validationErrors.location}</p>
            )}
          </div>

          {/* Preferred Writing Tone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Writing Tone <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.tone}
              onChange={(e) => handleFieldChange('tone', e.target.value as WritingTone)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t} ({getToneExplanation(t)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Business Description */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Business Description & Unique Strengths <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            placeholder="Tell us what makes your business unique, what problems you solve for clients, and your founding values..."
            className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              validationErrors.description
                ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
            }`}
          />
          {validationErrors.description && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{validationErrors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Audience */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Target Audience
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => handleFieldChange('targetAudience', e.target.value)}
                placeholder="e.g. Families, working professionals, senior citizens"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>
          </div>

          {/* Services Offered */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Services Offered <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={formData.servicesOffered}
                onChange={(e) => handleFieldChange('servicesOffered', e.target.value)}
                placeholder="e.g. Consultations, In-house lab tests, Health packages"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  validationErrors.servicesOffered
                    ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/30'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
            </div>
            {validationErrors.servicesOffered && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{validationErrors.servicesOffered}</p>
            )}
          </div>
        </div>

        {/* Security & Anti-Hallucination Notice */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2.5 text-xs text-slate-600">
          <HelpCircle className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>
            <strong>Anti-Hallucination Engine:</strong> The AI will never invent phone numbers, street addresses, fake certifications, or unsupported claims.
          </span>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-700 hover:to-violet-800 text-white font-bold rounded-2xl shadow-lg shadow-indigo-300/60 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center space-x-2 text-base"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Crafting 7 Website Sections with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span>Generate Website Content Now</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

function getToneExplanation(tone: WritingTone): string {
  switch (tone) {
    case 'Professional':
      return 'Credible, structured & reliable';
    case 'Friendly':
      return 'Warm, caring & approachable';
    case 'Conversational':
      return 'Relatable, energetic & neighborly';
    case 'Simple English':
      return 'Short words, clear for anyone';
    case 'Persuasive':
      return 'Benefit-heavy & action-oriented';
  }
}
