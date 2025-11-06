
// import { createContext, useContext, useState } from "react";

// const LanguageContext = createContext();

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState("ru");

//   const toggleLanguage = (lang) => {
//     if (lang) setLanguage(lang);
//     else setLanguage((prev) => (prev === "ru" ? "uz" : "ru"));
//   };

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };

// export const useLanguage = () => useContext(LanguageContext);
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ru"); // default ruscha

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "ru" ? "uz" : "ru"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
