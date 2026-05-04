import { createApp } from 'vue';
import VueGtag from 'vue-gtag';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';

import TheHeader from './components/layout/TheHeader.vue';
import BaseButton from './components/ui/BaseButton.vue';


const app = createApp(App)

app.use(router);
app.use(store);
app.use(VueGtag, { config: { id: 'G-NHH4PSXSZ8' } }, router);

app.component('the-header', TheHeader);
app.component('base-button',BaseButton);

app.mount('#app');
