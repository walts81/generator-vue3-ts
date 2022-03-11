import { ref } from 'vue';

let busyCounter = 0;

const isBusy = ref(false);

const setBusy = (busy: boolean) => {
  if (busy) busyCounter++;
  else if (busyCounter > 0) busyCounter--;

  const newVal = busyCounter > 0;
  if (newVal !== isBusy.value) {
    isBusy.value = newVal;
  }
};

export { isBusy, setBusy };
