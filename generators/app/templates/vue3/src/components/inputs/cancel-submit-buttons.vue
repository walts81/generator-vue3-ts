<template>
  <div class="cancel-submit-buttons">
    <button
      type="button"
      class="btn btn-secondary"
      :class="{ 'btn-sm': small, only: !showSubmit }"
      v-if="showCancel"
      @click="cancel()"
      data-dismiss="modal"
    >
      {{ cancelText }}
    </button>
    <button
      type="button"
      class="btn btn-primary"
      :class="{ 'btn-sm': small, only: !showCancel }"
      v-if="showSubmit"
      @click="submit()"
    >
      {{ submitText }}
    </button>
  </div>
</template>

<script lang="ts">
import { SetupContext } from 'vue';
import {
  getCancelSubmitProps,
  cancelSubmitEventNames,
  getCancelSubmitEmits,
} from './cancel-submit';

const emits = getCancelSubmitEmits();
const props = getCancelSubmitProps();

export default {
  emits,
  props,
  setup(props, ctx: SetupContext<any>) {
    const cancel = () => ctx.emit(cancelSubmitEventNames.cancel);
    const submit = () => ctx.emit(cancelSubmitEventNames.submit);
    return { cancel, submit };
  },
};
</script>

<style lang="scss">
.cancel-submit-buttons {
  .btn-secondary {
    &:not(.only) {
      margin-right: 0.5rem;
    }
  }
}
</style>
