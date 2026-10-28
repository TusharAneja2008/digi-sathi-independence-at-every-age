import { GuidedTask, GuidedStep } from '../types/accessibility.js';

export const SAMPLE_GUIDED_TASKS: GuidedTask[] = [
  {
    id: 'electricity-bill',
    title: 'Pay Electricity Bill Online',
    titleHi: 'बिजली का बिल ऑनलाइन भरें',
    category: 'Utilities',
    categoryHi: 'दैनिक सेवाएं',
    shortDescription: 'Pay your monthly electricity bill safely from your phone or computer.',
    shortDescriptionHi: 'अपने फोन या कंप्यूटर से सुरक्षित रूप से बिजली का बिल भरें।',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 5,
        instruction: 'Find your old electricity bill paper.',
        explanation: 'Look near the top of the paper bill for your Consumer Number or CA Number. Keep a pen and this paper next to you.',
        tip: 'It is usually a 9 or 10 digit number printed in bold.',
        actionHint: 'Have the paper bill ready in your hands before continuing.',
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        instruction: 'Open your trusted payment app (e.g., Google Pay, Paytm, or BHIM).',
        explanation: 'Tap the app icon on your phone home screen. Look for the button with a lightbulb icon that says "Electricity" or "Bills".',
        tip: 'Never click on links sent in SMS messages claiming your power will be disconnected today.',
        actionHint: 'Tap "Bills & Recharges" then choose "Electricity".',
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        instruction: 'Select your state and your power company name.',
        explanation: 'Choose your state from the list. Then tap the name that matches the header on your electricity bill (for example, BSES, Tata Power, or UPPCL).',
        tip: 'If you are unsure of the company name, check the logo at the top left of your paper bill.',
        actionHint: 'Tap the matching company name.',
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        instruction: 'Type your Consumer Number carefully.',
        explanation: 'Enter the digits from step 1. Tap "Fetch Bill" or "Continue". Check that the name shown on the screen is your name.',
        tip: 'Verify the bill amount matches the amount on your paper bill.',
        actionHint: 'Ensure your name and bill amount match before proceeding.',
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        instruction: 'Tap Pay and enter your 4-digit or 6-digit UPI PIN.',
        explanation: 'Double check the amount. Enter your secret UPI PIN. Wait for the green checkmark and "Payment Successful" screen. Take a screenshot for your records.',
        tip: 'Remember: You only enter your UPI PIN to SEND money, never to receive money.',
        actionHint: 'Save the receipt or screenshot. You are all done!',
      },
    ],
    stepsHi: [
      {
        stepNumber: 1,
        totalSteps: 5,
        instruction: 'अपना पुराना बिजली का बिल पास रखें।',
        explanation: 'बिल के ऊपर लिखे उपभोक्ता संख्या (Consumer Number / CA Number) को देखें।',
        tip: 'यह आमतौर पर 9 या 10 अंकों का नंबर होता है।',
        actionHint: 'आगे बढ़ने से पहले बिल को अपने पास रख लें।',
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        instruction: 'अपना सुरक्षित पेमेंट ऐप खोलें (Google Pay, Paytm या BHIM)।',
        explanation: 'स्क्रीन पर बल्ब के निशान वाला "Electricity" या "बिल" विकल्प ढूंढें।',
        tip: 'बिजली कटने वाले अज्ञात SMS लिंक पर कभी क्लिक न करें।',
        actionHint: 'Electricity विकल्प पर टैप करें।',
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        instruction: 'अपना राज्य और बिजली कंपनी चुनें।',
        explanation: 'अपने राज्य का नाम चुनें और वही कंपनी चुनें जो आपके बिल पर लिखी है।',
        tip: 'कंपनी का नाम बिल के शीर्ष पर छपा होता है।',
        actionHint: 'अपनी कंपनी के नाम पर टैप करें।',
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        instruction: 'अपना उपभोक्ता नंबर (Consumer Number) दर्ज करें।',
        explanation: 'नंबर डालने के बाद देखें कि स्क्रीन पर आपका ही नाम आ रहा है या नहीं।',
        tip: 'बिल की राशि अपने कागजी बिल से मिला लें।',
        actionHint: 'नाम और राशि की पुष्टि करें।',
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        instruction: 'Pay पर टैप करें और अपना गोपनीय UPI PIN दर्ज करें।',
        explanation: 'UPI PIN दर्ज करने के बाद हरी सही का निशान आने तक प्रतीक्षा करें।',
        tip: 'याद रखें: पैसे भेजते समय ही पिन डाला जाता है, पैसे लेने पर कभी नहीं।',
        actionHint: 'रसीद का स्क्रीनशॉट ले लें। काम पूरा हुआ!',
      },
    ],
  },
  {
    id: 'train-ticket',
    title: 'Book a Train Ticket (IRCTC)',
    titleHi: 'ट्रेन की टिकट बुक करें (IRCTC)',
    category: 'Travel',
    categoryHi: 'यात्रा',
    shortDescription: 'Step-by-step guidance to search and book confirmed train tickets safely.',
    shortDescriptionHi: 'ट्रेन टिकट सुरक्षित रूप से खोजने और बुक करने के आसान कदम।',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 5,
        instruction: 'Write down your journey details on a notepad.',
        explanation: 'Note your Departure Station, Destination Station, Date of Travel, and which passenger is senior citizen (age 60+).',
        tip: 'Booking is easiest between 10:00 AM and 11:30 AM for normal tickets.',
        actionHint: 'Have stations and travel date decided.',
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        instruction: 'Open the official IRCTC Rail Connect App or website.',
        explanation: 'Log in with your User ID and password. If asked for a 4-digit login PIN, enter it.',
        tip: 'Ensure you only use the official IRCTC app with the blue logo.',
        actionHint: 'Tap on "Train" and then "Book Ticket".',
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        instruction: 'Choose your From station, To station, and travel date.',
        explanation: 'Select your coach class (like 3AC or Sleeper). Tap the green "Search Trains" button.',
        tip: 'Look for trains marked with green "AVAILABLE" seats.',
        actionHint: 'Select the train and class you prefer.',
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        instruction: 'Add Passenger details for yourself and family.',
        explanation: 'Enter Full Name, Age, and choose "Lower Berth" preference if you prefer not to climb stairs.',
        tip: 'Senior citizens can select the "Lower Berth" preference for comfort.',
        actionHint: 'Check all passenger names and ages carefully.',
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        instruction: 'Review the summary and complete payment.',
        explanation: 'Choose payment method (UPI is the simplest). Enter your UPI ID or pay via your bank app. Your PNR number will arrive via SMS.',
        tip: 'Take a screenshot of the PNR number immediately.',
        actionHint: 'Your confirmed e-ticket is booked!',
      },
    ],
    stepsHi: [
      {
        stepNumber: 1,
        totalSteps: 5,
        instruction: 'अपनी यात्रा का विवरण एक कागज़ पर लिख लें।',
        explanation: 'कहाँ से चलना है, कहाँ पहुँचना है, और यात्रा की तारीख पहले से तय कर लें।',
        tip: 'वरिष्ठ नागरिक (60+ आयु) के लिए लोअर बर्थ की सुविधा मिलती है।',
        actionHint: 'तारीख और स्टेशन तय रखें।',
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        instruction: 'IRCTC ऐप खोलें और लॉग इन करें।',
        explanation: 'अपना 4-अंकीय पिन या पासवर्ड डालकर ऐप में प्रवेश करें।',
        tip: 'केवल आधिकारिक IRCTC नीले लोगो वाले ऐप का ही उपयोग करें।',
        actionHint: 'Train विकल्प पर क्लिक करें।',
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        instruction: 'स्टेशन और तारीख चुनकर ट्रेन खोजें।',
        explanation: 'तारीख चुनें और हरी पट्टी में "AVAILABLE" (उपलब्ध) वाली सीट चुनें।',
        tip: '3AC या स्लीपर क्लास चुन सकते हैं।',
        actionHint: 'पसंदीदा ट्रेन पर टैप करें।',
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        instruction: 'यात्री का नाम, उम्र और लोअर बर्थ चुनें।',
        explanation: 'नाम और सही उम्र भरें ताकि सीनियर सिटिज़न छूट और निचली सीट मिल सके।',
        tip: 'चढ़ने में आसानी के लिए Lower Berth का चयन करें।',
        actionHint: 'नाम की वर्तनी जाँच लें।',
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        instruction: 'UPI से भुगतान पूरा करें और PNR सुरक्षित रखें।',
        explanation: 'भुगतान होते ही SMS में PNR नंबर मिलेगा। इसका स्क्रीनशॉट ले लें।',
        tip: 'PNR नंबर से टिकट हमेशा चेक की जा सकती है।',
        actionHint: 'आपकी टिकट बुक हो गई है!',
      },
    ],
  },
  {
    id: 'email-password',
    title: 'Reset Your Email Password Safely',
    titleHi: 'ईमेल का पासवर्ड सुरक्षित रूप से बदलें',
    category: 'Security',
    categoryHi: 'सुरक्षा',
    shortDescription: 'Clear, panic-free steps to recover your email account with your mobile number.',
    shortDescriptionHi: 'अपने मोबाइल नंबर की मदद से ईमेल पासवर्ड आसानी से रीसेट करें।',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        instruction: 'Open your email login page and tap "Forgot Password".',
        explanation: 'Type your email address (for example, name@gmail.com). Underneath the password box, tap the blue words "Forgot password?".',
        tip: 'Do not panic. You can always recover your account using your mobile phone.',
        actionHint: 'Tap "Forgot Password" to start recovery.',
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        instruction: 'Choose to receive a verification code on your mobile phone.',
        explanation: 'Google or Yahoo will show the last 2 digits of your phone number. Tap "Send SMS" or "Get a verification code".',
        tip: 'Make sure your mobile phone is nearby and has cellular network signal.',
        actionHint: 'Watch your phone SMS messages for a 6-digit code.',
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        instruction: 'Enter the 6-digit code received on your phone.',
        explanation: 'Check your SMS messages. It usually starts with G- (like G-123456). Type only the 6 numbers on your screen and tap Next.',
        tip: 'Never share this code with anyone over phone calls.',
        actionHint: 'Type the 6 numbers and click Next.',
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        instruction: 'Type your new password and write it down in a secret notebook.',
        explanation: 'Choose a password you can remember, like a family pet name and year (e.g., Tiger#2024). Write it in your personal home diary.',
        tip: 'Save this new password in your DigiSaathi Personal Notes for safekeeping.',
        actionHint: 'Tap "Save Password". You are back into your email!',
      },
    ],
    stepsHi: [
      {
        stepNumber: 1,
        totalSteps: 4,
        instruction: 'ईमेल लॉगिन पेज पर "Forgot password?" पर टैप करें।',
        explanation: 'अपना ईमेल आईडी भरें और पासवर्ड बॉक्स के नीचे नीला विकल्प चुनें।',
        tip: 'घबराएं नहीं, आपके फोन नंबर से यह तुरंत ठीक हो जाता है।',
        actionHint: 'Forgot password पर क्लिक करें।',
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        instruction: 'अपने फोन पर SMS कोड मंगाने का विकल्प चुनें।',
        explanation: 'स्क्रीन पर आपके मोबाइल नंबर के आखिरी अंक दिखेंगे। Send SMS चुनें।',
        tip: 'अपना फोन पास में रखें ताकि मैसेज तुरंत देख सकें।',
        actionHint: 'SMS आने की प्रतीक्षा करें।',
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        instruction: 'SMS में आया 6-अंकीय कोड दर्ज करें।',
        explanation: 'मैसेज में आया नंबर (जैसे 482910) भरें और आगे बढ़ें।',
        tip: 'यह कोड किसी अनजान कॉलर को कभी न बताएं।',
        actionHint: 'कोड लिखकर Next दबाएं।',
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        instruction: 'नया पासवर्ड बनाएं और अपनी पर्सनल डायरी में लिख लें।',
        explanation: 'एक मजबूत पासवर्ड बनाएं और इसे किसी सुरक्षित डायरी में नोट कर लें।',
        tip: 'आप इसे डिजीसाथी के पर्सनल नोट्स में भी सुरक्षित रख सकते हैं।',
        actionHint: 'नया पासवर्ड सेव हो गया!',
      },
    ],
  },
  {
    id: 'spot-scams',
    title: 'Spotting & Avoiding Online Scams',
    titleHi: 'ऑनलाइन धोखाधड़ी (स्कैम) से कैसे बचें',
    category: 'Safety',
    categoryHi: 'सुरक्षा',
    shortDescription: 'Golden safety rules to protect your bank account and personal privacy.',
    shortDescriptionHi: 'अपने बैंक खाते और जानकारी को सुरक्षित रखने के जरूरी नियम।',
    steps: [
      {
        stepNumber: 1,
        totalSteps: 4,
        instruction: 'RULE 1: Never share your Bank OTP or UPI PIN with anyone.',
        explanation: 'No bank, police officer, or government department will EVER ask you for your OTP, PIN, or password over a phone call.',
        tip: 'If someone asks for an OTP, disconnect the call immediately without feeling guilty.',
        actionHint: 'Memorize: PIN is strictly for you only.',
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        instruction: 'RULE 2: Beware of urgent messages claiming service disconnection.',
        explanation: 'Scammers send fake SMS saying: "Your electricity / SIM card / bank account will be stopped tonight at 9:30 PM. Call this number."',
        tip: 'Legitimate companies always send formal letters and do not threaten immediate cuts within hours.',
        actionHint: 'Do not click the link and do not call the mobile number in the SMS.',
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        instruction: 'RULE 3: Never install AnyDesk, TeamViewer, or QuickSupport on request.',
        explanation: 'Fraudsters ask you to download these screen-sharing apps claiming to help you update KYC or fix your phone. These apps let them see your screen and bank details.',
        tip: 'If an unknown caller asks you to install any app from Play Store, say NO and cut the call.',
        actionHint: 'Never install remote screen-sharing tools for strangers.',
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        instruction: 'RULE 4: If in doubt, call 1930 (National Cyber Crime Helpline).',
        explanation: 'India has an official national helpline: 1930 for cyber fraud. You can also press our Emergency tab to reach your trusted contact.',
        tip: 'Remember the DigiSaathi motto: Pause, verify with family, and never rush.',
        actionHint: 'Keep helpline 1930 and 112 in mind.',
      },
    ],
    stepsHi: [
      {
        stepNumber: 1,
        totalSteps: 4,
        instruction: 'नियम 1: बैंक OTP या UPI PIN कभी किसी को न बताएं।',
        explanation: 'कोई भी बैंक कर्मचारी या पुलिस वाला फोन पर आपसे कभी भी OTP या PIN नहीं मांगता।',
        tip: 'यदि कोई OTP मांगे, तुरंत फोन काट दें।',
        actionHint: 'PIN केवल आपके अपने इस्तेमाल के लिए है।',
      },
      {
        stepNumber: 2,
        totalSteps: 4,
        instruction: 'नियम 2: "बिजली कटेगी" या "सिम बंद होगा" वाले डराने वाले SMS पर भरोसा न करें।',
        explanation: 'ठग जल्दबाज़ी पैदा करने के लिए आज रात बिजली बंद होने का झूठा मैसेज भेजते हैं।',
        tip: 'SMS में दिए गए किसी भी अनजान मोबाइल नंबर पर कॉल न करें।',
        actionHint: 'अनजान लिंक पर क्लिक न करें।',
      },
      {
        stepNumber: 3,
        totalSteps: 4,
        instruction: 'नियम 3: किसी के कहने पर AnyDesk या TeamViewer ऐप डाउनलोड न करें।',
        explanation: 'ये ऐप धोखेबाज़ों को आपके फोन की स्क्रीन और बैंक पासवर्ड देखने की अनुमति दे देते हैं।',
        tip: 'अनजान व्यक्ति के कहने पर प्ले स्टोर से कोई भी ऐप न डालें।',
        actionHint: 'स्क्रीन शेयरिंग ऐप कभी न लगाएं।',
      },
      {
        stepNumber: 4,
        totalSteps: 4,
        instruction: 'नियम 4: संदेह होने पर 1930 साइबर हेल्पलाइन पर कॉल करें।',
        explanation: 'भारत सरकार की हेल्पलाइन 1930 पर तुरंत शिकायत दर्ज करवाएं या परिवार से पूछें।',
        tip: 'हमेशा रुकें, परिवार से सलाह लें, फिर निर्णय लें।',
        actionHint: '1930 और 112 हमेशा याद रखें।',
      },
    ],
  },
];

