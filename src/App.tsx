import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { CategoriesSection } from './components/CategoriesSection';
import { BusinessForm } from './components/BusinessForm';
import { ContentDashboard } from './components/ContentDashboard';
import { ConfigModal } from './components/ConfigModal';
import { Footer } from './components/Footer';
import { BusinessFormData, GeneratedWebsiteContent, SectionKey } from './types';
import { SWASTHYA_CARE_CLINIC_PRESET } from './constants/presets';
import { checkBackendHealth, generateWebsiteContent, BackendStatus } from './services/api';

export function App() {
  const [formData, setFormData] = useState<BusinessFormData>(SWASTHYA_CARE_CLINIC_PRESET);
  const [generatedContent, setGeneratedContent] = useState<GeneratedWebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    online: false,
    geminiConfigured: false,
    message: 'Checking backend status...',
  });

  const formSectionRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial backend health check
    checkBackendHealth().then((status) => {
      setBackendStatus(status);
    });
  }, []);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadSwasthyaDemo = () => {
    setFormData(SWASTHYA_CARE_CLINIC_PRESET);
    setErrorMessage(null);
    scrollToForm();
  };

  const handleSelectCategoryPreset = (preset: BusinessFormData) => {
    setFormData(preset);
    setErrorMessage(null);
    scrollToForm();
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const content = await generateWebsiteContent(formData);
      setGeneratedContent(content);
      setTimeout(() => {
        scrollToDashboard();
      }, 100);
    } catch (err: any) {
      console.error('Generation error:', err);
      const msg = err.message || 'Failed to generate website content.';
      setErrorMessage(msg);
      // If error indicates missing API key, suggest opening config
      if (
        msg.toLowerCase().includes('api key') ||
        msg.toLowerCase().includes('400') ||
        msg.toLowerCase().includes('configured')
      ) {
        setIsConfigOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSection = (key: SectionKey, newContent: string) => {
    if (!generatedContent) return;
    setGeneratedContent({
      ...generatedContent,
      [key]: newContent,
    });
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setErrorMessage(null);
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        onOpenSettings={() => setIsConfigOpen(true)}
        onScrollToForm={scrollToForm}
        backendStatus={backendStatus}
      />

      <main className="flex-1">
        <HeroSection
          onScrollToForm={scrollToForm}
          onLoadSwasthyaDemo={handleLoadSwasthyaDemo}
        />

        <HowItWorks />

        <CategoriesSection onSelectCategoryPreset={handleSelectCategoryPreset} />

        {/* Generator Container */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-indigo-50/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div ref={formSectionRef}>
              <BusinessForm
                formData={formData}
                onChange={setFormData}
                onSubmit={handleGenerate}
                isLoading={isLoading}
                errorMessage={errorMessage}
              />
            </div>

            {generatedContent && (
              <div ref={dashboardRef} className="pt-8">
                <ContentDashboard
                  businessData={formData}
                  content={generatedContent}
                  onUpdateSection={handleUpdateSection}
                  onReset={handleReset}
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onStatusChange={setBackendStatus}
      />
    </div>
  );
}

export default App;
