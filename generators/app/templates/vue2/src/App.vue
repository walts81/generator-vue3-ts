<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <div class="toast-container position-absolute p-3 bottom-0 end-0">
      <toast-message
        v-for="item in toastMessages"
        :messageId="item.messageId"
        :title="item.title"
        :text="item.text"
        :icon="item.icon"
        :auto-close="item.autoClose"
        :key="item.messageId"
        @close="onCloseToast($event)"
      ></toast-message>
    </div>
    <busy-spinner :is-on="isAppBusy"></busy-spinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { toastQueueVm, removeToast } from './components/toast-queue';
import { isBusyVm } from './components/set-busy';
import BusySpinner from './components/spinners/Ring.vue';
import ToastMessage from './components/toast.vue';

@Component({
  components: {
    BusySpinner,
    ToastMessage,
  },
})
export default class App extends Vue {
  get isAppBusy() {
    return isBusyVm.isBusy;
  }

  get toastMessages() {
    return toastQueueVm.toastQueue;
  }

  onCloseToast(messageId: number) {
    removeToast(messageId);
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
