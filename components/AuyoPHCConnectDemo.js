import React, { useState, useRef, useEffect } from "react";

const PHC_LIST = [
  "Auyo Ward – Auyo Primary Health Centre",
  "Auyakayi Ward – Auyakayi Primary Health Clinic",
  "Ayama Ward – Ayama Primary Health Clinic",
  "Ayan Ward – Ayan Primary Health Clinic",
  "Gamafoi Ward – Gamafoi Primary Health Centre",
  "Gamsarka Ward – Gamsarka Health Post / PHC",
  "Gatafa Ward – Gatafa Basic Primary Healthcare",
  "Kafur Ward – Health Post / Community Clinic",
  "Tsidir Ward – Tsidir Basic Health PHC",
  "Unik Ward – Unik PHC",
];

// Disease Information Database
const DISEASE_INFO = {
  malaria: {
    en: {
      name: "Malaria",
      symptoms: [
        "High fever (38°C or above)",
        "Chills and shivering",
        "Headaches and body aches",
        "Nausea and vomiting",
        "Fatigue and weakness",
        "Sweating after fever"
      ],
      prevention: [
        "Use mosquito nets (especially insecticide-treated nets)",
        "Apply mosquito repellent on exposed skin",
        "Wear long-sleeved clothing in the evening",
        "Use window and door screens",
        "Clear stagnant water around homes",
        "Take preventive medication if prescribed"
      ],
      treatment: [
        "Artemisinin-based combination therapy (ACT) is recommended",
        "Paracetamol for fever reduction",
        "Stay hydrated with plenty of fluids",
        "Complete the full course of medication",
        "Seek immediate medical help if symptoms worsen",
        "Hospitalization for severe cases"
      ],
      warning: "Malaria can become severe within 24 hours. Pregnant women and children under 5 are at higher risk."
    },
    ha: {
      name: "Zazzabin Cizon Sauro (Malaria)",
      symptoms: [
        "Zazzabi mai tsananin zafi (38°C ko sama)",
        "Sanyi da rawar jiki",
        "Ciwon kai da ciwon jiki",
        "Tashin zuciya da amai",
        "Gajiya da rauni",
        "Gumi bayan zazzabi"
      ],
      prevention: [
        "Yi amfani da gidan sauro (musamman na kayan kashe sauro)",
        "Shafa maganin hana sauro a jiki",
        "Sanya tufafin dogon hannu da dare",
        "Yi amfani da allon taga da ƙofofi",
        "Kawar da ruwan datti a kusa da gidaje",
        "Sha maganin rigakafi idan an ba da shi"
      ],
      treatment: [
        "Dabarar haɗakar Artemisinin (ACT) ake ba da shawara",
        "Paracetamol don rage zazzabi",
        "Sha ruwa mai yawa",
        "Cika cikakken adadin magani",
        "Nemi taimakon likita nan da nan idan alamun suka tsananta",
        "Shigar da asibiti don lamuran da suka tsananta"
      ],
      warning: "Malaria na iya zama mai tsanani a cikin sa'o'i 24. Mata masu juna biyu da yara ƙasa da 5 suna cikin haɗari mafi girma."
    }
  },
  typhoid: {
    en: {
      name: "Typhoid Fever",
      symptoms: [
        "Prolonged high fever (up to 104°F/40°C)",
        "Headache and body weakness",
        "Stomach pain and loss of appetite",
        "Diarrhea or constipation",
        "Rose-colored spots on chest/abdomen",
        "Confusion or delirium in severe cases"
      ],
      prevention: [
        "Drink boiled or bottled water",
        "Wash hands with soap before eating",
        "Avoid raw fruits and vegetables unless peeled",
        "Ensure food is properly cooked",
        "Get typhoid vaccination",
        "Practice good sanitation"
      ],
      treatment: [
        "Antibiotics prescribed by a doctor",
        "Rest and plenty of fluids",
        "Antipyretics for fever control",
        "Eat easily digestible foods",
        "Complete the full antibiotic course",
        "Hospital care for severe cases"
      ],
      warning: "Typhoid can spread through contaminated food and water. Untreated cases can lead to intestinal perforation."
    },
    ha: {
      name: "Zazzabin Typhoid",
      symptoms: [
        "Zazzabi mai tsayi (har zuwa 40°C)",
        "Ciwon kai da raunin jiki",
        "Ciwon ciki da rashin ci",
        "Gudawa ko maitsattsa",
        "Tabon ja-jaja a kirji/ɗanɗano",
        "Rudani ko hauka a cikin lamuran da suka tsananta"
      ],
      prevention: [
        "Sha ruwan da aka tafasa ko na kwalabe",
        "Wanke hannu da sabulu kafin cin abinci",
        "Kauce wa 'ya'yan itatuwa da kayan lambu sai dai idan an bare su",
        "Tabbatar an dafa abinci yadda ya kamata",
        "Yi allurar rigakafin typhoid",
        "Yi kyakkyawan tsafta"
      ],
      treatment: [
        "Magungunan ƙwayoyin cuta da likita ya rubuta",
        "Hutawa da shan ruwa mai yawa",
        "Magungunan rage zazzabi",
        "Ci abinci mai sauƙin narkewa",
        "Cika cikakken adadin maganin ƙwayoyin cuta",
        "Kulawar asibiti don lamuran da suka tsananta"
      ],
      warning: "Typhoid na iya yaduwa ta hanyar gurɓataccen abinci da ruwa. Lamuran da ba a bi da su ba na iya haifar da ramuka a cikin hanji."
    }
  },
  diabetes: {
    en: {
      name: "Diabetes",
      symptoms: [
        "Increased thirst and frequent urination",
        "Extreme hunger despite eating",
        "Unexplained weight loss",
        "Fatigue and irritability",
        "Blurred vision",
        "Slow-healing sores"
      ],
      prevention: [
        "Maintain a healthy weight",
        "Exercise regularly (30 minutes daily)",
        "Eat balanced diet with whole grains",
        "Limit sugar and refined carbs",
        "Get regular health check-ups",
        "Manage stress levels"
      ],
      treatment: [
        "Regular blood sugar monitoring",
        "Medication as prescribed (insulin or oral)",
        "Healthy diet with portion control",
        "Regular physical activity",
        "Foot care to prevent complications",
        "Regular eye and kidney check-ups"
      ],
      warning: "Diabetes requires lifelong management. Uncontrolled diabetes can lead to heart disease, kidney failure, and vision loss."
    },
    ha: {
      name: "Ciwon Sukari (Diabetes)",
      symptoms: [
        "Ƙarar ƙishirwa da yawan fitsari",
        "Yunwa mai tsanani duk da cinnan abinci",
        "Rashin kiba ba tare da dalili ba",
        "Gajiya da haushi",
        "Matsalar gani",
        "Raunuka masu jinkirin warkewa"
      ],
      prevention: [
        "Kula da nauyin lafiya",
        "Yin motsa jiki akai-akai (minti 30 kowace rana)",
        "Ci abinci mai daidaito tare da hatsi",
        "Iyakance sukari da carbohydrates",
        "Yi duban lafiya akai-akai",
        "Sarrafa matakan damuwa"
      ],
      treatment: [
        "Kula da matakan sukari a jini akai-akai",
        "Shan magani kamar yadda aka rubuta (insulin ko na baki)",
        "Abinci mai lafiya tare da sarrafa adadi",
        "Yin motsa jiki akai-akai",
        "Kula da ƙafafu don hana matsaloli",
        "Duban idanu da ƙoda akai-akai"
      ],
      warning: "Ciwon sukari yana buƙatar kulawa har abada. Ciwon sukari da ba a sarrafa shi ba na iya haifar da cututtukan zuciya, gazawar ƙoda, da asarar gani."
    }
  },
  cholera: {
    en: {
      name: "Cholera",
      symptoms: [
        "Severe watery diarrhea (rice-water stools)",
        "Vomiting and nausea",
        "Rapid heart rate",
        "Loss of skin elasticity",
        "Dry mucous membranes",
        "Low blood pressure"
      ],
      prevention: [
        "Drink only boiled or treated water",
        "Wash hands thoroughly with soap",
        "Use proper sanitation facilities",
        "Avoid raw or undercooked seafood",
        "Wash fruits and vegetables with safe water",
        "Get cholera vaccination"
      ],
      treatment: [
        "Oral rehydration solution (ORS)",
        "Intravenous fluids for severe cases",
        "Zinc supplements for children",
        "Antibiotics in severe cases",
        "Continue breastfeeding for infants",
        "Immediate medical attention"
      ],
      warning: "Cholera can cause death from dehydration within hours. Rehydration is critical for survival."
    },
    ha: {
      name: "Kwalara (Cholera)",
      symptoms: [
        "Gudawa mai tsanani (kamar ruwan shinkafa)",
        "Amai da tashin zuciya",
        "Ƙarar bugun zuciya",
        "Asarar laushin fata",
        "Bushewar membranes",
        "Ƙarancin hawan jini"
      ],
      prevention: [
        "Sha ruwan da aka tafasa ko aka wanke kawai",
        "Wanke hannu sosai da sabulu",
        "Yi amfani da wuraren bayan gida da suka dace",
        "Kauce wa dabbobin ruwa danye ko da ba a dafa su sosai ba",
        "Wanke 'ya'yan itatuwa da kayan lambu da ruwa mai lafiya",
        "Yi allurar rigakafin kwalara"
      ],
      treatment: [
        "Maganin sake saka ruwa ta baki (ORS)",
        "Ruwa ta hanyar jini don lamuran da suka tsananta",
        "Ƙarin zinc ga yara",
        "Magungunan ƙwayoyin cuta a cikin lamuran da suka tsananta",
        "Ci gaba da shan nono ga jarirai",
        "Kula da likita nan da nan"
      ],
      warning: "Kwalara na iya haifar da mutuwa saboda rashin ruwa a cikin sa'o'i. Sake saka ruwa yana da mahimmanci don tsira."
    }
  }
};

