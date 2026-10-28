export interface AssistantAnswer {
  summary: string;
  summaryHi: string;
  steps: string[];
  stepsHi: string[];
  tip?: string;
  tipHi?: string;
  relatedTaskId?: string;
}

export const SAMPLE_ANSWERS: Record<string, AssistantAnswer> = {
  'password': {
    summary: 'You can reset your email password easily using your mobile phone without worrying.',
    summaryHi: 'आप अपने मोबाइल फोन की मदद से बिना किसी परेशानी के ईमेल पासवर्ड रीसेट कर सकते हैं।',
    steps: [
      'Go to the login screen and tap "Forgot Password".',
      'Choose to receive an SMS verification code on your mobile number.',
      'Enter the 6-digit code sent to your phone.',
      'Create a new password and write it down in a safe notebook.',
    ],
    stepsHi: [
      'लॉगिन स्क्रीन पर जाएं और "Forgot Password" पर टैप करें।',
      'अपने मोबाइल नंबर पर SMS कोड मंगाने का विकल्प चुनें।',
      'फोन पर आया 6-अंकीय कोड दर्ज करें।',
      'नया पासवर्ड बनाएं और अपनी डायरी में लिख लें।',
    ],
    tip: 'Never share your SMS verification code with any caller on the phone.',
    tipHi: 'फोन पर किसी भी अनजान व्यक्ति को SMS कोड कभी न बताएं।',
    relatedTaskId: 'email-password',
  },
  'electricity': {
    summary: 'Paying your electricity bill online is fast, safe, and saves you from standing in long queues.',
    summaryHi: 'बिजली बिल ऑनलाइन भरना सुरक्षित और आसान है, और लंबी लाइनों में लगने से बचाता है।',
    steps: [
      'Keep your paper electricity bill handy to see your Consumer / CA Number.',
      'Open your payment app like Google Pay, Paytm, or BHIM.',
      'Tap on "Electricity" and select your state electricity board.',
      'Enter your Consumer Number, check your name, and pay securely using your UPI PIN.',
    ],
    stepsHi: [
      'अपने बिल से उपभोक्ता (CA / Consumer) नंबर देख लें।',
      'Google Pay या Paytm ऐप खोलें।',
      'Electricity विकल्प चुनकर अपने राज्य का बिजली बोर्ड चुनें।',
      'उपभोक्ता नंबर दर्ज करें, अपना नाम जांचें और UPI PIN से भुगतान करें।',
    ],
    tip: 'Only enter your UPI PIN to make payment. Never enter your PIN to receive any refund or cashback.',
    tipHi: 'पैसे भेजते समय ही UPI PIN डालें, कैशबैक पाने के लिए पिन की जरूरत नहीं होती।',
    relatedTaskId: 'electricity-bill',
  },
  'train': {
    summary: 'You can book confirmed train tickets directly on your phone using the official IRCTC app.',
    summaryHi: 'आप आधिकारिक IRCTC ऐप के जरिए अपने फोन से कन्फर्म ट्रेन टिकट बुक कर सकते हैं।',
    steps: [
      'Open the official IRCTC Rail Connect app with the blue logo.',
      'Select your starting station, destination, and travel date.',
      'Pick a train with available seats in green.',
      'Enter passenger details and choose Lower Berth preference for senior citizens.',
      'Complete the payment via UPI to receive your PNR number immediately.',
    ],
    stepsHi: [
      'आधिकारिक नीले लोगो वाला IRCTC ऐप खोलें।',
      'स्टेशन और यात्रा की तारीख चुनें।',
      'हरे रंग में उपलब्ध (Available) सीट वाली ट्रेन चुनें।',
      'वरिष्ठ नागरिक के लिए Lower Berth (निचली सीट) का विकल्प चुनें।',
      'UPI से भुगतान करें और SMS में PNR नंबर प्राप्त करें।',
    ],
    tip: 'Book senior citizen seats in advance to get convenient lower berths without climbing.',
    tipHi: 'निचली बर्थ की सुविधा पाने के लिए पहले से टिकट बुक कर लें।',
    relatedTaskId: 'train-ticket',
  },
  'phishing': {
    summary: 'A phishing scam is a fake message or call pretending to be your bank or electric department to steal your money.',
    summaryHi: 'फिशिंग स्कैम एक फर्जी मैसेज या कॉल है जो बैंक या बिजली विभाग का नाम लेकर पैसे चुराने की कोशिश करता है।',
    steps: [
      'Notice urgent threats like: "Your power will be cut tonight" or "Account suspended". Real banks give formal written notices.',
      'Look at sender numbers: Scammers use normal 10-digit mobile numbers rather than official bank handles (like VK-HDFCBK).',
      'Never tap links inside SMS asking you to download APK files or verify KYC.',
      'Remember: Banks NEVER ask for your password, ATM PIN, or OTP over the phone.',
    ],
    stepsHi: [
      'डराने वाले संदेशों से बचें, जैसे "आज रात खाता बंद हो जाएगा"। बैंक कभी ऐसा नहीं करते।',
      'भेजने वाले का नंबर देखें: ठग सामान्य 10-अंकों वाले मोबाइल नंबर से मैसेज भेजते हैं।',
      'SMS में आए किसी भी लिंक पर क्लिक न करें।',
      'याद रखें: बैंक अधिकारी कभी भी पासवर्ड या OTP नहीं मांगते।',
    ],
    tip: 'When suspicious, immediately disconnect and call 1930 (National Cyber Crime Helpline).',
    tipHi: 'संदेह होने पर तुरंत फोन काटें और 1930 हेल्पलाइन पर संपर्क करें।',
    relatedTaskId: 'spot-scams',
  },
};

