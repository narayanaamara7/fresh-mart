import { useAuthStore } from '../store/useStore';
import { translations, type Language } from '../utils/translations';

export const useTranslation = () => {
  const language = useAuthStore((state) => state.language) as Language;

  const t = (key: keyof typeof translations['en'], params?: Record<string, any>) => {
    let translation = translations[language][key] || translations['en'][key] || key;
    
    if (params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return translation;
  };

  return { t, language };
};
