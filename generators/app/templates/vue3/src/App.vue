<template>
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
</template>

<script lang="ts">
import { computed } from 'vue';
import { toastQueue, removeToast } from './components/toast-queue';
import { isBusy } from './components/set-busy';
import BusySpinner from './components/spinners/Ring.vue';
import ToastMessage from './components/toast.vue';

export default {
  components: { BusySpinner, ToastMessage },
  setup() {
    const isAppBusy = computed(() => isBusy.value);
    const toastMessages = computed(() => toastQueue.value);
    const onCloseToast = (messageId: number) => {
      removeToast(messageId);
    };
    return { toastMessages, onCloseToast, isAppBusy };
  },
};
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
