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

const DISEASE_INFO = {
  malaria: {
    en: { 
      name: "Malaria", 
      symptoms: ["High fever (38°C or above)", "Chills and shivering", "Headaches and body aches", "Nausea and vomiting", "Fatigue and weakness", "Sweating after fever"], 
      prevention: ["Use mosquito nets", "Apply mosquito repellent", "Wear long-sleeved clothing", "Use window screens", "Clear stagnant water", "Take preventive medication"], 
      treatment: ["Artemisinin-based therapy", "Paracetamol for fever", "Stay hydrated", "Complete medication course", "Seek medical help", "Hospitalization if severe"], 
      warning: "Malaria can become severe within 24 hours." 
    },
    ha: { 
      name: "Zazzabin Cizon Sauro", 
      symptoms: ["Zazzabi mai tsananin zafi", "Sanyi da rawar jiki", "Ciwon kai da ciwon jiki", "Tashin zuciya da amai", "Gajiya da rauni", "Gumi bayan zazzabi"], 
      prevention: ["Yi amfani da gidan sauro", "Shafa maganin hana sauro", "Sanya tufafin dogon hannu", "Yi amfani da allon taga", "Kawar da ruwan datti", "Sha maganin rigakafi"], 
      treatment: ["Dabarar haɗakar Artemisinin", "Paracetamol don rage zazzabi", "Sha ruwa mai yawa", "Cika cikakken magani", "Nemi taimakon likita", "Shigar da asibiti"], 
      warning: "Malaria na iya zama mai tsanani a cikin sa'o'i 24." 
    }
  },
  typhoid: {
    en: { 
      name: "Typhoid Fever", 
      symptoms: ["Prolonged high fever", "Headache and weakness", "Stomach pain", "Diarrhea or constipation", "Rose-colored spots", "Confusion in severe cases"], 
      prevention: ["Drink boiled water", "Wash hands with soap", "Avoid raw fruits", "Ensure food cooked", "Get vaccination", "Practice sanitation"], 
      treatment: ["Antibiotics", "Rest and fluids", "Fever control", "Easy digestible foods", "Complete antibiotic course", "Hospital care"], 
      warning: "Typhoid spreads through contaminated food/water." 
    },
    ha: { 
      name: "Zazzabin Typhoid", 
      symptoms: ["Zazzabi mai tsayi", "Ciwon kai da rauni", "Ciwon ciki", "Gudawa ko maitsattsa", "Tabon ja-jaja", "Rudani"], 
      prevention: ["Sha ruwan da aka tafasa", "Wanke hannu da sabulu", "Kauce wa 'ya'yan itatuwa", "Tabbatar an dafa abinci", "Yi allurar rigakafi", "Yi tsafta"], 
      treatment: ["Magungunan ƙwayoyin cuta", "Hutawa da ruwa", "Magungunan rage zazzabi", "Abinci mai sauƙi", "Cika maganin", "Kulawar asibiti"], 
      warning: "Typhoid na iya yaduwa ta gurɓataccen abinci." 
    }
  },
  diabetes: {
    en: { 
      name: "Diabetes", 
      symptoms: ["Increased thirst", "Frequent urination", "Extreme hunger", "Weight loss", "Fatigue", "Blurred vision"], 
      prevention: ["Maintain healthy weight", "Exercise regularly", "Eat balanced diet", "Limit sugar", "Regular check-ups", "Manage stress"], 
      treatment: ["Blood sugar monitoring", "Medication", "Healthy diet", "Physical activity", "Foot care", "Regular check-ups"], 
      warning: "Diabetes requires lifelong management." 
    },
    ha: { 
      name: "Ciwon Sukari", 
      symptoms: ["Ƙarar ƙishirwa", "Yawan fitsari", "Yunwa mai tsanani", "Rashin kiba", "Gajiya", "Matsalar gani"], 
      prevention: ["Kula da nauyi", "Yin motsa jiki", "Ci abinci mai daidaito", "Iyakance sukari", "Duba lafiya", "Sarrafa damuwa"], 
      treatment: ["Kula da sukari a jini", "Shan magani", "Abinci mai lafiya", "Motsa jiki", "Kula da ƙafafu", "Duba idanu"], 
      warning: "Ciwon sukari yana buƙatar kulawa har abada." 
    }
  },
  cholera: {
    en: { 
      name: "Cholera", 
      symptoms: ["Severe watery diarrhea", "Vomiting", "Rapid heart rate", "Loss of skin elasticity", "Dry membranes", "Low blood pressure"], 
      prevention: ["Drink treated water", "Wash hands thoroughly", "Use sanitation", "Avoid raw seafood", "Wash produce", "Get vaccination"], 
      treatment: ["Oral rehydration", "IV fluids", "Zinc supplements", "Antibiotics", "Continue breastfeeding", "Medical attention"], 
      warning: "Cholera can cause death from dehydration within hours." 
    },
    ha: { 
      name: "Kwalara", 
      symptoms: ["Gudawa mai tsanani", "Amai", "Ƙarar bugun zuciya", "Asarar laushin fata", "Bushewar membranes", "Ƙarancin hawan jini"], 
      prevention: ["Sha ruwa mai lafiya", "Wanke hannu sosai", "Yi amfani da tsafta", "Kauce wa dabbobin ruwa", "Wanke kayan lambu", "Yi allurar rigakafi"], 
      treatment: ["Maganin sake saka ruwa", "Ruwa ta hanyar jini", "Ƙarin zinc", "Magungunan ƙwayoyin cuta", "Ci gaba da shan nono", "Kula da likita"], 
      warning: "Kwalara na iya haifar da mutuwa saboda rashin ruwa." 
    }
  }
};

