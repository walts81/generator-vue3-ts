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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Toast } from 'bootstrap';
import { options } from './toast-queue';

@Component
export default class ToastComponent extends Vue {
  @Prop(String) icon!: string;
  @Prop(Number) messageId!: number;
  @Prop(String) title!: string;
  @Prop(String) text!: string;
  @Prop({ type: Boolean, default: false }) autoClose!: boolean;

  toast: Toast = null as any;

  mounted() {
    const toastRef = this.$refs.toastRef;
    if (!!toastRef) {
      this.toast = new Toast(toastRef as any, { autohide: false });
      this.toast.show();
    }
    if (this.autoClose) {
      const delay = options.autoCloseTimeout;
      setTimeout(() => {
        this.dismissThis();
      }, delay);
    }
  }

  dismissThis() {
    const id = this.messageId;
    this.$emit('close', id);
  }
}
</script>
