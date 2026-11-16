import React, { useState } from 'react';
import {
  Copy,
  Check,
  Download,
  RotateCcw,
  Sparkles,
  MapPin,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { BusinessFormData, GeneratedWebsiteContent, SectionKey } from '../types';
import { SECTIONS_METADATA } from '../constants/presets';
import { SectionCard } from './SectionCard';
import { regenerateSingleSection } from '../services/api';

interface ContentDashboardProps {
  businessData: BusinessFormData;
  content: GeneratedWebsiteContent;
  onUpdateSection: (key: SectionKey, newContent: string) => void;
  onReset: () => void;
}

export const ContentDashboard: React.FC<ContentDashboardProps> = ({
  businessData,
  content,
  onUpdateSection,
  onReset,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [regeneratingSection, setRegeneratingSection] = useState<SectionKey | null>(null);

  const handleCopyAll = async () => {
    const fullText = buildFormattedDocument(businessData, content);
    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch (err) {
      console.error('Failed to copy all content:', err);
    }
  };

  const handleDownload = () => {
    const fullText = buildFormattedDocument(businessData, content);
    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = businessData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.href = url;
    link.download = `${safeName || 'website'}-copy.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = async (sectionKey: SectionKey, sectionTitle: string) => {
    try {
      setRegeneratingSection(sectionKey);
      const newText = await regenerateSingleSection(
        sectionKey,
        sectionTitle,
        businessData,
        content[sectionKey],
        businessData.tone
      );
      onUpdateSection(sectionKey, newText);
    } catch (err: any) {
      alert(err.message || 'Failed to regenerate this section.');
    } finally {
      setRegeneratingSection(null);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Dashboard Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs uppercase font-bold tracking-wider mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>7 Sections Generated Successfully</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {businessData.businessName} Website Copy
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>{businessData.category}</span>
              </span>
              <span className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-indigo-300" />
                <span>{businessData.location}</span>
              </span>
              <span className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                <Sliders className="w-3.5 h-3.5 text-indigo-300" />
                <span>Tone: {businessData.tone}</span>
              </span>
            </div>
          </div>

          {/* Global Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyAll}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-sm transition-all ${
                copiedAll
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-900'
              }`}
            >
              {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? 'All Content Copied!' : 'Copy All Content'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 shadow-sm shadow-indigo-500/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download (.md)</span>
            </button>

            <button
              onClick={onReset}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-1.5 transition-colors border border-slate-700"
              title="Generate new copy from scratch"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Generate Again</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 7 Section Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SECTIONS_METADATA.map((meta) => {
          return (
            <SectionCard
              key={meta.key}
              meta={meta}
              content={content[meta.key]}
              onUpdateContent={(updated) => onUpdateSection(meta.key, updated)}
              onRegenerate={() => handleRegenerate(meta.key, meta.title)}
              isRegenerating={regeneratingSection === meta.key}
            />
          );
        })}
      </div>
    </div>
  );
};

function buildFormattedDocument(business: BusinessFormData, content: GeneratedWebsiteContent): string {
  return `# Website Copy for ${business.businessName}
**Category:** ${business.category}  
**Location:** ${business.location}  
**Writing Tone:** ${business.tone}  
**Generated On:** ${new Date().toLocaleDateString()} via FUTURE_PE_01 CopyCraft AI

---

## 1. Homepage Headline & Tagline
${content.homepageHeadline}

---

## 2. Homepage Introduction
${content.homepageIntro}

---

## 3. About Us & Our Mission
${content.aboutUs}

---

## 4. Our Services
${content.ourServices}

---

## 5. Why Choose Us
${content.whyChooseUs}

---

## 6. Call To Action (CTA)
${content.callToAction}

---

## 7. Contact & Visit Us
${content.contactSection}

---
*Generated using research-backed prompt engineering framework (FUTURE_PE_01).*
`;
}
