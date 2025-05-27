
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, TranslationKey, detectLanguageFromIP } from '@/utils/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeLanguage = async () => {
      // 먼저 저장된 언어가 있는지 확인
      const saved = localStorage.getItem('preferred-language') as Language;
      
      if (saved && (saved === 'en' || saved === 'ko')) {
        setCurrentLanguage(saved);
      } else {
        // 저장된 언어가 없으면 IP 기반 감지
        const detectedLanguage = await detectLanguageFromIP();
        setCurrentLanguage(detectedLanguage);
        localStorage.setItem('preferred-language', detectedLanguage);
      }
      
      setIsInitialized(true);
    };

    initializeLanguage();
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  useEffect(() => {
    if (isInitialized) {
      document.documentElement.lang = currentLanguage;
    }
  }, [currentLanguage, isInitialized]);

  // 언어 초기화가 완료될 때까지 로딩 표시
  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
