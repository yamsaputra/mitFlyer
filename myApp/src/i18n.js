// Framework import statements.
import { createI18n } from 'vue-i18n';
import { watch } from 'vue';

// Locale import statements.
import loginPage from './locales/loginPage.js';
import signupPage from './locales/signupPage.js';
import trustPage from './locales/trustPage.js';
import store from './store.js';
import messagePage from './locales/messagePage.js';
import accountPage from './locales/accountPage.js';
import packagePage from './locales/packagePage.js';
import homePage from './locales/homePage.js';
import ionTabs from './locales/ion-tabs.js';
import listPage from './locales/listPage.js';
import routePage from './locales/routePage.js';

const messages = {
    en: {
        ...loginPage.en,
        ...signupPage.en,
        ...trustPage.en,
        ...messagePage.en,
        ...accountPage.en,
        ...packagePage.en,
        ...homePage.en,
        ...ionTabs.en,
        ...listPage.en,
        ...routePage.en
    },
    de: {
        ...loginPage.de,
        ...signupPage.de,
        ...trustPage.de,
        ...messagePage.de,
        ...accountPage.de,
        ...packagePage.de,
        ...homePage.de,
        ...ionTabs.de,
        ...listPage.de,
        ...routePage.de
    },
    id: {
        ...loginPage.id,
        ...signupPage.id,
        ...trustPage.id,
        ...messagePage.id,
        ...accountPage.id,
        ...packagePage.id,
        ...homePage.id,
        ...ionTabs.id,
        ...listPage.id,
        ...routePage.id
    }
};

export default {
    setup() {
      const { locale } = i18n.global;
  
      watch(
        () => store.state.locale,
        (newLocale) => {
          locale.value = newLocale;
        }
      );
    }
  };

export const i18n = createI18n({
    legacy: false, // Use Composition API mode
    locale: 'en', // default language
    messages
  });