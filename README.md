# DigiSaathi — Independence at Every Age

**DigiSaathi** is an accessible, senior-focused digital assistance platform designed to empower elderly users to navigate everyday digital tasks (such as paying bills, booking train tickets, resetting passwords, and spotting online scams) with confidence, independence, and peace of mind.

## ✨ 3 Core Elderly Accessibility Features

1. **Memory Support Mode**
   - **One-Step-at-a-Time Assistance**: Breaks complicated tasks into single instructions with large **Next Step**, **Go Back**, and **Repeat** buttons, accompanied by progress counters and indicators.
   - **Repeat Instructions**: Integrated text-to-speech with selectable speech speed (Normal / Slower) in English and हिन्दी.
   - **Persistent Preferences**: Saves font size, theme, and language in `localStorage` across sessions.
   - **Personal Notes Section**: Enables seniors to save, view, edit, and safely delete medicine schedules, doctor appointments, and account IDs with confirmation protection.

2. **Simple Mode**
   - **Clutter-Free Interface**: Hides secondary visual clutter and technical terms, displaying the 4 most critical actions prominently.
   - **Simple Language**: Plain language instructions preserving full accuracy of legal, financial, and medical information.
   - **1-Click Return**: Switch back to standard view at any time.

3. **Colour & Contrast Accessibility Mode**
   - **3 Themes**: Original Brown Matte Theme (default warm aesthetic), High-Contrast Light Theme, and High-Contrast Dark Theme.
   - **High-Contrast Toggle**: Maximum WCAG AAA contrast ratio with clear borders.
   - **Colour-Blind Safe**: Every alert and status pairs color with text labels and symbols (e.g. `[SUCCESS] ✓`, `[WARNING] ⚠️`).
   - **Text & Readability**: 4 font size options (Small, Normal, Large, Extra Large) with responsive scaling and visible keyboard focus rings.

4. **Central Accessibility Settings Hub**
   - Accessible from the header and homepage with clear, plain-language controls and live previews.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation & Launch
1. Open this folder in your terminal / VSCode:
   ```bash
   cd digisaathi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL (typically http://localhost:5173 or http://localhost:3000) in your web browser.

### Build for Production
```bash
npm run build
```
