<template>
  <div
    class="toast bg-secondary text-white"
    ref="toastRef"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header">
      <i :class="icon" v-if="!!icon"></i>
      <strong class="me-auto">{{ title }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
        @click="dismissThis()"
      ></button>
    </div>
    <div class="toast-body text-start" v-html="text"></div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { Toast } from 'bootstrap';
import { options } from './toast-queue';

export default {
  emits: ['close'],
  props: {
    icon: String,
    messageId: Number,
    title: String,
    text: String,
    autoClose: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    let toast: Toast = null as any;
    const toastRef: any = ref(null);
    onMounted(() => {
      if (!!toastRef.value) {
        toast = new Toast(toastRef.value, { autohide: false });
        toast.show();
      }
      if (props.autoClose) {
        const delay = options.autoCloseTimeout;
        setTimeout(() => {
          dismissThis();
        }, delay);
      }
    });
    const dismissThis = () => {
      const id = props.messageId;
      emit('close', id);
    };
    return { onMounted, toastRef, dismissThis };
  },
};
</script>
