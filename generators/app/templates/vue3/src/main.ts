import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import bootstrap from './mixins/bootstrap';

import '@/styles/main.scss';

const app = createApp(App)
  .use(bootstrap)
  .use(router);

app.mount('#app');
