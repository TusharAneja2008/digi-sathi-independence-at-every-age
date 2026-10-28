import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext.js';
import {
  Settings,
  Languages,
  UserPlus,
  Sliders,
  Check,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Brain,
  Contrast,
} from 'lucide-react';
import { Language } from '../../types/accessibility.js';

export const SettingsScreen: React.FC = () => {
  const {
    settings,
    updateSettings,
    trustedContact,
    updateTrustedContact,
    setIsAccessibilityModalOpen,
    resetSettings,
    showFeedback,
  } = useAccessibility();

  const [name, setName] = useState(trustedContact.name);
  const [phone, setPhone] = useState(trustedContact.phone);
  const [relationship, setRelationship] = useState(trustedContact.relationship);

  const handleLanguageSelect = (lang: Language) => {
    updateSettings({ language: lang });
    showFeedback(
      lang === 'hi' ? 'भाषा बदलकर हिन्दी कर दी गई है।' : 'Language set to English.',
      'info'
    );
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      showFeedback('Please provide a phone number for your trusted contact.', 'warning');
      return;
    }
    updateTrustedContact({
      name: name.trim() || 'Trusted Contact',
      phone: phone.trim(),
      relationship: relationship.trim(),
    });
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-4xl mx-auto pb-28">
      {/* Header Banner (Matching Screenshot 3) */}
      <div
        className="p-6 sm:p-8 rounded-3xl border-2 shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-banner)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <div className="relative z-10 space-y-2">
          <span
            className="text-xs font-bold uppercase tracking-widest block opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            DIGISAATHI · INDEPENDENCE AT EVERY AGE
          </span>
          <h1
            className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            {settings.language === 'hi' ? 'सेटिंग्स' : 'Settings'}
          </h1>
          <p
            className="text-base sm:text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {settings.language === 'hi'
              ? 'विश्वास, सुरक्षा और रोजमर्रा की स्वतंत्रता के लिए बनाए गए विचारशील डिजिटल उपकरण।'
              : 'Thoughtful digital tools made for confidence, safety, and everyday independence.'}
          </p>
        </div>
      </div>

      {/* Card 1: Language Preference (Matching Screenshot 3) */}
      <div
        className="p-6 sm:p-8 rounded-3xl border-2 shadow-sm space-y-4"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
            {settings.language === 'hi' ? 'भाषा प्राथमिकता' : 'Language preference'}
          </h2>
          <p className="text-sm sm:text-base text-textMuted mt-1">
            {settings.language === 'hi' ? 'ऐप की भाषा चुनें' : 'Choose the app language'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleLanguageSelect('en')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 font-bold text-base transition-all ${
              settings.language === 'en'
                ? 'ring-2 ring-brandBrown border-brandBrown shadow-sm'
                : 'border-borderSubtle bg-app hover:border-borderStrong'
            }`}
            style={{
              backgroundColor: settings.language === 'en' ? 'var(--brand-brown-light)' : 'var(--bg-app)',
              color: 'var(--text-main)',
            }}
          >
            <Languages className="w-5 h-5" />
            <span>English</span>
            {settings.language === 'en' && <Check className="w-5 h-5 text-brandBrown ml-1" />}
          </button>

          <button
            onClick={() => handleLanguageSelect('hi')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 font-bold text-base transition-all ${
              settings.language === 'hi'
                ? 'ring-2 ring-brandBrown border-brandBrown shadow-sm'
                : 'border-borderSubtle bg-app hover:border-borderStrong'
            }`}
            style={{
              backgroundColor: settings.language === 'hi' ? 'var(--brand-brown-light)' : 'var(--bg-app)',
              color: 'var(--text-main)',
            }}
          >
            <Languages className="w-5 h-5" />
            <span>हिन्दी</span>
            {settings.language === 'hi' && <Check className="w-5 h-5 text-brandBrown ml-1" />}
          </button>
        </div>
      </div>

      {/* Card 2: Trusted Contact (Matching Screenshot 3) */}
      <form
        onSubmit={handleSaveContact}
        className="p-6 sm:p-8 rounded-3xl border-2 shadow-sm space-y-4"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
            {settings.language === 'hi' ? 'विश्वसनीय संपर्क' : 'Trusted contact'}
          </h2>
          <p className="text-sm sm:text-base text-textMuted mt-1">
            {settings.language === 'hi'
              ? 'आपात स्थिति में कॉल करने के लिए किसी परिजन को जोड़ें'
              : 'Add a person to call in an emergency'}
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-bold block" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'नाम' : 'Name'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contact name"
              className="w-full p-3.5 rounded-xl border-2 text-base outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--bg-app)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold block" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'फोन नंबर' : 'Phone number'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full p-3.5 rounded-xl border-2 text-base outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--bg-app)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold block" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'रिश्ता (वैकल्पिक)' : 'Relationship (optional)'}
            </label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g. Daughter, Brother"
              className="w-full p-3.5 rounded-xl border-2 text-base outline-none focus:ring-4"
              style={{
                backgroundColor: 'var(--bg-app)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl font-bold text-base shadow border-2 transition-all hover:scale-[1.01]"
            style={{
              backgroundColor: 'var(--brand-brown)',
              borderColor: 'var(--brand-brown-hover)',
              color: 'var(--brand-text)',
            }}
          >
            {settings.language === 'hi' ? 'संपर्क सुरक्षित करें' : 'Save contact'}
          </button>
        </div>
      </form>

      {/* Card 3: Accessibility Settings Center */}
      <div
        className="p-6 sm:p-8 rounded-3xl border-2 shadow-sm space-y-4"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              Accessibility Center
            </h2>
            <p className="text-sm sm:text-base text-textMuted mt-1">
              Configure Memory Support, Simple Mode, High Contrast, and Text Enlargement.
            </p>
          </div>
          <button
            onClick={() => setIsAccessibilityModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base border-2 shadow-sm transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--brand-brown-light)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-main)',
            }}
          >
            <Sliders className="w-5 h-5" />
            <span>Open All Settings</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => {
              const next = !settings.memorySupportMode;
              updateSettings({ memorySupportMode: next });
              showFeedback(`Memory Support Mode is now ${next ? 'ON' : 'OFF'}.`, 'info');
            }}
            className="p-4 rounded-2xl border-2 text-left font-bold transition-all"
            style={{
              backgroundColor: settings.memorySupportMode ? 'var(--brand-brown-light)' : 'var(--bg-app)',
              borderColor: settings.memorySupportMode ? 'var(--brand-brown)' : 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            <Brain className="w-6 h-6 mb-1 text-brandBrown" />
            <div className="text-sm">Memory Support</div>
            <div className="text-xs text-textMuted font-semibold">
              Status: {settings.memorySupportMode ? 'ON' : 'OFF'}
            </div>
          </button>

          <button
            onClick={() => {
              const next = !settings.simpleMode;
              updateSettings({ simpleMode: next });
              showFeedback(`Simple Mode is now ${next ? 'ON' : 'OFF'}.`, 'info');
            }}
            className="p-4 rounded-2xl border-2 text-left font-bold transition-all"
            style={{
              backgroundColor: settings.simpleMode ? 'var(--brand-brown-light)' : 'var(--bg-app)',
              borderColor: settings.simpleMode ? 'var(--brand-brown)' : 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            <Sparkles className="w-6 h-6 mb-1 text-brandBrown" />
            <div className="text-sm">Simple Mode</div>
            <div className="text-xs text-textMuted font-semibold">
              Status: {settings.simpleMode ? 'ON' : 'OFF'}
            </div>
          </button>

          <button
            onClick={() => {
              const next = !settings.highContrastMode;
              updateSettings({ highContrastMode: next });
              showFeedback(`High Contrast is now ${next ? 'ON' : 'OFF'}.`, 'info');
            }}
            className="p-4 rounded-2xl border-2 text-left font-bold transition-all"
            style={{
              backgroundColor: settings.highContrastMode ? 'var(--brand-brown-light)' : 'var(--bg-app)',
              borderColor: settings.highContrastMode ? 'var(--brand-brown)' : 'var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            <Contrast className="w-6 h-6 mb-1 text-brandBrown" />
            <div className="text-sm">High Contrast</div>
            <div className="text-xs text-textMuted font-semibold">
              Status: {settings.highContrastMode ? 'ON' : 'OFF'}
            </div>
          </button>
        </div>
      </div>

      {/* Footer Notice (Matching Screenshot 3) */}
      <div className="text-center py-4 space-y-3">
        <p className="text-sm text-textMuted flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-700 dark:text-green-400" />
          <span>
            {settings.language === 'hi'
              ? 'लॉगिन की आवश्यकता नहीं है। आपकी जानकारी केवल इस डिवाइस पर सुरक्षित है।'
              : 'No login required. Your information is stored on this device.'}
          </span>
        </p>

        <button
          onClick={resetSettings}
          className="text-xs font-bold underline text-textMuted hover:text-textMain p-1"
        >
          {settings.language === 'hi'
            ? 'सभी प्राथमिकताओं को रीसेट करें'
            : 'Reset Accessibility Preferences'}
        </button>
      </div>
    </div>
  );
};
