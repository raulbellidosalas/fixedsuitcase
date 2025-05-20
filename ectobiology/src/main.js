import { createApp } from 'vue'

import PrimeVue from 'primevue/config';

import './style.css'
import App from './App.vue'
import {Button, Card, SelectButton, Toolbar} from "primevue";
import router from "./router/index.js";
import InputText from 'primevue/inputtext';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import 'primeicons/primeicons.css'; // PrimeIcons
import 'primeflex/primeflex.css'; // PrimeFlex

import Aura from '@primeuix/themes/aura';
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        es
    }
});


createApp(App)

    .component('pv-select-button',  SelectButton)
    .component ('pv-card', Card)
    .component('pv-input-text', InputText)
    .component('pv-button',         Button)
    .component('pv-toolbar',        Toolbar)
    .use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
})
    .use(router)
    .use(i18n)
    .mount('#app')
