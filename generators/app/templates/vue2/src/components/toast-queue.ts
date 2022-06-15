import Vue from 'vue';

let messageId = 1;
const toastQueueVm = new Vue({
  data: {
    toastQueue: [] as any[],
  },
});

const options = {
  autoCloseTimeout: 5000,
};

const addToast = (toast: any) => {
  const toasts = toastQueueVm.toastQueue;
  toasts.unshift({ ...toast, messageId: messageId++ });
  if (!!toast.duration) {
    setTimeout(() => removeToast(toast.messageId), toast.duration);
  }
};

const removeToast = (messageId: any) => {
  const toasts = toastQueueVm.toastQueue;
  const ix = toasts.findIndex(x => x.messageId === messageId);
  if (ix > -1) {
    toasts.splice(ix, 1);
  }
};

export { toastQueueVm, addToast, removeToast, options };
