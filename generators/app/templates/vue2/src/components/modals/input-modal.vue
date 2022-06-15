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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getActions } from './actions';
import Modal from './modal.vue';
import TextInput from '../inputs/text-input.vue';
import Buttons from '../inputs/cancel-submit-buttons.vue';

@Component({
  components: {
    Modal,
    TextInput,
    Buttons,
  },
})
export default class InputModal extends Vue {
  inputText = '';

  open() {
    const actions = getActions(
      false,
      (this as any).bootstrap,
      this.$refs.modal
    );
    actions.open();
    setTimeout(() => (this.$refs.textInput as any).focus(), 500);
  }

  close() {
    const actions = getActions(
      false,
      (this as any).bootstrap,
      this.$refs.modal
    );
    actions.close();
    const val = this.inputText;
    this.inputText = '';
    return val;
  }

  onCancel() {
    this.close();
    this.$emit('cancel');
  }

  onSubmit() {
    const val = this.close();
    this.$emit('submit', val);
  }
}
</script>
