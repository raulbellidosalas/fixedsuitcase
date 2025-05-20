import { createApp } from 'vue'

import PrimeVue from 'primevue/config';


import './style.css'
import App from './App.vue'

import {Button, Card, SelectButton, Toolbar} from "primevue";
import router from "./router/index.js";
import InputText from 'primevue/inputtext';
import 'primeicons/primeicons.css'; // PrimeIcons
import 'primeflex/primeflex.css'; // PrimeFlex

import Aura from '@primeuix/themes/aura';
import i18n from "./i18n.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

createApp(App)
    .component('pv-select-button',  SelectButton)
    .component ('pv-card', Card)
    .component('pv-input-text', InputText)
    .component('pv-button',         Button)
    .component('pv-toolbar',        Toolbar)
    .component('pv-data-table', DataTable)
    .component('pv-column', Column)
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