export function convertTextToGuidedSteps(rawText: string, title: string = 'Step-by-Step Task'): GuidedTask {
  // Split raw text into natural sentence or paragraph chunks
  const cleaned = rawText.replace(/\r\n/g, '\n').trim();
  const rawParagraphs = cleaned
    .split(/\n{2,}|\n(?=[0-9]+[\.\)])/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const chunks = rawParagraphs.length > 1
    ? rawParagraphs
    : cleaned
        .split(/(?<=[.?!])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 10);

  const total = Math.max(1, Math.min(chunks.length, 6));
  const selectedChunks = chunks.slice(0, total);

  const steps: GuidedStep[] = selectedChunks.map((chunk, idx) => {
    // Generate simple headline instruction and detailed explanation
    const firstSentence = chunk.split(/[.?!]/)[0].trim();
    const explanation = chunk;
    return {
      stepNumber: idx + 1,
      totalSteps: total,
      instruction: firstSentence.length > 60 ? firstSentence.slice(0, 60) + '...' : firstSentence || `Step ${idx + 1}`,
      explanation: explanation,
      tip: idx === total - 1 ? 'You have reached the final step. Review your details.' : 'Take your time and read carefully before proceeding.',
      actionHint: idx === total - 1 ? 'Tap Finish when done.' : 'Tap Next Step when ready.',
    };
  });

  return {
    id: 'custom-' + Date.now(),
    title: title || 'Custom Guided Walkthrough',
    titleHi: 'कस्टम निर्देशित कार्य',
    category: 'Guide',
    categoryHi: 'मार्गदर्शिका',
    shortDescription: 'Broken down from your text into calm, manageable steps.',
    shortDescriptionHi: 'आपके टेक्स्ट को सरल चरणों में बाँटा गया है।',
    steps: steps,
    stepsHi: steps,
  };
}
