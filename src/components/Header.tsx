import React, { useState, useRef, useEffect } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext.js';
import {
  HeartHandshake,
  Volume2,
  VolumeX,
  RotateCcw,
  Sliders,
  ChevronDown,
  Sparkles,
  Contrast,
  Home,
  Check,
} from 'lucide-react';
import { Language, ThemeMode } from '../types/accessibility.js';

export const Header: React.FC = () => {
  const {
    settings,
    updateSettings,
    setIsAccessibilityModalOpen,
    activeTab,
    setActiveTab,
    isSpeaking,
    isPaused,
    pauseSpeech,
    resumeSpeech,
    stopSpeech,
    repeatSpeech,
    speakText,
    showFeedback,
  } = useAccessibility();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    updateSettings({ language: lang });
    setLangDropdownOpen(false);
    showFeedback(
      lang === 'hi' ? 'भाषा बदलकर हिन्दी कर दी गई है।' : 'Language set to English.',
      'info'
    );
  };

  const cycleTheme = () => {
    const themes: ThemeMode[] = ['original', 'hc-light', 'hc-dark'];
    const nextIdx = (themes.indexOf(settings.theme) + 1) % themes.length;
    const nextTheme = themes[nextIdx];
    updateSettings({
      theme: nextTheme,
      highContrastMode: nextTheme !== 'original',
    });
    const label =
      nextTheme === 'original'
        ? 'Original Brown Matte theme'
        : nextTheme === 'hc-light'
        ? 'High-Contrast Light theme'
        : 'High-Contrast Dark theme';
    showFeedback(`Theme changed to ${label}.`, 'info');
  };

  const toggleSimpleMode = () => {
    const next = !settings.simpleMode;
    updateSettings({ simpleMode: next });
    showFeedback(
      next
        ? 'Simple Mode turned ON. Visual clutter reduced.'
        : 'Simple Mode turned OFF. Standard view restored.',
      'info'
    );
  };

  const handleAudioButtonClick = () => {
    if (isSpeaking) {
      if (isPaused) {
        resumeSpeech();
      } else {
        pauseSpeech();
      }
    } else {
      // Speak current page context
      const intro =
        settings.language === 'hi'
          ? 'डिजीसाथी में आपका स्वागत है। हर उम्र में आत्मनिर्भरता।'
          : 'Welcome to DigiSaathi. Independence at every age. Tap any section to read instructions.';
      speakText(intro);
    }
  };

  return (
    <header
      className="sticky top-0 z-40 w-full transition-colors duration-200 border-b shadow-sm"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <button
            onClick={() => setActiveTab('assistant')}
            className="flex items-center gap-3 text-left group rounded-xl p-1.5 focus-visible:ring-4 transition-all"
            aria-label="DigiSaathi Home - Independence at Every Age"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 transition-transform group-hover:scale-105"
              style={{
                backgroundColor: 'var(--brand-brown)',
                color: 'var(--brand-text)',
              }}
            >
              <HeartHandshake className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-serif text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: 'var(--text-main)' }}
                >
                  DigiSaathi
                </span>
                {settings.simpleMode && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border"
                    style={{
                      backgroundColor: 'var(--brand-brown-light)',
                      color: 'var(--text-main)',
                      borderColor: 'var(--border-strong)',
                    }}
                  >
                    Simple Mode
                  </span>
                )}
              </div>
              <p
                className="text-xs sm:text-sm font-medium tracking-wide"
                style={{ color: 'var(--text-muted)' }}
              >
                {settings.language === 'hi'
                  ? 'हर उम्र में आत्मनिर्भरता'
                  : 'Independence at every age'}
              </p>
            </div>
          </button>

          {/* Accessibility & Quick Settings Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Primary Accessibility Settings Button */}
            <button
              onClick={() => setIsAccessibilityModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all border-2"
              style={{
                backgroundColor: 'var(--brand-brown-light)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-main)',
              }}
              aria-label="Open Central Accessibility Settings"
              title="Open Accessibility Settings (Memory, Simple, Contrast, Text Size)"
            >
              <Sliders className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="hidden md:inline">Accessibility Settings</span>
              <span className="md:hidden">Settings</span>
            </button>

            {/* Simple Mode Toggle Pill */}
            <button
              onClick={toggleSimpleMode}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all ${
                settings.simpleMode ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: settings.simpleMode
                  ? 'var(--brand-brown)'
                  : 'var(--bg-secondary)',
                color: settings.simpleMode
                  ? 'var(--brand-text)'
                  : 'var(--text-main)',
                borderColor: 'var(--border-strong)',
              }}
              aria-pressed={settings.simpleMode}
              title={
                settings.simpleMode
                  ? 'Simple Mode is ON. Click to return to standard view.'
                  : 'Click to turn ON Simple Mode.'
              }
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>
                Simple Mode: {settings.simpleMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Audio Read-Aloud / Pause / Repeat Button */}
            <div className="flex items-center bg-secondary rounded-xl border border-borderSubtle p-0.5">
              <button
                onClick={handleAudioButtonClick}
                className="p-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-sm font-semibold"
                style={{
                  backgroundColor: isSpeaking ? 'var(--brand-brown)' : 'transparent',
                  color: isSpeaking ? 'var(--brand-text)' : 'var(--text-main)',
                }}
                aria-label={
                  isSpeaking
                    ? isPaused
                      ? 'Resume reading instructions'
                      : 'Pause reading instructions'
                    : 'Read this page aloud'
                }
                title={
                  isSpeaking
                    ? isPaused
                      ? 'Click to Resume Audio'
                      : 'Click to Pause Audio'
                    : 'Click to Read Aloud'
                }
              >
                {isSpeaking ? (
                  isPaused ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  )
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
                <span className="hidden lg:inline">
                  {isSpeaking ? (isPaused ? 'Resume' : 'Pause') : 'Read to Me'}
                </span>
              </button>

              {isSpeaking && (
                <button
                  onClick={stopSpeech}
                  className="p-2.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Stop audio reading"
                  title="Stop Audio"
                >
                  <VolumeX className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={repeatSpeech}
                className="p-2.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold"
                style={{ color: 'var(--text-main)' }}
                aria-label="Repeat last instructions aloud"
                title="Repeat Instructions"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Theme / Contrast Quick Toggle */}
            <button
              onClick={cycleTheme}
              className="p-2.5 rounded-xl border border-borderSubtle transition-all hover:opacity-90"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-main)',
              }}
              aria-label={`Cycle theme: Current is ${settings.theme}`}
              title="Switch Theme (Original Brown / High-Contrast Light / High-Contrast Dark)"
            >
              <Contrast className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Language Dropdown (English / Hindi) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 px-3 py-2.5 rounded-xl border border-borderSubtle font-medium text-sm transition-all"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                }}
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Select website language"
              >
                <span>{settings.language === 'hi' ? 'हिन्दी' : 'English'}</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>

              {langDropdownOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-2 w-36 rounded-xl shadow-xl border-2 py-1.5 z-50 transition-all"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-strong)',
                  }}
                >
                  <button
                    role="option"
                    aria-selected={settings.language === 'en'}
                    onClick={() => handleLanguageChange('en')}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-secondary font-medium"
                    style={{ color: 'var(--text-main)' }}
                  >
                    <span>English</span>
                    {settings.language === 'en' && <Check className="w-4 h-4 text-brandBrown" />}
                  </button>
                  <button
                    role="option"
                    aria-selected={settings.language === 'hi'}
                    onClick={() => handleLanguageChange('hi')}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-left hover:bg-secondary font-medium"
                    style={{ color: 'var(--text-main)' }}
                  >
                    <span>हिन्दी</span>
                    {settings.language === 'hi' && <Check className="w-4 h-4 text-brandBrown" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