export const GUIDE_SAMPLES = [
  {
    id: 'aadhaar',
    title: 'Government Aadhaar update form',
    titleHi: 'सरकारी आधार अपडेट फॉर्म',
    originalText: `Form 2A (Revision 4): It is hereby mandated that all resident individuals possessing an Aadhaar card issued prior to 2016 shall submit biometric and demographic re-validation with Proof of Identity (PoI) and Proof of Address (PoA) under Regulation 16A of UIDAI (Enrolment and Update) Regulations 2016 within a period not exceeding ninety days, failure of which may render online authentication non-operational.`,
    simpleExplanation: `What this really means:
If your Aadhaar card is more than 8 years old, the government simply asks you to update your address proof and photo.
You do NOT lose your Aadhaar. You can do this at any nearby post office or bank for ₹50. There is no penalty.`,
    simpleExplanationHi: `इसका सीधा अर्थ:
यदि आपका आधार कार्ड 8 साल से पुराना है, तो सरकार केवल आपके पते का प्रमाण और फोटो अपडेट करने को कह रही है।
आपका आधार बंद नहीं होगा। आप नजदीकी डाकघर या बैंक में जाकर मात्र ₹50 में यह करा सकते हैं।`,
    steps: [
      'Carry one original ID proof (such as Voter ID or Electricity bill) and your Aadhaar card.',
      'Visit your nearest Post Office or Aadhaar Seva Kendra.',
      'Ask the counter staff for demographic update.',
      'Collect your acknowledgment receipt with update request number (URN).',
    ],
  },
  {
    id: 'hospital',
    title: 'Hospital appointment SMS',
    titleHi: 'अस्पताल अपॉइंटमेंट SMS',
    originalText: `APPT CNF: Dr. V. Sharma (Cardiology-OPD Rm 204). Token #38. Slot 11:15-11:45 hrs. Fasting lipid profile mandatory pre-consult. Report to billing counter Desk B 30 mins prior with prior records and UHID 908129.`,
    simpleExplanation: `What this really means:
You have a doctor visit confirmed with Dr. Sharma for your heart checkup.
• Doctor Room: 204
• Token Number: 38
• Arrive by: 10:45 AM (30 minutes early)
• Food instruction: Do not eat breakfast before blood test (water is okay).
• Bring: Your previous medical file and hospital card.`,
    simpleExplanationHi: `इसका सीधा अर्थ:
डॉ. शर्मा के साथ हृदय जांच की आपकी अपॉइंटमेंट पक्की है।
• कमरा नंबर: 204
• टोकन नंबर: 38
• पहुँचने का समय: सुबह 10:45 बजे (30 मिनट पहले)
• खाली पेट रक्त जांच करानी है (पानी पी सकते हैं)।
• पुरानी मेडिकल फाइल साथ लेकर जाएं।`,
    steps: [
      'Do not eat heavy breakfast if you need the fasting blood test.',
      'Reach Hospital Desk B by 10:45 AM.',
      'Show your UHID 908129 at the counter to get your paper slip.',
      'Walk to Room 204 and sit comfortably until token 38 is called.',
    ],
  },
  {
    id: 'bank-loan',
    title: 'Bank loan rejection letter',
    titleHi: 'बैंक ऋण अस्वीकृति पत्र',
    originalText: `We regret to inform you that upon algorithmic underwriting appraisal of application #LN-8721, the credit committee has determined your credit utilization ratio and debt-to-income threshold exceed permissible institutional bounds in accordance with Master Circular DBR.No.Dir.BC.12/13.03.00/2015-16, precluding sanction at this juncture.`,
    simpleExplanation: `What this really means in plain words:
The bank cannot give this loan right now. It is NOT a personal fault or criminal issue.
The bank computer checked existing monthly expenses and decided the income does not leave enough room for another monthly loan repayment right now.
You can reapply after 6 months or add an earning family member as a co-applicant.`,
    simpleExplanationHi: `सीधे शब्दों में इसका अर्थ:
बैंक अभी यह लोन स्वीकृत नहीं कर सका। इसमें आपकी कोई गलती नहीं है।
बैंक के अनुसार वर्तमान आय पर नया मासिक लोन देना सुरक्षित नहीं होगा।
आप 6 महीने बाद दोबारा आवेदन कर सकते हैं या परिवार के किसी अन्य सदस्य को सह-आवेदक बना सकते हैं।`,
    steps: [
      'Do not panic. A rejected loan does not affect your everyday savings account.',
      'Check if there are any small pending credit card or store payments and clear them.',
      'Consider applying with a son, daughter, or spouse as a joint applicant.',
      'You may speak kindly to your local branch manager to explore senior citizen pension loans.',
    ],
  },
];
