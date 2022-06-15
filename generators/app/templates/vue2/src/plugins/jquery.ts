declare const $: any;

export default {
  install(Vue: any) {
    Vue.prototype.$ = $;
  },
};
