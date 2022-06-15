import Vue from 'vue';
import App from './App.vue';
import router from './router';
import boostrap from './plugins/bootstrap';
import jquery from './plugins/jquery';

import '@/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(boostrap);
Vue.use(jquery);

const app = new Vue({
  router,
  render: h => h(App),
});
app.$mount('#app');
