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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CancelSubmitButtons extends Vue {
  @Prop({ type: Boolean, default: false }) small!: boolean;
  @Prop({ type: Boolean, default: false }) showCancel!: boolean;
  @Prop({ type: Boolean, default: false }) showSubmit!: boolean;
  @Prop({ type: String, default: 'Cancel' }) cancelText!: string;
  @Prop({ type: String, default: 'OK' }) submitText!: string;

  cancel() {
    this.$emit('cancel');
  }

  submit() {
    this.$emit('submit');
  }
}
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
