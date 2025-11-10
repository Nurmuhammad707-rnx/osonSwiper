
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("RU"); 

  // const toggleLanguage = () => {
  //   setLanguage(prev => (prev === "ru" ? "uz" : "ru"));
  // };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "RU" ? "UZ" : "RU"));
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
