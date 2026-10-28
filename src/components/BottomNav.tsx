import React from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext.js';
import {
  MessageSquareHeart,
  BookOpen,
  Brain,
  StickyNote,
  PhoneCall,
  Settings,
  Home,
  Sparkles,
} from 'lucide-react';
import { ActiveTab } from '../types/accessibility.js';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, settings } = useAccessibility();

  const navItems: { id: ActiveTab; label: string; labelHi: string; icon: React.ElementType }[] = [
    {
      id: 'assistant',
      label: 'Assistant',
      labelHi: 'सहायक',
      icon: MessageSquareHeart,
    },
    {
      id: 'guide',
      label: 'Guide',
      labelHi: 'गाइड',
      icon: BookOpen,
    },
    {
      id: 'memory',
      label: 'Step-by-Step',
      labelHi: 'कदम-दर-कदम',
      icon: Brain,
    },
    {
      id: 'notes',
      label: 'My Notes',
      labelHi: 'मेरे नोट्स',
      icon: StickyNote,
    },
    {
      id: 'emergency',
      label: 'Emergency',
      labelHi: 'आपातकालीन',
      icon: PhoneCall,
    },
    {
      id: 'settings',
      label: 'Settings',
      labelHi: 'सेटिंग्स',
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Desktop Navigation Tabs (rendered beneath header) */}
      <nav
        aria-label="Main Navigation"
        className="hidden md:block w-full border-b sticky top-20 z-30 transition-colors"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 py-2 overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all border-2 ${
                      isActive ? 'shadow-sm' : 'hover:bg-surface border-transparent'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--brand-brown)' : 'transparent',
                      color: isActive ? 'var(--brand-text)' : 'var(--text-main)',
                      borderColor: isActive ? 'var(--border-strong)' : 'transparent',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span>{settings.language === 'hi' ? item.labelHi : item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Helper indicator */}
            {settings.memorySupportMode && (
              <div
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
                style={{
                  backgroundColor: 'var(--brand-brown-light)',
                  color: 'var(--text-main)',
                  borderColor: 'var(--border-strong)',
                }}
              >
                <Brain className="w-4 h-4 text-brandBrown" />
                <span>Memory Assistance Active</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t shadow-lg pb-safe"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="grid grid-cols-6 h-20 px-1 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center h-full py-1 rounded-xl transition-all ${
                  isActive ? 'font-extrabold' : 'font-medium opacity-75'
                }`}
                style={{
                  color: isActive ? 'var(--brand-brown)' : 'var(--text-muted)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all ${
                    isActive ? 'scale-110 shadow-sm' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--brand-brown-light)' : 'transparent',
                  }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-[11px] leading-tight mt-1 truncate max-w-full px-0.5">
                  {settings.language === 'hi' ? item.labelHi : item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
