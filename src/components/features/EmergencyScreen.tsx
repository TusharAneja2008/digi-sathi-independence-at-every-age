import React from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext.js';
import {
  PhoneCall,
  Shield,
  HeartPulse,
  UserCheck,
  AlertTriangle,
  Volume2,
  ExternalLink,
} from 'lucide-react';

export const EmergencyScreen: React.FC = () => {
  const { settings, trustedContact, speakText, setActiveTab, showFeedback } = useAccessibility();

  const handleCall = (number: string, serviceName: string) => {
    showFeedback(`Opening phone dialer for ${serviceName} (${number})...`, 'info');
    window.location.href = `tel:${number.replace(/\s+/g, '')}`;
  };

  const handleReadNumbersAloud = () => {
    const text =
      settings.language === 'hi'
        ? 'आपातकालीन सहायता। भारत का एकीकृत आपातकालीन नंबर 112 है। एम्बुलेंस के लिए 108 या 102। पुलिस के लिए 100। आपका विश्वसनीय संपर्क ' +
          trustedContact.name +
          ' है।'
        : 'Emergency Help. India unified emergency number is 112 for ambulance, police, and fire. Tap any button to open your phone dialer.';
    speakText(text);
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-4xl mx-auto pb-28">
      {/* Header Banner (Matching Screenshot 4) */}
      <div
        className="p-6 sm:p-8 rounded-3xl border-2 shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-banner)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <div className="relative z-10 space-y-2">
          <div className="flex items-center justify-between">
            <span
              className="text-xs font-bold uppercase tracking-widest block opacity-80"
              style={{ color: 'var(--text-muted)' }}
            >
              DIGISAATHI · INDEPENDENCE AT EVERY AGE
            </span>
            <button
              onClick={handleReadNumbersAloud}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-borderSubtle bg-surface text-xs font-bold shadow-sm"
              style={{ color: 'var(--text-main)' }}
            >
              <Volume2 className="w-4 h-4 text-brandBrown" />
              <span>Read Aloud</span>
            </button>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
            style={{ color: 'var(--text-main)' }}
          >
            {settings.language === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Help'}
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

      {/* Primary Big Red 112 Card (Matching Screenshot 4) */}
      <button
        onClick={() => handleCall('112', 'National Emergency 112')}
        className="w-full p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center transition-all hover:scale-[1.01] active:scale-[0.99] border-4 border-red-700/60"
        style={{
          backgroundColor: 'var(--emergency-red)',
          color: '#FFFFFF',
        }}
        aria-label="Call 112, India's unified emergency number"
      >
        <div className="flex items-center gap-4 text-4xl sm:text-6xl font-black tracking-wider">
          <PhoneCall className="w-10 h-10 sm:w-14 h-14 animate-bounce" />
          <span>112</span>
        </div>
        <p className="mt-3 text-base sm:text-xl font-medium opacity-95">
          {settings.language === 'hi'
            ? 'भारत का एकीकृत आपातकालीन नंबर — एम्बुलेंस, पुलिस, अग्निशमन'
            : "India's unified emergency number — ambulance, police, fire"}
        </p>
        <span className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-widest bg-black/25 px-4 py-1.5 rounded-full">
          {settings.language === 'hi' ? 'कॉल करने के लिए यहाँ टैप करें' : 'Tap to open dialer'}
        </span>
      </button>

      {/* Helper text */}
      <p className="text-center text-sm font-medium text-textMuted px-2">
        {settings.language === 'hi'
          ? 'डायलर खोलने के लिए किसी बटन पर टैप करें, फिर पुष्टि करें। कोई भी कॉल अपने आप नहीं की जाती।'
          : 'Tap a button to open the dialer, then confirm. No call is placed automatically.'}
      </p>

      {/* Three Secondary Quick Emergency Cards (Matching Screenshot 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Ambulance */}
        <button
          onClick={() => handleCall('108', 'Ambulance')}
          className="p-6 rounded-3xl border-2 shadow-sm text-left flex flex-col items-center text-center justify-between gap-3 transition-all hover:scale-105"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center border border-red-200 dark:border-red-800">
            <HeartPulse className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'एम्बुलेंस' : 'Ambulance'}
            </h3>
            <p className="text-sm text-textMuted mt-0.5">
              {settings.language === 'hi' ? 'चिकित्सा आपातकाल (108)' : 'Medical emergency (108)'}
            </p>
          </div>
          <span className="text-xs font-bold text-red-700 dark:text-red-400 underline">
            Dial 108 →
          </span>
        </button>

        {/* Police */}
        <button
          onClick={() => handleCall('100', 'Police')}
          className="p-6 rounded-3xl border-2 shadow-sm text-left flex flex-col items-center text-center justify-between gap-3 transition-all hover:scale-105"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'पुलिस' : 'Police'}
            </h3>
            <p className="text-sm text-textMuted mt-0.5">
              {settings.language === 'hi' ? 'सुरक्षा या अपराध संकट (100)' : 'Crime or safety threat (100)'}
            </p>
          </div>
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 underline">
            Dial 100 →
          </span>
        </button>

        {/* Trusted Contact */}
        <div
          className="p-6 rounded-3xl border-2 shadow-sm text-left flex flex-col items-center text-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-800">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--text-main)' }}>
              {settings.language === 'hi' ? 'विश्वसनीय संपर्क' : 'Trusted Contact'}
            </h3>
            <p className="text-sm text-textMuted mt-0.5">
              {trustedContact.name ? trustedContact.name : 'Call someone you trust'}
            </p>
          </div>
          {trustedContact.phone ? (
            <button
              onClick={() => handleCall(trustedContact.phone, trustedContact.name || 'Trusted Contact')}
              className="text-xs font-bold text-brandBrown underline"
            >
              Call {trustedContact.phone} →
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('settings')}
              className="text-xs font-bold text-brandBrown underline"
            >
              {settings.language === 'hi' ? 'सेटिंग्स में संपर्क जोड़ें' : 'Add contact in Settings'}
            </button>
          )}
        </div>
      </div>

      {/* Safety Disclaimer Box with Warning Icon (Matching Screenshot 4) */}
      <div
        className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl border-2 text-sm leading-relaxed"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-strong)',
          color: 'var(--text-main)',
        }}
        role="note"
      >
        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <span className="font-bold uppercase tracking-wider mr-1.5">[SAFETY NOTICE]</span>
          {settings.language === 'hi'
            ? 'यह ऐप खुद कॉल नहीं करता है और यह दावा नहीं करता है कि सेवाओं से संपर्क हो गया है। आपका फोन डायलर खुलेगा और आपको कॉल करनी होगी।'
            : 'This app does not place calls itself and does not claim services have been contacted. Your phone dialer will open and you must place the call.'}
        </p>
      </div>
    </div>
  );
};
