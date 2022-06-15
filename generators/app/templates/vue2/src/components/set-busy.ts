import Vue from 'vue';

let busyCounter = 0;

const isBusyVm = new Vue({
  data: {
    isBusy: false,
  },
});

const setBusy = (busy: boolean) => {
  if (busy) busyCounter++;
  else if (busyCounter > 0) busyCounter--;

  const newVal = busyCounter > 0;
  if (newVal !== isBusyVm.isBusy) {
    isBusyVm.isBusy = newVal;
  }
};

export { isBusyVm, setBusy };
