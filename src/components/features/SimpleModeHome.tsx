import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext.js';
import {
  MessageSquareHeart,
  Brain,
  PhoneCall,
  StickyNote,
  Sliders,
  Sparkles,
  Volume2,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const SimpleModeHome: React.FC = () => {
  const { settings, updateSettings, setActiveTab, speakText, showFeedback } = useAccessibility();

  const handleAction = (tabId: 'assistant' | 'guide' | 'memory' | 'notes' | 'emergency') => {
    setActiveTab(tabId);
  };

  const handleReadAloud = () => {
    const text =
      settings.language === 'hi'
        ? 'सरल मोड। यहाँ आपकी मदद के लिए चार मुख्य विकल्प हैं: एआई सहायक, एक-एक कदम गाइड, आपातकालीन 112, और आपके नोट्स। किसी भी बड़े बटन को दबाएं।'
        : 'Simple Mode Home. Choose from four clear actions: Ask AI for Help, Follow Step-by-Step Guides, Call Emergency 112, or Open Your Notes. Tap any big button to continue.';
    speakText(text);
  };

  return (
    <div className="py-6 sm:py-10 space-y-8 max-w-3xl mx-auto pb-28">
      {/* Top Simple Mode Indicator & Switch-Back Bar */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border-2 gap-3"
        style={{
          backgroundColor: 'var(--brand-brown-light)',
          borderColor: 'var(--border-strong)',
          color: 'var(--text-main)',
        }}
      >
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
          <Sparkles className="w-5 h-5 text-brandBrown" />
          <span>
            {settings.language === 'hi'
              ? 'सरल मोड चालू है — स्क्रीन साफ और आसान है'
              : 'Simple Mode is ON — Clear and Easy View'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReadAloud}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-borderStrong bg-surface font-bold text-xs"
            aria-label="Read simple mode instructions aloud"
          >
            <Volume2 className="w-4 h-4 text-brandBrown" />
            <span>Read to Me</span>
          </button>

          <button
            onClick={() => {
              updateSettings({ simpleMode: false });
              showFeedback('Switched back to Standard Mode.', 'info');
            }}
            className="px-3.5 py-1.5 rounded-xl border border-borderStrong bg-surface hover:bg-secondary font-bold text-xs"
            aria-label="Switch back to standard interface"
          >
            {settings.language === 'hi' ? 'सामान्य दृश्य पर लौटें' : 'Standard View'}
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold" style={{ color: 'var(--text-main)' }}>
          {settings.language === 'hi' ? 'आज आप क्या करना चाहते हैं?' : 'How can we help you today?'}
        </h1>
        <p className="text-lg sm:text-xl text-textMuted">
          {settings.language === 'hi'
            ? 'नीचे दिए गए किसी भी बड़े बटन को दबाएं:'
            : 'Tap any large button below to begin:'}
        </p>
      </div>

      {/* FOUR GIANT ESSENTIAL ACTIONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Action 1: Ask for Help (Saathi AI) */}
        <button
          onClick={() => handleAction('assistant')}
          className="p-8 rounded-3xl border-3 shadow-md flex flex-col items-start justify-between gap-4 transition-all hover:scale-[1.02] text-left group"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
          aria-label="Ask a question or get help"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow"
            style={{
              backgroundColor: 'var(--brand-brown)',
              color: 'var(--brand-text)',
            }}
          >
            <MessageSquareHeart className="w-9 h-9" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? '1. सवाल पूछें या मदद लें' : '1. Ask for Help'}
            </h2>
            <p className="text-base text-textMuted mt-1 leading-snug">
              {settings.language === 'hi'
                ? 'अपने फोन, पासवर्ड या बिल के बारे में साथी से पूछें।'
                : 'Ask Saathi AI any question about phones, bills, or scams in simple words.'}
            </p>
          </div>
          <span className="text-sm font-bold text-brandBrown flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{settings.language === 'hi' ? 'खोलें' : 'Open Assistant'}</span>
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>

        {/* Action 2: Step-by-Step Task Guides (Memory Support Mode) */}
        <button
          onClick={() => handleAction('memory')}
          className="p-8 rounded-3xl border-3 shadow-md flex flex-col items-start justify-between gap-4 transition-all hover:scale-[1.02] text-left group"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
          aria-label="Follow step by step guides"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow"
            style={{
              backgroundColor: 'var(--brand-brown)',
              color: 'var(--brand-text)',
            }}
          >
            <Brain className="w-9 h-9" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? '2. एक-एक कदम गाइड' : '2. Step-by-Step Guides'}
            </h2>
            <p className="text-base text-textMuted mt-1 leading-snug">
              {settings.language === 'hi'
                ? 'बिजली का बिल, ट्रेन टिकट और ईमेल रीसेट बिना किसी जल्दबाज़ी के सीखें।'
                : 'Learn to pay bills, book trains, and reset passwords one step at a time.'}
            </p>
          </div>
          <span className="text-sm font-bold text-brandBrown flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{settings.language === 'hi' ? 'शुरू करें' : 'Start Guides'}</span>
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>

        {/* Action 3: Emergency Help 112 */}
        <button
          onClick={() => handleAction('emergency')}
          className="p-8 rounded-3xl border-3 shadow-md flex flex-col items-start justify-between gap-4 transition-all hover:scale-[1.02] text-left group border-red-400"
          style={{
            backgroundColor: 'var(--bg-surface)',
          }}
          aria-label="Call emergency number 112"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow text-white"
            style={{
              backgroundColor: 'var(--emergency-red)',
            }}
          >
            <PhoneCall className="w-9 h-9 animate-bounce" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-red-700 dark:text-red-400">
              {settings.language === 'hi' ? '3. आपातकालीन 112' : '3. Emergency 112'}
            </h2>
            <p className="text-base text-textMuted mt-1 leading-snug">
              {settings.language === 'hi'
                ? 'एम्बुलेंस, पुलिस या अपने भरोसेमंद परिजन को तुरंत फोन करें।'
                : 'Directly open your phone dialer for ambulance, police, or family.'}
            </p>
          </div>
          <span className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{settings.language === 'hi' ? 'आपातकालीन सहायता' : 'Open Emergency'}</span>
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>

        {/* Action 4: My Saved Notes */}
        <button
          onClick={() => handleAction('notes')}
          className="p-8 rounded-3xl border-3 shadow-md flex flex-col items-start justify-between gap-4 transition-all hover:scale-[1.02] text-left group"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
          aria-label="View or add personal notes"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow"
            style={{
              backgroundColor: 'var(--brand-brown)',
              color: 'var(--brand-text)',
            }}
          >
            <StickyNote className="w-9 h-9" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? '4. मेरे जरूरी नोट्स' : '4. My Saved Notes'}
            </h2>
            <p className="text-base text-textMuted mt-1 leading-snug">
              {settings.language === 'hi'
                ? 'दवाई का समय, डॉक्टर का पता और जरूरी नंबर सुरक्षित देखें।'
                : 'Keep your doctor appointments, medicine times, and account numbers safe.'}
            </p>
          </div>
          <span className="text-sm font-bold text-brandBrown flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{settings.language === 'hi' ? 'नोट्स देखें' : 'View Notes'}</span>
            <ArrowRight className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
};
