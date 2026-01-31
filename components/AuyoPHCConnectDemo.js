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

// Disease Information Database (unchanged)
const DISEASE_INFO = {
  malaria: {
    en: { name: "Malaria", symptoms: ["High fever (38°C or above)", "Chills and shivering", "Headaches and body aches", "Nausea and vomiting", "Fatigue and weakness", "Sweating after fever"], prevention: ["Use mosquito nets", "Apply mosquito repellent", "Wear long-sleeved clothing", "Use window screens", "Clear stagnant water", "Take preventive medication"], treatment: ["Artemisinin-based therapy", "Paracetamol for fever", "Stay hydrated", "Complete medication course", "Seek medical help", "Hospitalization if severe"], warning: "Malaria can become severe within 24 hours." },
    ha: { name: "Zazzabin Cizon Sauro", symptoms: ["Zazzabi mai tsananin zafi", "Sanyi da rawar jiki", "Ciwon kai da ciwon jiki", "Tashin zuciya da amai", "Gajiya da rauni", "Gumi bayan zazzabi"], prevention: ["Yi amfani da gidan sauro", "Shafa maganin hana sauro", "Sanya tufafin dogon hannu", "Yi amfani da allon taga", "Kawar da ruwan datti", "Sha maganin rigakafi"], treatment: ["Dabarar haɗakar Artemisinin", "Paracetamol don rage zazzabi", "Sha ruwa mai yawa", "Cika cikakken magani", "Nemi taimakon likita", "Shigar da asibiti"], warning: "Malaria na iya zama mai tsanani a cikin sa'o'i 24." }
  },
  typhoid: {
    en: { name: "Typhoid Fever", symptoms: ["Prolonged high fever", "Headache and weakness", "Stomach pain", "Diarrhea or constipation", "Rose-colored spots", "Confusion in severe cases"], prevention: ["Drink boiled water", "Wash hands with soap", "Avoid raw fruits", "Ensure food cooked", "Get vaccination", "Practice sanitation"], treatment: ["Antibiotics", "Rest and fluids", "Fever control", "Easy digestible foods", "Complete antibiotic course", "Hospital care"], warning: "Typhoid spreads through contaminated food/water." },
    ha: { name: "Zazzabin Typhoid", symptoms: ["Zazzabi mai tsayi", "Ciwon kai da rauni", "Ciwon ciki", "Gudawa ko maitsattsa", "Tabon ja-jaja", "Rudani"], prevention: ["Sha ruwan da aka tafasa", "Wanke hannu da sabulu", "Kauce wa 'ya'yan itatuwa", "Tabbatar an dafa abinci", "Yi allurar rigakafi", "Yi tsafta"], treatment: ["Magungunan ƙwayoyin cuta", "Hutawa da ruwa", "Magungunan rage zazzabi", "Abinci mai sauƙi", "Cika maganin", "Kulawar asibiti"], warning: "Typhoid na iya yaduwa ta gurɓataccen abinci." }
  },
  diabetes: {
    en: { name: "Diabetes", symptoms: ["Increased thirst", "Frequent urination", "Extreme hunger", "Weight loss", "Fatigue", "Blurred vision"], prevention: ["Maintain healthy weight", "Exercise regularly", "Eat balanced diet", "Limit sugar", "Regular check-ups", "Manage stress"], treatment: ["Blood sugar monitoring", "Medication", "Healthy diet", "Physical activity", "Foot care", "Regular check-ups"], warning: "Diabetes requires lifelong management." },
    ha: { name: "Ciwon Sukari", symptoms: ["Ƙarar ƙishirwa", "Yawan fitsari", "Yunwa mai tsanani", "Rashin kiba", "Gajiya", "Matsalar gani"], prevention: ["Kula da nauyi", "Yin motsa jiki", "Ci abinci mai daidaito", "Iyakance sukari", "Duba lafiya", "Sarrafa damuwa"], treatment: ["Kula da sukari a jini", "Shan magani", "Abinci mai lafiya", "Motsa jiki", "Kula da ƙafafu", "Duba idanu"], warning: "Ciwon sukari yana buƙatar kulawa har abada." }
  },
  cholera: {
    en: { name: "Cholera", symptoms: ["Severe watery diarrhea", "Vomiting", "Rapid heart rate", "Loss of skin elasticity", "Dry membranes", "Low blood pressure"], prevention: ["Drink treated water", "Wash hands thoroughly", "Use sanitation", "Avoid raw seafood", "Wash produce", "Get vaccination"], treatment: ["Oral rehydration", "IV fluids", "Zinc supplements", "Antibiotics", "Continue breastfeeding", "Medical attention"], warning: "Cholera can cause death from dehydration within hours." },
    ha: { name: "Kwalara", symptoms: ["Gudawa mai tsanani", "Amai", "Ƙarar bugun zuciya", "Asarar laushin fata", "Bushewar membranes", "Ƙarancin hawan jini"], prevention: ["Sha ruwa mai lafiya", "Wanke hannu sosai", "Yi amfani da tsafta", "Kauce wa dabbobin ruwa", "Wanke kayan lambu", "Yi allurar rigakafi"], treatment: ["Maganin sake saka ruwa", "Ruwa ta hanyar jini", "Ƙarin zinc", "Magungunan ƙwayoyin cuta", "Ci gaba da shan nono", "Kula da likita"], warning: "Kwalara na iya haifar da mutuwa saboda rashin ruwa." }
  }
};