const LANGUAGES = {
  en: { label: "English", code: "en", flag: "🇬🇧" },
  ha: { label: "Hausa", code: "ha", flag: "🇳🇬" },
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  wrapper: {
    display: "flex",
    gap: "24px",
    width: "100%",
    maxWidth: "1400px",
    flexWrap: "wrap"
  },
  mainCard: {
    flex: "1",
    minWidth: "300px",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  sideCard: {
    width: "350px",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    background: "linear-gradient(135deg, #2563eb 0%, #0d9488 100%)",
    color: "white",
    padding: "32px 40px"
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  logoIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "12px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    fontSize: "24px"
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 4px 0"
  },
  subtitle: {
    fontSize: "14px",
    opacity: "0.9",
    margin: "0"
  },
  version: {
    textAlign: "right"
  },
  versionLabel: {
    fontSize: "12px",
    opacity: "0.9",
    margin: "0 0 4px 0"
  },
  versionNumber: {
    fontSize: "11px",
    opacity: "0.75",
    margin: "0"
  },
  controls: {
    padding: "24px 40px",
    borderBottom: "1px solid #f1f5f9"
  },
  languageSelector: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px"
  },
  languageLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569"
  },
  languageButtons: {
    display: "flex",
    gap: "8px"
  },
  quickQuestions: {
    marginTop: "24px"
  },
  quickQuestionsTitle: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
    margin: "0 0 12px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  questionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "12px"
  },
  questionButton: {
    padding: "12px 16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#334155",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  actionButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    flexWrap: "wrap"
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1"
  },
  messagesArea: {
    flex: "1",
    overflowY: "auto",
    padding: "32px 40px",
    background: "linear-gradient(to bottom, #ffffff 0%, #f0f9ff 100%)",
    minHeight: "400px"
  },
  messageText: {
    fontSize: "14px",
    lineHeight: "1.5",
    whiteSpace: "pre-line"
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "16px"
  },
  loadingBubble: {
    maxWidth: "75%",
    borderRadius: "18px",
    padding: "16px 20px",
    background: "white",
    border: "1px solid #e2e8f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
  },
  loadingDots: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  loadingText: {
    fontSize: "14px",
    color: "#475569",
    marginLeft: "12px"
  },
  inputArea: {
    padding: "24px 40px",
    borderTop: "1px solid #e2e8f0",
    background: "white"
  },
  inputContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "12px"
  },
  inputWrapper: {
    flex: "1",
    position: "relative"
  },
  input: {
    width: "100%",
    padding: "16px 20px",
    paddingRight: "100px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#1e293b",
    outline: "none",
    transition: "all 0.2s ease"
  },
  inputActions: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  inputActionButton: {
    padding: "8px",
    borderRadius: "8px",
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  inputHelper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#64748b"
  },
  helperText: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  footer: {
    padding: "20px 40px",
    background: "#f8fafc",
    borderTop: "1px solid #e2e8f0"
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px"
  },
  developerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  avatar: {
    width: "36px",
    height: "36px",
    background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "600",
    fontSize: "14px"
  },
  developerName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1e293b",
    margin: "0"
  },
  developerRole: {
    fontSize: "12px",
    color: "#64748b",
    margin: "4px 0 0 0"
  },
  status: {
    display: "flex",
    alignItems: "center",
    gap: "24px"
  },
  statusItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: "#475569"
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#10b981"
  },
  separator: {
    width: "1px",
    height: "16px",
    backgroundColor: "#cbd5e1"
  },
  // Side panel styles
  sideHeader: {
    background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
    color: "white",
    padding: "24px 32px"
  },
  sideTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  sideSubtitle: {
    fontSize: "12px",
    opacity: "0.9",
    margin: "0"
  },
  phcListContainer: {
    flex: "1",
    overflowY: "auto",
    padding: "24px 32px"
  },
  phcSectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 16px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  phcList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  phcItem: {
    padding: "16px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    transition: "all 0.2s ease"
  },
  phcName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1e293b",
    margin: "0 0 4px 0"
  },
  phcWard: {
    fontSize: "12px",
    color: "#64748b",
    margin: "0"
  },
  emergencyInfo: {
    marginTop: "24px",
    padding: "16px",
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "12px"
  },
  emergencyTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#dc2626",
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  emergencyText: {
    fontSize: "12px",
    color: "#991b1b",
    margin: "0 0 8px 0"
  },
  emergencyButton: {
    width: "100%",
    padding: "12px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  // Disease button styles
  diseaseButton: {
    padding: "10px 15px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease",
    color: "white",
    flex: "1"
  }
};

