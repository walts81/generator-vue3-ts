import * as bootstrap from 'bootstrap';

export default {
  install(Vue: any) {
    Vue.prototype.bootstrap = bootstrap;
  },
};
