import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRegistry from './translations/transalationRegister';

const loadTranslations = async () => {
  const languages = Object.keys(translationRegistry);
  const resources = {};

  for (const lng of languages) {
    resources[lng] = {};
    for (const namespace in translationRegistry[lng]) {
      const translationLoader = translationRegistry[lng][namespace];
      resources[lng][namespace] = (await translationLoader()).default;
    }
  }

  return resources;
};

(async () => {
  const resources = await loadTranslations();

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', 
      fallbackLng: 'en',
      ns: Object.keys(translationRegistry.en), 
      interpolation: {
        escapeValue: false, 
      },
    });
})();

export default i18n;