// Add CSS animation for loading dots
const addAnimationStyles = () => {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `;
  document.head.appendChild(styleSheet);
};

export default function AuyoPHCConnectDemo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am the Auyo PHC Health Assistant, Developed by Hamisu Isyaku, National Health Fellow. I provide health education only. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize animation styles on mount
  useEffect(() => {
    addAnimationStyles();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = trimmedInput;
    setInput("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      { 
        role: "user", 
        text: userMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    // Check if the message asks about a disease
    const diseaseResponse = getDiseaseInfo(userMessage);
    if (diseaseResponse) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { 
            role: "assistant", 
            text: diseaseResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
        ]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
          language,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          text: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: language === "ha" 
            ? "Yi hakuri, ba zan iya amsawa a yanzu ba. Don Allah sake gwadawa."
            : "Sorry, I am unable to respond right now. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getDiseaseInfo = (message) => {
    const lowerMessage = message.toLowerCase();
    const lang = language;
    
    // Check for disease mentions
    for (const [diseaseKey, diseaseData] of Object.entries(DISEASE_INFO)) {
      const diseaseName = diseaseData[lang].name.toLowerCase();
      
      if (lowerMessage.includes(diseaseName.toLowerCase()) || 
          lowerMessage.includes(diseaseKey) ||
          lowerMessage.includes(`about ${diseaseKey}`) ||
          lowerMessage.includes(`${diseaseKey} symptoms`) ||
          lowerMessage.includes(`${diseaseKey} prevention`) ||
          lowerMessage.includes(`${diseaseKey} treatment`)) {
        
        const info = diseaseData[lang];
        
        let response = `📋 **${info.name} Information**\n\n`;
        
        response += `🚨 **${lang === 'ha' ? 'Alamu (Symptoms)' : 'Symptoms'}:**\n`;
        info.symptoms.forEach((symptom, i) => {
          response += `• ${symptom}\n`;
        });
        
        response += `\n🛡️ **${lang === 'ha' ? 'Hana (Prevention)' : 'Prevention'}:**\n`;
        info.prevention.forEach((prevent, i) => {
          response += `• ${prevent}\n`;
        });
        
        response += `\n💊 **${lang === 'ha' ? 'Maganin (Treatment)' : 'Treatment'}:**\n`;
        info.treatment.forEach((treatment, i) => {
          response += `• ${treatment}\n`;
        });
        
        response += `\n⚠️ **${lang === 'ha' ? 'Gargaɗi' : 'Warning'}:** ${info.warning}\n\n`;
        response += `${lang === 'ha' ? 'Tuntuɓi likita nan da nan idan alamun suka tsananta.' : 'Contact a doctor immediately if symptoms worsen.'}`;
        
        return response;
      }
    }
    
    return null;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showDiseaseInfo = (diseaseKey) => {
    const info = DISEASE_INFO[diseaseKey][language];
    
    let response = `📋 **${info.name} Information**\n\n`;
    
    response += `🚨 **${language === 'ha' ? 'Alamu (Symptoms)' : 'Symptoms'}:**\n`;
    info.symptoms.forEach((symptom, i) => {
      response += `• ${symptom}\n`;
    });
    
    response += `\n🛡️ **${language === 'ha' ? 'Hana (Prevention)' : 'Prevention'}:**\n`;
    info.prevention.forEach((prevent, i) => {
      response += `• ${prevent}\n`;
    });
    
    response += `\n💊 **${language === 'ha' ? 'Maganin (Treatment)' : 'Treatment'}:**\n`;
    info.treatment.forEach((treatment, i) => {
      response += `• ${treatment}\n`;
    });
    
    response += `\n⚠️ **${language === 'ha' ? 'Gargaɗi' : 'Warning'}:** ${info.warning}\n\n`;
    response += `${language === 'ha' ? 'Tuntuɓi likita nan da nan idan alamun suka tsananta.' : 'Contact a doctor immediately if symptoms worsen.'}`;

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    ]);
  };

  const clearChat = () => {
    if (window.confirm(language === "ha" 
      ? "Shin kuna son share duk tattaunawar?" 
      : "Are you sure you want to clear all messages?"
    )) {
      setMessages([
        {
          role: "assistant",
          text: language === "ha"
            ? "Sannu! Ni ne Mataimakin Kiwon Lafiya na Auyo PHC, wanda Hamisu Isyaku, Fellow na Kiwon Lafiya na ƙasa ya haɓaka. Ina ba da ilimin kiwon lafiya kawai. Ta yaya zan iya taimaka muku a yau?"
            : "Hello! I am the Auyo PHC Health Assistant, Developed by Hamisu Isyaku, National Health Fellow. I provide health education only. How can I help you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const welcomeMessages = {
    en: "Tech-driven community health assistant",
    ha: "Mataimakin kiwon lafiyar al'umma mai amfani da fasaha"
  };

  const quickQuestions = {
    en: [
      "What are symptoms of malaria?",
      "How to prevent typhoid?",
      "Diabetes treatment options",
      "Cholera prevention methods",
      "Show all disease information"
    ],
    ha: [
      "Menene alamun zazzabin cizon sauro?",
      "Yaya ake hana typhoid?",
      "Hanyoyin maganin ciwon sukari",
      "Hanyoyin hana kwalara",
      "Nuna duk bayanan cututtuka"
    ]
  };

  const handleQuickQuestion = (question, index) => {
    if (question.includes("disease information") || question.includes("bayanan cututtuka")) {
      showAllDiseases();
    } else {
      setInput(question);
    }
  };

  const showAllDiseases = () => {
    const lang = language;
    let response = `🏥 **${lang === 'ha' ? 'Bayanan Cututtuka Gabaɗaya' : 'Complete Disease Information'}**\n\n`;
    
    Object.entries(DISEASE_INFO).forEach(([diseaseKey, diseaseData]) => {
      const info = diseaseData[lang];
      response += `📋 **${info.name}**\n`;
      response += `   🚨 ${lang === 'ha' ? 'Alamu' : 'Symptoms'}: ${info.symptoms.slice(0, 2).join(', ')}...\n`;
      response += `   🛡️ ${lang === 'ha' ? 'Hana' : 'Prevention'}: ${info.prevention.slice(0, 2).join(', ')}...\n\n`;
    });
    
    response += `${lang === 'ha' 
      ? 'Don cikakken bayani game da kowane cuta, danna maɓallin da ke sama.' 
      : 'For detailed information about any disease, click the buttons above.'}`;

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    ]);
  };

  const handleEmergencyCall = () => {
    if (window.confirm(language === "ha" 
      ? "Za a kira lambar gaggawa 112. Shin kuna ci gaba?" 
      : "Emergency number 112 will be called. Do you want to continue?"
    )) {
      window.open('tel:112');
    }
  };

  // Helper functions for dynamic styles
  const getLanguageButtonStyle = (isActive) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: isActive ? "1px solid #3b82f6" : "1px solid transparent",
    background: isActive ? "#dbeafe" : "#f1f5f9",
    color: isActive ? "#1d4ed8" : "#475569",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "none"
  });

  const getActionButtonStyle = (isPrimary) => ({
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.2s ease",
    background: isPrimary ? "#10b981" : "#f1f5f9",
    color: isPrimary ? "white" : "#475569"
  });

  const getDiseaseButtonStyle = (color) => ({
    ...styles.diseaseButton,
    background: color
  });

  const getMessageContainerStyle = (isUser) => ({
    display: "flex",
    justifyContent: isUser ? "flex-end" : "flex-start",
    marginBottom: "16px"
  });

  const getMessageBubbleStyle = (isUser) => ({
    maxWidth: "75%",
    borderRadius: "18px",
    padding: "16px 20px",
    background: isUser 
      ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" 
      : "white",
    color: isUser ? "white" : "#1e293b",
    border: isUser ? "none" : "1px solid #e2e8f0",
    boxShadow: isUser ? "0 4px 12px rgba(59, 130, 246, 0.3)" : "0 2px 8px rgba(0, 0, 0, 0.05)"
  });

  const getMessageSenderStyle = (isUser) => ({
    fontSize: "12px",
    fontWeight: "600",
    color: isUser ? "rgba(255, 255, 255, 0.9)" : "#3b82f6"
  });

  const getMessageTimeStyle = (isUser) => ({
    fontSize: "11px",
    color: isUser ? "rgba(255, 255, 255, 0.7)" : "#64748b"
  });

  const getSendButtonStyle = (isDisabled) => ({
    padding: "16px 32px",
    background: isDisabled 
      ? "#cbd5e1" 
      : "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)"
  });

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Main Chat Card */}
        <div style={styles.mainCard}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.logoContainer}>
                <div style={styles.logoIcon}>🏥</div>
                <div>
                  <h1 style={styles.title}>Auyo PHC Connect</h1>
                  <p style={styles.subtitle}>{welcomeMessages[language]}</p>
                </div>
              </div>
              <div style={styles.version}>
                <p style={styles.versionLabel}>Demo Version</p>
                <p style={styles.versionNumber}>v1.0.0</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={styles.controls}>
            <div style={styles.languageSelector}>
              <span style={styles.languageLabel}>Language:</span>
              <div style={styles.languageButtons}>
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    style={getLanguageButtonStyle(language === code)}
                    onMouseEnter={(e) => {
                      if (language !== code) {
                        e.currentTarget.style.background = "#e2e8f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (language !== code) {
                        e.currentTarget.style.background = "#f1f5f9";
                      }
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Disease Quick Buttons */}
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <h3 style={styles.quickQuestionsTitle}>
                <span>🩺</span>
                {language === "ha" ? "Bayanan Cututtuka" : "Disease Information"}
              </h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => showDiseaseInfo("malaria")}
                  style={getDiseaseButtonStyle("#ef4444")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>🦟</span>
                  <span>{DISEASE_INFO.malaria[language].name}</span>
                </button>
                <button
                  onClick={() => showDiseaseInfo("typhoid")}
                  style={getDiseaseButtonStyle("#f97316")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>🤒</span>
                  <span>{DISEASE_INFO.typhoid[language].name}</span>
                </button>
                <button
                  onClick={() => showDiseaseInfo("diabetes")}
                  style={getDiseaseButtonStyle("#8b5cf6")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>🍬</span>
                  <span>{DISEASE_INFO.diabetes[language].name}</span>
                </button>
                <button
                  onClick={() => showDiseaseInfo("cholera")}
                  style={getDiseaseButtonStyle("#06b6d4")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.9";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <span>💧</span>
                  <span>{DISEASE_INFO.cholera[language].name}</span>
                </button>
              </div>
            </div>

            {/* Quick Questions */}
            <div style={styles.quickQuestions}>
              <h3 style={styles.quickQuestionsTitle}>
                <span>💡</span>
                {language === "ha" ? "Tambayoyi da Sauri" : "Quick Questions"}
              </h3>
              <div style={styles.questionsGrid}>
                {quickQuestions[language].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question, index)}
                    style={styles.questionButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#e0f2fe";
                      e.currentTarget.style.borderColor = "#7dd3fc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionButtons}>
              <button 
                onClick={showAllDiseases}
                style={getActionButtonStyle(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#10b981";
                }}
              >
                <span>🩺</span>
                <span>{language === "ha" ? "Dukkan Cututtuka" : "All Diseases"}</span>
              </button>
              <button 
                onClick={clearChat}
                style={getActionButtonStyle(false)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e2e8f0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f1f5f9";
                }}
              >
                <span>🗑️</span>
                <span>{language === "ha" ? "Share" : "Clear Chat"}</span>
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div style={styles.chatContainer}>
            {/* Messages Area */}
            <div style={styles.messagesArea}>
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <div key={index} style={getMessageContainerStyle(isUser)}>
                    <div style={getMessageBubbleStyle(isUser)}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "8px"
                      }}>
                        <span style={getMessageSenderStyle(isUser)}>
                          {isUser 
                            ? (language === "ha" ? "Kai" : "You") 
                            : (language === "ha" ? "Mataimakin Lafiya" : "Health Assistant")}
                        </span>
                        <span style={getMessageTimeStyle(isUser)}>
                          {msg.timestamp}
                        </span>
                      </div>
                      <div style={styles.messageText}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {isLoading && (
                <div style={styles.loadingContainer}>
                  <div style={styles.loadingBubble}>
                    <div style={styles.loadingDots}>
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#3b82f6",
                        animation: "bounce 1.4s infinite 0ms"
                      }}></div>
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#3b82f6",
                        animation: "bounce 1.4s infinite 200ms"
                      }}></div>
                      <div style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: "#3b82f6",
                        animation: "bounce 1.4s infinite 400ms"
                      }}></div>
                      <span style={styles.loadingText}>
                        {language === "ha" ? "Ana amsa..." : "Assistant is typing..."}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={styles.inputArea}>
              <div style={styles.inputContainer}>
                <div style={styles.inputWrapper}>
                  <input
                    type="text"
                    placeholder={
                      language === "ha" 
                        ? "Rubuta sakonka anan..." 
                        : "Type your health question here..."
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    style={{
                      ...styles.input,
                      ...(isLoading ? { opacity: 0.7 } : {})
                    }}
                  />
                  <div style={styles.inputActions}>
                    <button 
                      onClick={() => setInput('')}
                      style={styles.inputActionButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e2e8f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      ✕
                    </button>
                    <div style={styles.separator} />
                    <button 
                      style={styles.inputActionButton}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#e2e8f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      🎤
                    </button>
                  </div>
                </div>
                <button 
                  onClick={sendMessage} 
                  disabled={isLoading || !input.trim()}
                  style={getSendButtonStyle(isLoading || !input.trim())}
                  onMouseEnter={(e) => {
                    if (!isLoading && input.trim()) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.2)";
                  }}
                >
                  <span style={{ fontSize: "18px" }}>↗️</span>
                  <span>
                    {isLoading 
                      ? (language === "ha" ? "Aike..." : "Sending...") 
                      : (language === "ha" ? "Aika" : "Send")}
                  </span>
                </button>
              </div>
              
              {/* Input Helper */}
              <div style={styles.inputHelper}>
                <div style={styles.helperText}>
                  <span>💡</span>
                  <span>
                    {language === "ha" 
                      ? "Lura: Ba mu ba da shawarwarin likita ba" 
                      : "Note: We provide health education only"}
                  </span>
                </div>
                <div style={styles.helperText}>
                  <span>🩺</span>
                  <span>
                    {language === "ha" 
                      ? "Tambayi game da cututtuka 4" 
                      : "Ask about 4 diseases"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <div style={styles.footerContent}>
              <div style={styles.developerInfo}>
                <div style={styles.avatar}>HI</div>
                <div>
                  <p style={styles.developerName}>
                    {language === "ha" 
                      ? "An haɓaka shi ta Hamisu Isyaku" 
                      : "Developed by Hamisu Isyaku"}
                  </p>
                  <p style={styles.developerRole}>
                    {language === "ha" 
                      ? "Fellow na Kiwon Lafiya na ƙasa" 
                      : "National Health Fellow"}
                  </p>
                </div>
              </div>
              
              <div style={styles.status}>
                <div style={styles.statusItem}>
                  <div style={styles.statusDot} />
                  <span>{language === "ha" ? "Aiki" : "Online"}</span>
                </div>
                <div style={styles.separator} />
                <div style={styles.statusItem}>
                  <span>🩺</span>
                  <span>{language === "ha" ? "Cututtuka 4" : "4 Diseases"}</span>
                </div>
                <div style={styles.separator} />
                <div style={styles.statusItem}>
                  <span>🔒</span>
                  <span>{language === "ha" ? "Sirri" : "Private"}</span>
                </div>
                <div style={styles.separator} />
                <div style={styles.statusItem}>
                  <span>📊</span>
                  <span>Demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel - PHC Locations */}
        <div style={styles.sideCard}>
          <div style={styles.sideHeader}>
            <h2 style={styles.sideTitle}>
              <span>📍</span>
              {language === "ha" ? "Cibiyoyin Kiwon Lafiya" : "PHC Locations"}
            </h2>
            <p style={styles.sideSubtitle}>
              {language === "ha" 
                ? "Cibiyoyin Kiwon Lafiya na Farko a Auyo LGA" 
                : "Primary Healthcare Centres in Auyo LGA"}
            </p>
          </div>

          <div style={styles.phcListContainer}>
            <h3 style={styles.phcSectionTitle}>
              <span>🏥</span>
              {language === "ha" ? "Jerin Cibiyoyi" : "PHC List"}
            </h3>
            
            <div style={styles.phcList}>
              {PHC_LIST.map((phc, index) => {
                const [ward, name] = phc.split(" – ");
                return (
                  <div 
                    key={index} 
                    style={styles.phcItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px"
                    }}>
                      <div style={{
                        width: "24px",
                        height: "24px",
                        background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {index + 1}
                      </div>
                      <h4 style={styles.phcName}>{name}</h4>
                    </div>
                    <p style={styles.phcWard}>
                      <span style={{ fontWeight: "500", color: "#475569" }}>
                        {language === "ha" ? "Unguwa" : "Ward"}:
                      </span> {ward}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Emergency Information */}
            <div style={styles.emergencyInfo}>
              <h4 style={styles.emergencyTitle}>
                <span>🚨</span>
                {language === "ha" ? "Gaggawa" : "Emergency"}
              </h4>
              <p style={styles.emergencyText}>
                {language === "ha" 
                  ? "Idan kuna da matsalar lafiya mai tsanani, tuntuɓi asibiti nan da nan."
                  : "If you have a serious health emergency, contact a hospital immediately."}
              </p>
              <p style={{...styles.emergencyText, marginBottom: "16px"}}>
                <strong>
                  {language === "ha" 
                    ? "Lambar Gaggawa: 112"
                    : "Emergency Number: 112"}
                </strong>
              </p>
              <button 
                onClick={handleEmergencyCall}
                style={styles.emergencyButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#b91c1c";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#dc2626";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span>📞</span>
                <span>
                  {language === "ha" 
                    ? "Kira Gaggawa" 
                    : "Call Emergency"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}