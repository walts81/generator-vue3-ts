<template>
  <div ref="modal" class="modal fade" tabindex="-1" role="dialog">
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
      role="document"
    >
      <div class="modal-content">
        <div class="modal-header" :class="{ 'text-center': centerTitle }">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            v-if="showClose"
            @click="onCancel()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{{ dialogTitle }}</h4>
        </div>
        <div class="modal-body">
          <div
            v-bind="$attrs"
            :class="{ 'text-start': !centerContent }"
            v-if="!!message"
            v-html="message"
          ></div>
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <slot name="footer">
            <Buttons
              v-bind="$props"
              small
              @submit="onSubmit"
              @cancel="onCancel"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Buttons from '../inputs/cancel-submit-buttons.vue';
import { getActions } from './actions';

@Component({
  components: {
    Buttons,
  },
})
export default class Modal extends Vue {
  @Prop(String) title!: string;
  @Prop(String) message!: string;
  @Prop({ type: Boolean, default: false }) showClose!: boolean;
  @Prop({ type: Boolean, default: false }) centerTitle!: boolean;
  @Prop({ type: Boolean, default: false }) centerContent!: boolean;
  @Prop(String) dialogType!: string;
  @Prop({ type: Boolean, default: false }) small!: boolean;
  @Prop({ type: Boolean, default: false }) showCancel!: boolean;
  @Prop({ type: Boolean, default: true }) showSubmit!: boolean;
  @Prop({ type: String, default: 'Cancel' }) cancelText!: string;
  @Prop({ type: String, default: 'OK' }) submitText!: string;

  open() {
    const actions = getActions(
      this.showClose,
      (this as any).bootstrap,
      this.$refs.modal
    );
    actions.open();
  }

  close() {
    const actions = getActions(
      this.showClose,
      (this as any).bootstrap,
      this.$refs.modal
    );
    actions.close();
  }

  capitalize(val: string) {
    if (!!val) {
      const vals = val.split(' ');
      return vals
        .map(x => x.substring(0, 1).toUpperCase() + x.substring(1))
        .join(' ');
    }
    return '';
  }

  get myDialogType() {
    return this.capitalize(this.dialogType) || 'Info';
  }

  get showFooter() {
    return this.showCancel || this.showSubmit;
  }

  get dialogTitle() {
    return this.title || this.myDialogType;
  }

  onCancel() {
    this.close();
    this.$emit('cancel');
  }

  onSubmit() {
    this.close();
    this.$emit('submit');
  }
}
</script>

<style lang="scss">
.modal {
  .modal-dialog {
    .modal-content {
      .modal-header {
        &.text-center {
          justify-content: center;
        }
      }
    }
  }
}
</style>
