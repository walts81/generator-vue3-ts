<template>
  <Modal ref="modal" v-bind="{ ...$props, ...$attrs }">
    <template v-slot:default>
      <form class="m-3">
        <text-input
          ref="textInput"
          v-model="inputText"
          :type="type"
          :label="label"
          :placeholder="placeholder"
          @keydown.enter="onSubmit"
        ></text-input>
      </form>
    </template>
    <template v-slot:footer>
      <Buttons v-bind="$props" @submit="onSubmit" @cancel="onCancel" />
    </template>
  </Modal>
</template>

<script lang="ts">
import { ref } from 'vue';
import Modal from './modal.vue';
import TextInput from '../inputs/text-input.vue';
import Buttons from '../inputs/cancel-submit-buttons.vue';
import { getInputModalProps } from './input-modal';
import {
  cancelSubmitEventNames,
  getCancelSubmitEmits,
} from '../inputs/cancel-submit';

const emits = getCancelSubmitEmits();
const props = getInputModalProps();

export default {
  components: { Modal, TextInput, Buttons },
  emits,
  props,
  setup(props, { emit }) {
    const inputText = ref('');
    const modal = ref<any>(null);
    const textInput = ref<any>(null);

    const open = () => {
      modal.value?.open();
      setTimeout(() => textInput.value?.focus(), 500);
    };
    const close = () => {
      modal.value?.close();
      const val = inputText.value;
      inputText.value = '';
      return val;
    };
    const onCancel = () => {
      close();
      emit(cancelSubmitEventNames.cancel);
    };
    const onSubmit = () => {
      const val = close();
      emit(cancelSubmitEventNames.submit, val);
    };
    return { open, close, onCancel, onSubmit, inputText, modal, textInput };
  },
};
</script>
