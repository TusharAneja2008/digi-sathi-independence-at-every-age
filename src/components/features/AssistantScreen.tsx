import React, { useState } from 'react';
import { useAccessibility } from '../../contexts/AccessibilityContext.js';
import {
  Sparkles,
  Send,
  Volume2,
  Brain,
  Info,
  Mic,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { SAMPLE_ANSWERS, AssistantAnswer } from '../../services/sampleQnA.js';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  answerData?: AssistantAnswer;
}

export const AssistantScreen: React.FC = () => {
  const { settings, speakText, startTaskById, setActiveTab, showFeedback } = useAccessibility();
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        settings.language === 'hi'
          ? 'नमस्ते! मैं आपका साथी एआई हूँ। आप मुझसे अपने फोन, बिल भरने, टिकट बुक करने या ऑनलाइन सुरक्षा के बारे में कुछ भी पूछ सकते हैं।'
          : 'Hello! I am your Saathi AI. You can ask me anything about your phone, paying bills, train tickets, or staying safe online.',
    },
  ]);

  const suggestions = [
    {
      key: 'password',
      en: 'How do I reset my email password?',
      hi: 'मैं अपना ईमेल पासवर्ड कैसे बदलूँ?',
    },
    {
      key: 'electricity',
      en: 'What is the best way to pay electricity bill online?',
      hi: 'बिजली का बिल ऑनलाइन भरने का सबसे आसान तरीका क्या है?',
    },
    {
      key: 'train',
      en: 'How can I book a train ticket on my phone?',
      hi: 'फोन से ट्रेन की टिकट कैसे बुक करें?',
    },
    {
      key: 'phishing',
      en: 'Explain what a phishing scam looks like.',
      hi: 'ऑनलाइन धोखाधड़ी (स्कैम) कैसा दिखता है, समझाएं।',
    },
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || inputVal;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    // Determine matching answer or fallback
    setTimeout(() => {
      const lower = textToSend.toLowerCase();
      let matchedKey = 'password';
      if (lower.includes('bill') || lower.includes('electric') || lower.includes('बिजली')) {
        matchedKey = 'electricity';
      } else if (lower.includes('train') || lower.includes('ticket') || lower.includes('ट्रेन') || lower.includes('irctc')) {
        matchedKey = 'train';
      } else if (lower.includes('scam') || lower.includes('phish') || lower.includes('धोखा') || lower.includes('सुरक्षा')) {
        matchedKey = 'phishing';
      }

      const answerData = SAMPLE_ANSWERS[matchedKey];
      const replySummary = settings.language === 'hi' ? answerData.summaryHi : answerData.summary;

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: replySummary,
        answerData,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // If user enabled readAloud automatically, read reply
      if (settings.readAloud) {
        speakText(replySummary);
      }
    }, 400);
  };

  const handleSimulateVoice = () => {
    const sample =
      settings.language === 'hi'
        ? 'बिजली का बिल ऑनलाइन भरने का तरीका बताओ'
        : 'How do I pay electricity bill online?';
    setInputVal(sample);
    showFeedback(
      settings.language === 'hi'
        ? 'आवाज़ पहचान ली गई: ' + sample
        : 'Voice input recognized: ' + sample,
      'info'
    );
  };

  return (
    <div className="py-6 sm:py-8 space-y-6 max-w-4xl mx-auto pb-24">
      {/* Demo Mode Notice Banner (Matching Screenshot 1) */}
      <div
        className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border-2 text-xs sm:text-sm font-semibold shadow-sm"
        style={{
          backgroundColor: 'var(--demo-pill-bg)',
          borderColor: 'var(--demo-pill-border)',
          color: 'var(--demo-pill-text)',
        }}
        role="note"
      >
        <Info className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
        <p className="leading-snug">
          <span className="font-bold uppercase tracking-wider mr-1.5">[Demo mode]</span>
          {settings.language === 'hi'
            ? 'ये नमूना उत्तर हैं। वास्तविक एआई सेवा कनेक्ट करने पर लाइव प्रतिक्रियाएं मिलेंगी।'
            : 'These are sample answers. Connecting a real AI service will give live responses.'}
        </p>
      </div>

      {/* Hero Greeting Box (Matching Screenshot 1) */}
      <div className="text-center py-4 space-y-3">
        <div
          className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center shadow-md border-2"
          style={{
            backgroundColor: 'var(--brand-brown-light)',
            borderColor: 'var(--border-strong)',
            color: 'var(--brand-brown)',
          }}
        >
          <Sparkles className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
          {settings.language === 'hi' ? 'नमस्ते, मैं आपका साथी एआई हूँ' : 'Hello, I am your Saathi AI'}
        </h1>
        <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          {settings.language === 'hi'
            ? 'कोई भी प्रश्न पूछें या शुरुआत करने के लिए नीचे दिए गए सुझावों में से चुनें।'
            : 'Ask any question or pick a suggestion below to get started.'}
        </p>
      </div>

      {/* Suggested Questions Pills (Matching Screenshot 1) */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-textMuted px-1 block">
          {settings.language === 'hi' ? 'सुझाए गए प्रश्न:' : 'Suggested questions:'}
        </span>
        <div className="flex flex-wrap gap-2.5">
          {suggestions.map((s) => (
            <button
              key={s.key}
              onClick={() => handleSend(settings.language === 'hi' ? s.hi : s.en)}
              className="px-4 py-2.5 rounded-2xl text-sm sm:text-base font-semibold border-2 shadow-sm transition-all text-left hover:scale-[1.01]"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-main)',
              }}
            >
              {settings.language === 'hi' ? s.hi : s.en}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation History */}
      <div className="space-y-4 pt-2">
        {messages.map((m) => {
          const isAi = m.sender === 'assistant';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-2xl p-5 rounded-3xl border-2 shadow-sm space-y-3 ${
                  isAi ? 'rounded-tl-sm' : 'rounded-tr-sm'
                }`}
                style={{
                  backgroundColor: isAi ? 'var(--bg-surface)' : 'var(--brand-brown)',
                  borderColor: isAi ? 'var(--border-strong)' : 'var(--brand-brown-hover)',
                  color: isAi ? 'var(--text-main)' : 'var(--brand-text)',
                }}
              >
                <div className="flex items-center justify-between gap-3 pb-1 border-b border-black/10 dark:border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {isAi ? 'Saathi AI' : 'You'}
                  </span>
                  {isAi && (
                    <button
                      onClick={() => speakText(m.text)}
                      className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border hover:bg-secondary transition-colors"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-main)',
                      }}
                      aria-label="Read this message aloud"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Read Aloud</span>
                    </button>
                  )}
                </div>

                <p className="text-base sm:text-lg leading-relaxed">{m.text}</p>

                {/* Structured answer steps & task button if available */}
                {isAi && m.answerData && (
                  <div className="pt-2 space-y-3">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-textMuted">
                        {settings.language === 'hi' ? 'महत्वपूर्ण कदम:' : 'Important Steps:'}
                      </span>
                      <ol className="list-decimal pl-5 space-y-1.5 text-sm sm:text-base">
                        {(settings.language === 'hi'
                          ? m.answerData.stepsHi
                          : m.answerData.steps
                        ).map((step, idx) => (
                          <li key={idx} className="leading-snug">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {m.answerData.tip && (
                      <div className="p-3 rounded-xl bg-secondary/60 border border-borderSubtle text-xs sm:text-sm font-medium flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brandBrown flex-shrink-0 mt-0.5" />
                        <span>
                          {settings.language === 'hi'
                            ? m.answerData.tipHi
                            : m.answerData.tip}
                        </span>
                      </div>
                    )}

                    {m.answerData.relatedTaskId && (
                      <div className="pt-2">
                        <button
                          onClick={() => startTaskById(m.answerData!.relatedTaskId!)}
                          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm sm:text-base border-2 shadow transition-all hover:scale-[1.01]"
                          style={{
                            backgroundColor: 'var(--brand-brown)',
                            borderColor: 'var(--brand-brown-hover)',
                            color: 'var(--brand-text)',
                          }}
                        >
                          <Brain className="w-5 h-5" />
                          <span>
                            {settings.language === 'hi'
                              ? 'इसे मेमोरी सपोर्ट में कदम-दर-कदम पूरा करें'
                              : 'Walk Me Through Step-by-Step (Memory Support)'}
                          </span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating / Sticky Input Bar */}
      <div
        className="sticky bottom-20 md:bottom-6 z-20 p-2 sm:p-3 rounded-2xl border-2 shadow-xl flex items-center gap-2 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <button
          onClick={handleSimulateVoice}
          className="p-3 rounded-xl hover:bg-secondary text-brandBrown transition-all border border-transparent hover:border-borderSubtle"
          aria-label="Tap to speak your question with microphone"
          title="Simulate Voice Input"
        >
          <Mic className="w-6 h-6" />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={
            settings.language === 'hi'
              ? 'अपना प्रश्न यहाँ लिखें...'
              : 'Ask a question or type your problem...'
          }
          className="flex-1 px-3 py-2 text-base sm:text-lg bg-transparent border-none outline-none focus:ring-0 placeholder:text-textMuted"
          style={{ color: 'var(--text-main)' }}
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputVal.trim()}
          className="p-3 rounded-xl font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow"
          style={{
            backgroundColor: 'var(--brand-brown)',
            color: 'var(--brand-text)',
          }}
          aria-label="Send your question"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
