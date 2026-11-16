import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  Edit3,
  Save,
  X,
  Sparkles,
  BookOpen,
  Users,
  Briefcase,
  CheckCircle,
  MousePointerClick,
  MapPin,
  Loader2,
} from 'lucide-react';
import { SectionMeta } from '../types';

interface SectionCardProps {
  meta: SectionMeta;
  content: string;
  onUpdateContent: (newContent: string) => void;
  onRegenerate: () => Promise<void>;
  isRegenerating: boolean;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  BookOpen,
  Users,
  Briefcase,
  CheckCircle,
  MousePointerClick,
  MapPin,
};

export const SectionCard: React.FC<SectionCardProps> = ({
  meta,
  content,
  onUpdateContent,
  onRegenerate,
  isRegenerating,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [copied, setCopied] = useState(false);

  // Sync editValue when content changes externally
  React.useEffect(() => {
    setEditValue(content);
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSave = () => {
    onUpdateContent(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  const IconComponent = ICON_MAP[meta.iconName] || Sparkles;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between">
      {/* Card Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-indigo-50/30 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm shrink-0">
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {meta.title}
            </h3>
            <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 mt-0.5">
              {meta.badge}
            </span>
          </div>
        </div>

        {/* Action Buttons for Card */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Edit / Save Button */}
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-sm transition-colors"
                title="Save changes"
              >
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs transition-colors"
                title="Cancel editing"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium transition-colors"
              title="Edit this section"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg text-xs font-medium border transition-all ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
            }`}
            title="Copy this section"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Regenerate Button */}
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="p-2 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-slate-200 hover:border-indigo-200 text-xs font-medium transition-colors disabled:opacity-50"
            title="Regenerate this section with Gemini AI"
          >
            {isRegenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
            ) : (
              <RotateCw className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1">
        {isEditing ? (
          <div>
            <textarea
              rows={8}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-3 rounded-xl border border-indigo-300 text-sm text-slate-900 bg-indigo-50/10 focus:outline-none focus:ring-2 focus:ring-indigo-200 leading-relaxed font-sans"
              placeholder="Edit section copy..."
            />
            <p className="mt-1.5 text-[11px] text-slate-700">
              Tip: Click &quot;Save&quot; above to lock your edits before downloading.
            </p>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-[15px]">
            {content || (
              <span className="text-slate-400 italic">No content generated yet.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
