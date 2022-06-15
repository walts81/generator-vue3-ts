import { ref } from 'vue';

let messageId = 1;
const toastQueue = ref<any[]>([]);
const options = {
  autoCloseTimeout: 5000,
};

const addToast = (toast: any) => {
  const toasts = toastQueue.value;
  toasts.unshift({ ...toast, messageId: messageId++ });
  if (!!toast.duration) {
    setTimeout(() => removeToast(toast.messageId), toast.duration);
  }
};

const removeToast = (messageId: any) => {
  const toasts = toastQueue.value;
  const ix = toasts.findIndex(x => x.messageId === messageId);
  if (ix > -1) {
    toasts.splice(ix, 1);
  }
};

export { toastQueue, addToast, removeToast, options };
