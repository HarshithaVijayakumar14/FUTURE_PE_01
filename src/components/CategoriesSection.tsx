import React from 'react';
import { HeartPulse, Utensils, Scissors, GraduationCap, ShoppingBag, Briefcase, ArrowRight } from 'lucide-react';
import { BusinessCategory, BusinessFormData } from '../types';
import { SWASTHYA_CARE_CLINIC_PRESET, OTHER_PRESETS } from '../constants/presets';

interface CategoriesSectionProps {
  onSelectCategoryPreset: (preset: BusinessFormData) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategoryPreset,
}) => {
  const categories: Array<{
    name: BusinessCategory;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    sampleBusiness: string;
    sampleLocation: string;
    presetData: BusinessFormData;
    tag: string;
  }> = [
    {
      name: 'Healthcare clinics',
      icon: HeartPulse,
      description: 'Family clinics, dental centers, diagnostics & wellness practices.',
      sampleBusiness: 'Swasthya Care Clinic',
      sampleLocation: 'Indiranagar, Bangalore',
      presetData: SWASTHYA_CARE_CLINIC_PRESET,
      tag: 'Featured Demo',
    },
    {
      name: 'Restaurants',
      icon: Utensils,
      description: 'Bistros, cafes, bakeries, cloud kitchens, and fine dining.',
      sampleBusiness: 'Spice & Soul Bistro',
      sampleLocation: 'Koramangala, Bangalore',
      presetData: OTHER_PRESETS.restaurant,
      tag: 'Hospitality',
    },
    {
      name: 'Beauty salons',
      icon: Scissors,
      description: 'Hair studios, luxury spas, nail lounges, and skincare clinics.',
      sampleBusiness: 'Luxe Glow Hair & Skin Studio',
      sampleLocation: 'Bandra West, Mumbai',
      presetData: OTHER_PRESETS.salon,
      tag: 'Lifestyle',
    },
    {
      name: 'Coaching centres',
      icon: GraduationCap,
      description: 'STEM academies, test prep, tuition centers, and coding bootcamps.',
      sampleBusiness: 'Apex STEM & Coding Academy',
      sampleLocation: 'Sector 62, Noida',
      presetData: OTHER_PRESETS.coaching,
      tag: 'Education',
    },
    {
      name: 'Retail shops',
      icon: ShoppingBag,
      description: 'Boutiques, organic stores, bookstores, and specialty local shops.',
      sampleBusiness: 'The Green Loom Organics',
      sampleLocation: 'Jubilee Hills, Hyderabad',
      presetData: OTHER_PRESETS.retail,
      tag: 'Retail & Commerce',
    },
    {
      name: 'Small businesses',
      icon: Briefcase,
      description: 'Accountants, legal consultants, repair shops, and local agencies.',
      sampleBusiness: 'NextGen Cloud Accounting',
      sampleLocation: 'Whitefield, Bangalore',
      presetData: OTHER_PRESETS.small_business,
      tag: 'Professional Services',
    },
  ];

  return (
    <section id="categories" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">Tailored Copywriting</span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Supported Business Categories
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Every category has distinct customer expectations, emotional triggers, and value propositions. Click any card to auto-load sample data.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isFeatured = cat.name === 'Healthcare clinics';

            return (
              <div
                key={cat.name}
                className={`bg-white rounded-2xl p-6 border transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${
                  isFeatured
                    ? 'border-indigo-400 ring-2 ring-indigo-500/20 shadow-md'
                    : 'border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isFeatured
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isFeatured
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{cat.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-700 mb-3">
                    <span className="font-semibold text-slate-700">Example:</span> {cat.sampleBusiness} ({cat.sampleLocation})
                  </div>
                  <button
                    onClick={() => onSelectCategoryPreset(cat.presetData)}
                    className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 hover:border-indigo-200 transition-colors"
                  >
                    <span>Use {cat.sampleBusiness}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