const LANGUAGES = {
  en: { label: "English", code: "en", flag: "🇬🇧" },
  ha: { label: "Hausa", code: "ha", flag: "🇳🇬" },
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
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef(null);

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
      }, 800);
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

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { 
            role: "assistant", 
            text: data.message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
        ]);
      } else {
        throw new Error("API error");
      }
    } catch (error) {
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
    
    for (const [diseaseKey, diseaseData] of Object.entries(DISEASE_INFO)) {
      const diseaseName = diseaseData[lang].name.toLowerCase();
      
      if (lowerMessage.includes(diseaseName.toLowerCase()) || 
          lowerMessage.includes(diseaseKey)) {
        
        const info = diseaseData[lang];
        
        let response = `📋 **${info.name}**\n\n`;
        response += `🚨 **${lang === 'ha' ? 'Alamu' : 'Symptoms'}:**\n`;
        info.symptoms.slice(0, 3).forEach(symptom => {
          response += `• ${symptom}\n`;
        });
        
        response += `\n🛡️ **${lang === 'ha' ? 'Hana' : 'Prevention'}:**\n`;
        info.prevention.slice(0, 3).forEach(prevent => {
          response += `• ${prevent}\n`;
        });
        
        response += `\n⚠️ ${info.warning}`;
        
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
    
    let response = `📋 **${info.name}**\n\n`;
    response += `🚨 **${language === 'ha' ? 'Alamu' : 'Symptoms'}:**\n`;
    info.symptoms.forEach(symptom => {
      response += `• ${symptom}\n`;
    });
    
    response += `\n🛡️ **${language === 'ha' ? 'Hana' : 'Prevention'}:**\n`;
    info.prevention.forEach(prevent => {
      response += `• ${prevent}\n`;
    });
    
    response += `\n💊 **${language === 'ha' ? 'Maganin' : 'Treatment'}:**\n`;
    info.treatment.forEach(treatment => {
      response += `• ${treatment}\n`;
    });
    
    response += `\n⚠️ ${info.warning}`;

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

  const clearChat = () => {
    if (window.confirm(language === "ha" 
      ? "Shin kuna son share duk tattaunawar?" 
      : "Clear all messages?"
    )) {
      setMessages([
        {
          role: "assistant",
          text: language === "ha"
            ? "Sannu! Ni ne Mataimakin Kiwon Lafiya na Auyo PHC. Ta yaya zan iya taimaka muku a yau?"
            : "Hello! I am the Auyo PHC Health Assistant. How can I help you today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="app-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .wrapper {
          width: 100%;
          height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          background: white;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        @media (min-width: 768px) {
          .wrapper {
            height: 95vh;
            border-radius: 24px;
            overflow: hidden;
          }
        }

        /* Header */
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px 24px;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          position: relative;
          z-index: 10;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          min-width: 0;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .title-section {
          min-width: 0;
        }

        .app-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
        }

        .app-subtitle {
          font-size: 13px;
          opacity: 0.9;
          margin: 0;
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lang-switcher {
          display: flex;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          padding: 4px;
          border-radius: 10px;
          gap: 4px;
        }

        .lang-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: white;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lang-btn.active {
          background: white;
          color: #667eea;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .clear-btn {
          width: 40px;
          height: 40px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clear-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        /* Mobile Tabs */
        .mobile-tabs {
          display: flex;
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }

        @media (min-width: 768px) {
          .mobile-tabs {
            display: none;
          }
        }

        .tab-btn {
          flex: 1;
          padding: 16px;
          background: none;
          border: none;
          font-size: 15px;
          font-weight: 600;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-btn.active {
          color: #667eea;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #667eea;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .mobile-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .mobile-view {
            display: none;
          }
        }

        .desktop-view {
          display: none;
        }

        @media (min-width: 768px) {
          .desktop-view {
            display: flex;
            flex: 1;
            gap: 24px;
            padding: 24px;
            overflow: hidden;
          }
        }

        /* Chat Panel */
        .chat-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
        }

        .desktop-chat {
          flex: 2;
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          scroll-behavior: smooth;
        }

        .message {
          margin-bottom: 16px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-bubble {
          max-width: 85%;
          padding: 14px 18px;
          border-radius: 18px;
          word-wrap: break-word;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .message.user .message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 4px;
        }

        .message.assistant .message-bubble {
          background: white;
          color: #1e293b;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 4px;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 600;
          opacity: 0.9;
        }

        .message-time {
          font-size: 11px;
          opacity: 0.7;
        }

        .message-text {
          font-size: 15px;
          line-height: 1.6;
          white-space: pre-line;
        }

        /* Loading Indicator */
        .loading-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 18px;
          background: white;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          max-width: 120px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #667eea;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Input Area */
        .input-area {
          padding: 20px;
          background: white;
          border-top: 1px solid #e2e8f0;
        }

        .input-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .message-input {
          flex: 1;
          padding: 14px 18px;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          font-size: 15px;
          font-family: inherit;
          color: #1e293b;
          transition: all 0.3s ease;
          outline: none;
        }

        .message-input:focus {
          border-color: #667eea;
          background: white;
        }

        .send-btn {
          padding: 14px 28px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Disease Buttons */
        .disease-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .disease-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .disease-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .disease-btn.malaria { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
        .disease-btn.typhoid { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
        .disease-btn.diabetes { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }
        .disease-btn.cholera { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }

        /* PHC Panel */
        .phc-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: white;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }

        .phc-panel.active {
          transform: translateX(0);
        }

        @media (min-width: 768px) {
          .phc-panel {
            position: static;
            transform: none;
            flex: 1;
            max-width: 400px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }
        }

        .phc-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 24px;
          color: white;
        }

        .phc-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 6px 0;
        }

        .phc-subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        .phc-list {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .phc-item {
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .phc-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #667eea;
        }

        .phc-item-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .phc-number {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .phc-name {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }

        .phc-ward {
          font-size: 13px;
          color: #64748b;
          margin: 0;
        }

        .phc-ward strong {
          color: #475569;
        }

        /* Emergency Box */
        .emergency-box {
          margin-top: 20px;
          padding: 20px;
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-radius: 12px;
          border: 2px solid #fecaca;
        }

        .emergency-title {
          font-size: 16px;
          font-weight: 700;
          color: #dc2626;
          margin: 0 0 12px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .emergency-text {
          font-size: 14px;
          color: #991b1b;
          margin: 0 0 16px 0;
        }

        .emergency-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
        }

        .emergency-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
        }

        /* Footer */
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          font-size: 13px;
          color: #64748b;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .footer-credit {
          font-size: 12px;
          text-align: center;
        }

        .footer-version {
          font-size: 11px;
          color: #94a3b8;
        }

        /* Scrollbar Styling */
        .messages-area::-webkit-scrollbar,
        .phc-list::-webkit-scrollbar {
          width: 6px;
        }

        .messages-area::-webkit-scrollbar-track,
        .phc-list::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .messages-area::-webkit-scrollbar-thumb,
        .phc-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .messages-area::-webkit-scrollbar-thumb:hover,
        .phc-list::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Responsive Adjustments */
        @media (max-width: 480px) {
          .header {
            padding: 16px 20px;
          }

          .app-title {
            font-size: 18px;
          }

          .app-subtitle {
            font-size: 12px;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .disease-btn {
            font-size: 12px;
            padding: 8px 12px;
          }
        }
      `}</style>

      <div className="wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">🏥</div>
              <div className="title-section">
                <h1 className="app-title">Auyo PHC Connect</h1>
                <p className="app-subtitle">
                  {language === "ha" 
                    ? "Mataimakin kiwon lafiyar al'umma" 
                    : "Community health assistant"}
                </p>
              </div>
            </div>
            
            <div className="header-controls">
              <div className="lang-switcher">
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`lang-btn ${language === code ? 'active' : ''}`}
                  >
                    <span>{lang.flag}</span>
                    <span>{code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              
              <button onClick={clearChat} className="clear-btn" title="Clear chat">
                🗑️
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="mobile-tabs">
          <button
            onClick={() => setActiveTab("chat")}
            className={`tab-btn ${activeTab === "chat" ? 'active' : ''}`}
          >
            💬 {language === "ha" ? "Tattaunawa" : "Chat"}
          </button>
          <button
            onClick={() => setActiveTab("phc")}
            className={`tab-btn ${activeTab === "phc" ? 'active' : ''}`}
          >
            📍 {language === "ha" ? "Cibiyoyi" : "PHCs"}
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Mobile View */}
          <div className="mobile-view">
            {/* Chat Panel */}
            <div className="chat-panel" style={{ display: activeTab === "chat" ? "flex" : "none" }}>
              <div className="messages-area">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`}>
                    <div className="message-bubble">
                      <div className="message-header">
                        <span>
                          {msg.role === "user" 
                            ? (language === "ha" ? "Kai" : "You") 
                            : (language === "ha" ? "Mataimakin" : "Assistant")}
                        </span>
                        <span className="message-time">{msg.timestamp}</span>
                      </div>
                      <div className="message-text">{msg.text}</div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="loading-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="input-area">
                <div className="input-row">
                  <input
                    type="text"
                    className="message-input"
                    placeholder={language === "ha" ? "Rubuta tambayar lafiya..." : "Type health question..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={!input.trim()}
                    className="send-btn"
                  >
                    {language === "ha" ? "Aika" : "Send"}
                  </button>
                </div>
                
                <div className="disease-buttons">
                  <button onClick={() => showDiseaseInfo("malaria")} className="disease-btn malaria">
                    🦟 {DISEASE_INFO.malaria[language].name}
                  </button>
                  <button onClick={() => showDiseaseInfo("typhoid")} className="disease-btn typhoid">
                    🤒 {DISEASE_INFO.typhoid[language].name}
                  </button>
                  <button onClick={() => showDiseaseInfo("diabetes")} className="disease-btn diabetes">
                    🍬 {DISEASE_INFO.diabetes[language].name}
                  </button>
                  <button onClick={() => showDiseaseInfo("cholera")} className="disease-btn cholera">
                    💧 {DISEASE_INFO.cholera[language].name}
                  </button>
                </div>
              </div>

              <div className="footer">
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  <span>{language === "ha" ? "Aiki" : "Online"}</span>
                </div>
                <div className="footer-credit">
                  {language === "ha" ? "An haɓaka ta Hamisu Isyaku" : "Developed by Hamisu Isyaku"}
                </div>
                <div className="footer-version">v1.0</div>
              </div>
            </div>

            {/* PHC Panel (Mobile) */}
            <div className={`phc-panel ${activeTab === "phc" ? 'active' : ''}`}>
              <div className="phc-header">
                <h2 className="phc-title">
                  📍 {language === "ha" ? "Cibiyoyin Kiwon Lafiya" : "PHC Locations"}
                </h2>
                <p className="phc-subtitle">
                  {language === "ha" ? "Cibiyoyi a Auyo LGA" : "Centers in Auyo LGA"}
                </p>
              </div>
              
              <div className="phc-list">
                {PHC_LIST.map((phc, index) => {
                  const [ward, name] = phc.split(" – ");
                  return (
                    <div key={index} className="phc-item">
                      <div className="phc-item-header">
                        <div className="phc-number">{index + 1}</div>
                        <h4 className="phc-name">{name}</h4>
                      </div>
                      <p className="phc-ward">
                        <strong>{language === "ha" ? "Unguwa" : "Ward"}:</strong> {ward}
                      </p>
                    </div>
                  );
                })}
                
                <div className="emergency-box">
                  <div className="emergency-title">
                    🚨 {language === "ha" ? "Gaggawa" : "Emergency"}
                  </div>
                  <div className="emergency-text">
                    {language === "ha" ? "Lambar Gaggawa: 112" : "Emergency Number: 112"}
                  </div>
                  <button onClick={handleEmergencyCall} className="emergency-btn">
                    📞 {language === "ha" ? "Kira Gaggawa" : "Call Emergency"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="desktop-view">
            {/* Chat Panel */}
            <div className="desktop-chat">
              <div className="messages-area">
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`}>
                    <div className="message-bubble">
                      <div className="message-header">
                        <span>
                          {msg.role === "user" 
                            ? (language === "ha" ? "Kai" : "You") 
                            : (language === "ha" ? "Mataimakin" : "Assistant")}
                        </span>
                        <span className="message-time">{msg.timestamp}</span>
                      </div>
                      <div className="message-text">{msg.text}</div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="loading-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="input-area">
                <div className="input-row">
                  <input
                    type="text"
                    className="message-input"
                    placeholder={language === "ha" ? "Rubuta tambayar lafiya..." : "Type health question..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={!input.trim()}
                    className="send-btn"
                  >
                    {language === "ha" ? "Aika" : "Send"}
                  </button>
                </div>
                
                <div className="disease-buttons">
                  <button onClick={() => showDiseaseInfo("malaria")} className="disease-btn malaria">
                    🦟 {DISEASE_INFO.malaria[language].name}
                  </button>
                  <button onClick={() => showDiseaseInfo("typhoid")} className="disease-btn typhoid">
                    🤒 {DISEASE_INFO.typhoid[language].name}
                  </button>
                  <button onClick={() => showDiseaseInfo("diabetes")} className="disease-btn diabetes">
                    🍬 {DISEASE_INFO.diabetes[language].name}
                  </button>
                  <button onClick={() => showDiseaseInfo("cholera")} className="disease-btn cholera">
                    💧 {DISEASE_INFO.cholera[language].name}
                  </button>
                </div>
              </div>

              <div className="footer">
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  <span>{language === "ha" ? "Aiki" : "Online"}</span>
                </div>
                <div className="footer-credit">
                  {language === "ha" ? "An haɓaka ta Hamisu Isyaku" : "Developed by Hamisu Isyaku"}
                </div>
                <div className="footer-version">v1.0</div>
              </div>
            </div>

            {/* PHC Panel (Desktop) */}
            <div className="phc-panel active">
              <div className="phc-header">
                <h2 className="phc-title">
                  📍 {language === "ha" ? "Cibiyoyin Kiwon Lafiya" : "PHC Locations"}
                </h2>
                <p className="phc-subtitle">
                  {language === "ha" ? "Cibiyoyi a Auyo LGA" : "Centers in Auyo LGA"}
                </p>
              </div>
              
              <div className="phc-list">
                {PHC_LIST.map((phc, index) => {
                  const [ward, name] = phc.split(" – ");
                  return (
                    <div key={index} className="phc-item">
                      <div className="phc-item-header">
                        <div className="phc-number">{index + 1}</div>
                        <h4 className="phc-name">{name}</h4>
                      </div>
                      <p className="phc-ward">
                        <strong>{language === "ha" ? "Unguwa" : "Ward"}:</strong> {ward}
                      </p>
                    </div>
                  );
                })}
                
                <div className="emergency-box">
                  <div className="emergency-title">
                    🚨 {language === "ha" ? "Gaggawa" : "Emergency"}
                  </div>
                  <div className="emergency-text">
                    {language === "ha" ? "Lambar Gaggawa: 112" : "Emergency Number: 112"}
                  </div>
                  <button onClick={handleEmergencyCall} className="emergency-btn">
                    📞 {language === "ha" ? "Kira Gaggawa" : "Call Emergency"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
