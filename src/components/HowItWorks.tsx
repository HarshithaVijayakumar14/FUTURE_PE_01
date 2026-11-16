import React from 'react';
import { FileEdit, Sliders, Cpu, CopyCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: FileEdit,
      title: 'Enter Business Information',
      description: 'Provide your business name, location, customer audience, and the services you provide.',
    },
    {
      number: '02',
      icon: Sliders,
      title: 'Pick Tone & Category',
      description: 'Select from 6 supported categories and 5 proven writing tones (Professional, Friendly, Persuasive, etc.).',
    },
    {
      number: '03',
      icon: Cpu,
      title: 'AI Generates 7 Sections',
      description: 'Gemini utilizes our prompt engineering framework to produce conversion-focused copy for your whole site.',
    },
    {
      number: '04',
      icon: CopyCheck,
      title: 'Edit, Copy or Download',
      description: 'Refine any section inline, regenerate variations, or export everything to clean Markdown.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-indigo-600 tracking-wider">Simple & Fast Workflow</span>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Turn raw business notes into a high-converting website in four simple steps without hiring expensive content agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50/80 rounded-2xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-indigo-200 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