const LANGUAGES = {
  en: { label: "English", code: "en", flag: "🇬🇧" },
  ha: { label: "Hausa", code: "ha", flag: "🇳🇬" },
};

const styles = {
  container: {
    minHeight: "100vh",
    maxHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    overflow: "hidden"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "1200px",
    height: "95vh",
    overflow: "hidden"
  },
  topBar: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    padding: "15px 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  logoIcon: {
    backgroundColor: "rgba(37, 99, 235, 0.1)",
    padding: "10px",
    borderRadius: "12px",
    fontSize: "20px",
    color: "#2563eb"
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 2px 0",
    color: "#1e293b"
  },
  subtitle: {
    fontSize: "12px",
    color: "#64748b",
    margin: "0"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap"
  },
  languageButtons: {
    display: "flex",
    gap: "8px",
    backgroundColor: "#f1f5f9",
    padding: "4px",
    borderRadius: "8px"
  },
  mainContent: {
    display: "flex",
    gap: "15px",
    flex: 1,
    overflow: "hidden",
    minHeight: 0
  },
  leftPanel: {
    flex: "2",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minWidth: 0
  },
  rightPanel: {
    flex: "1",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    minWidth: "300px"
  },
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    background: "linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)"
  },
  messageText: {
    fontSize: "14px",
    lineHeight: "1.5",
    whiteSpace: "pre-line",
    margin: 0
  },
  messageBubble: {
    marginBottom: "12px",
    padding: "12px 16px",
    borderRadius: "16px",
    maxWidth: "85%",
    wordWrap: "break-word"
  },
  userMessage: {
    backgroundColor: "#3b82f6",
    color: "white",
    marginLeft: "auto",
    borderBottomRightRadius: "4px"
  },
  assistantMessage: {
    backgroundColor: "#f1f5f9",
    color: "#1e293b",
    marginRight: "auto",
    borderBottomLeftRadius: "4px"
  },
  inputArea: {
    padding: "15px 20px",
    borderTop: "1px solid #e2e8f0",
    backgroundColor: "white"
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "8px"
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#1e293b",
    outline: "none"
  },
  sendButton: {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "500",
    cursor: "pointer",
    minWidth: "80px"
  },
  quickActions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "10px"
  },
  diseaseButton: {
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    border: "none",
    color: "white",
    flexShrink: 0
  },
  sideHeader: {
    padding: "20px",
    background: "linear-gradient(135deg, #2563eb 0%, #0d9488 100%)",
    color: "white"
  },
  sideTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 4px 0"
  },
  sideSubtitle: {
    fontSize: "11px",
    opacity: 0.9,
    margin: 0
  },
  phcListContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "15px"
  },
  phcItem: {
    padding: "12px",
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
    marginBottom: "8px",
    border: "1px solid #e2e8f0"
  },
  phcName: {
    fontSize: "13px",
    fontWeight: "500",
    margin: "0 0 4px 0",
    color: "#1e293b"
  },
  phcWard: {
    fontSize: "11px",
    color: "#64748b",
    margin: 0
  },
  emergencyBox: {
    padding: "15px",
    backgroundColor: "#fef2f2",
    borderRadius: "10px",
    marginTop: "15px",
    border: "1px solid #fecaca"
  },
  emergencyButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    marginTop: "8px"
  },
  loadingDots: {
    display: "flex",
    gap: "6px",
    padding: "12px 16px",
    backgroundColor: "#f1f5f9",
    borderRadius: "16px",
    marginBottom: "12px",
    maxWidth: "120px"
  },
  dot: {
    width: "6px",
    height: "6px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%"
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f8fafc",
    borderTop: "1px solid #e2e8f0",
    fontSize: "12px",
    color: "#64748b"
  }
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

  // Auto-scroll to bottom
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

    // Check for disease info
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
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div style={styles.logoContainer}>
            <div style={styles.logoIcon}>🏥</div>
            <div>
              <h1 style={styles.title}>Auyo PHC Connect</h1>
              <p style={styles.subtitle}>
                {language === "ha" 
                  ? "Mataimakin kiwon lafiyar al'umma" 
                  : "Community health assistant"}
              </p>
            </div>
          </div>
          
          <div style={styles.controls}>
            <div style={styles.languageButtons}>
              {Object.entries(LANGUAGES).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: language === code ? "#2563eb" : "transparent",
                    color: language === code ? "white" : "#64748b",
                    fontSize: "12px",
                    fontWeight: "500",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={clearChat}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                background: "white",
                color: "#64748b",
                fontSize: "12px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              🗑️ {language === "ha" ? "Share" : "Clear"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Left Panel - Chat */}
          <div style={styles.leftPanel}>
            {/* Messages */}
            <div style={styles.messagesArea}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.messageBubble,
                    ...(msg.role === "user" ? styles.userMessage : styles.assistantMessage)
                  }}
                >
                  <div style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    marginBottom: "4px",
                    opacity: 0.8
                  }}>
                    {msg.role === "user" 
                      ? (language === "ha" ? "Kai" : "You") 
                      : (language === "ha" ? "Mataimakin" : "Assistant")}
                    <span style={{ marginLeft: "8px", fontSize: "10px" }}>
                      {msg.timestamp}
                    </span>
                  </div>
                  <div style={styles.messageText}>{msg.text}</div>
                </div>
              ))}
              
              {isLoading && (
                <div style={styles.loadingDots}>
                  <div style={{...styles.dot, animation: "bounce 1.4s infinite 0ms"}}></div>
                  <div style={{...styles.dot, animation: "bounce 1.4s infinite 200ms"}}></div>
                  <div style={{...styles.dot, animation: "bounce 1.4s infinite 400ms"}}></div>
                  <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "8px" }}>
                    {language === "ha" ? "Ana amsa..." : "Typing..."}
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={styles.inputArea}>
              <div style={styles.inputRow}>
                <input
                  type="text"
                  placeholder={
                    language === "ha" 
                      ? "Rubuta tambayar lafiya..." 
                      : "Type health question..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={styles.input}
                />
                <button 
                  onClick={sendMessage} 
                  disabled={!input.trim()}
                  style={{
                    ...styles.sendButton,
                    opacity: !input.trim() ? 0.6 : 1,
                    cursor: !input.trim() ? "not-allowed" : "pointer"
                  }}
                >
                  {language === "ha" ? "Aika" : "Send"}
                </button>
              </div>
              
              {/* Disease Quick Buttons */}
              <div style={styles.quickActions}>
                <button
                  onClick={() => showDiseaseInfo("malaria")}
                  style={{...styles.diseaseButton, backgroundColor: "#ef4444"}}
                >
                  🦟 {DISEASE_INFO.malaria[language].name}
                </button>
                <button
                  onClick={() => showDiseaseInfo("typhoid")}
                  style={{...styles.diseaseButton, backgroundColor: "#f97316"}}
                >
                  🤒 {DISEASE_INFO.typhoid[language].name}
                </button>
                <button
                  onClick={() => showDiseaseInfo("diabetes")}
                  style={{...styles.diseaseButton, backgroundColor: "#8b5cf6"}}
                >
                  🍬 {DISEASE_INFO.diabetes[language].name}
                </button>
                <button
                  onClick={() => showDiseaseInfo("cholera")}
                  style={{...styles.diseaseButton, backgroundColor: "#06b6d4"}}
                >
                  💧 {DISEASE_INFO.cholera[language].name}
                </button>
              </div>
            </div>
            
            {/* Footer */}
            <div style={styles.footer}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                <span>{language === "ha" ? "Aiki" : "Online"}</span>
                <span style={{ margin: "0 8px" }}>•</span>
                <span>{language === "ha" ? "Demo v1.0" : "Demo v1.0"}</span>
              </div>
              <div>
                {language === "ha" 
                  ? "An haɓaka ta Hamisu Isyaku" 
                  : "Developed by Hamisu Isyaku"}
              </div>
            </div>
          </div>

          {/* Right Panel - PHC Locations */}
          <div style={styles.rightPanel}>
            <div style={styles.sideHeader}>
              <h2 style={styles.sideTitle}>
                📍 {language === "ha" ? "Cibiyoyin Kiwon Lafiya" : "PHC Locations"}
              </h2>
              <p style={styles.sideSubtitle}>
                {language === "ha" 
                  ? "Cibiyoyi a Auyo LGA" 
                  : "Centers in Auyo LGA"}
              </p>
            </div>
            
            <div style={styles.phcListContainer}>
              {PHC_LIST.slice(0, 6).map((phc, index) => {
                const [ward, name] = phc.split(" – ");
                return (
                  <div key={index} style={styles.phcItem}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <div style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#2563eb",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "10px",
                        fontWeight: "600"
                      }}>
                        {index + 1}
                      </div>
                      <h4 style={styles.phcName}>{name}</h4>
                    </div>
                    <p style={styles.phcWard}>
                      <span style={{ fontWeight: "500" }}>
                        {language === "ha" ? "Unguwa" : "Ward"}:
                      </span> {ward}
                    </p>
                  </div>
                );
              })}
              
              {/* Emergency Info */}
              <div style={styles.emergencyBox}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#dc2626", marginBottom: "8px" }}>
                  🚨 {language === "ha" ? "Gaggawa" : "Emergency"}
                </div>
                <div style={{ fontSize: "12px", color: "#991b1b", marginBottom: "8px" }}>
                  {language === "ha" 
                    ? "Lambar Gaggawa: 112"
                    : "Emergency Number: 112"}
                </div>
                <button 
                  onClick={handleEmergencyCall}
                  style={styles.emergencyButton}
                >
                  📞 {language === "ha" ? "Kira Gaggawa" : "Call Emergency"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
