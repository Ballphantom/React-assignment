import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function useLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);
}

export default useLanguage;