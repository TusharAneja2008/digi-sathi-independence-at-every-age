import React from 'react';
import { AccessibilityProvider, useAccessibility } from './contexts/AccessibilityContext.js';
import { Header } from './components/Header.js';
import { BottomNav } from './components/BottomNav.js';
import { AccessibilityModal } from './components/AccessibilityModal.js';
import { FeedbackToast } from './components/FeedbackToast.js';

import { AssistantScreen } from './components/features/AssistantScreen.js';
import { DigitalGuideScreen } from './components/features/DigitalGuideScreen.js';
import { MemorySupportScreen } from './components/features/MemorySupportScreen.js';
import { PersonalNotesScreen } from './components/features/PersonalNotesScreen.js';
import { EmergencyScreen } from './components/features/EmergencyScreen.js';
import { SettingsScreen } from './components/features/SettingsScreen.js';
import { SimpleModeHome } from './components/features/SimpleModeHome.js';

import { HeartHandshake, ShieldCheck, Sliders, Sparkles } from 'lucide-react';

const DigiSaathiApp: React.FC = () => {
  const { activeTab, setActiveTab, settings, setIsAccessibilityModalOpen } = useAccessibility();

  const renderActiveScreen = () => {
    // If simple mode is ON and user is on assistant tab, show distraction-free SimpleModeHome
    if (settings.simpleMode && activeTab === 'assistant') {
      return <SimpleModeHome />;
    }

    switch (activeTab) {
      case 'assistant':
        return <AssistantScreen />;
      case 'guide':
        return <DigitalGuideScreen />;
      case 'memory':
        return <MemorySupportScreen />;
      case 'notes':
        return <PersonalNotesScreen />;
      case 'emergency':
        return <EmergencyScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <AssistantScreen />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-main)',
      }}
    >
      {/* Toast Alert Feedback */}
      <FeedbackToast />

      {/* Central Top Navigation Header */}
      <Header />

      {/* Main Tab Navigation */}
      <BottomNav />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderActiveScreen()}
      </main>

      {/* Central Accessibility Settings Modal */}
      <AccessibilityModal />

      {/* Respectful, Accessible Footer */}
      <footer
        className="w-full border-t py-8 px-4 sm:px-6 lg:px-8 mt-auto mb-16 md:mb-0 transition-colors"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'var(--brand-brown)',
                color: 'var(--brand-text)',
              }}
            >
              <HeartHandshake className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-serif font-bold text-base" style={{ color: 'var(--text-main)' }}>
                DigiSaathi
              </p>
              <p className="text-xs text-textMuted">
                {settings.language === 'hi'
                  ? 'हर उम्र में स्वतंत्रता और आत्मसम्मान के लिए'
                  : 'Empowering seniors with independence at every age'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-textMuted">
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="flex items-center gap-1.5 hover:text-textMain underline p-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Accessibility Settings</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
              <span>WCAG 2.2 AA Compliant</span>
            </span>
            <span>•</span>
            <span>Local &amp; Private Storage</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <DigiSaathiApp />
    </AccessibilityProvider>
  );
};

export default App;
