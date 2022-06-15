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
import { computed, ref, onMounted } from 'vue';
import Buttons from '../inputs/cancel-submit-buttons.vue';
import { getActions } from './actions';
import {
  cancelSubmitEventNames,
  getCancelSubmitEmits,
} from '../inputs/cancel-submit';
import { getModalProps } from './modal';

const emits = getCancelSubmitEmits();
const props = getModalProps();

export default {
  components: { Buttons },
  emits,
  props,
  setup(props, { emit }) {
    const modal = ref<any>(null);
    const open = ref<any>(null);
    const close = ref<any>(null);
    const capitalize = (val: string) => {
      if (!!val) {
        const vals = val.split(' ');
        return vals
          .map(x => x.substring(0, 1).toUpperCase() + x.substring(1))
          .join(' ');
      }
      return '';
    };
    const dialogType = computed(() => capitalize(props.dialogType) || 'Info');

    onMounted(() => {
      const actions = getActions(props.showClose, modal);
      open.value = actions.open;
      close.value = actions.close;
    });

    const showFooter = computed(() => props.showCancel || props.showSubmit);
    const dialogTitle = computed(() => props.title || dialogType.value);
    const onCancel = () => {
      close.value();
      emit(cancelSubmitEventNames.cancel);
    };
    const onSubmit = () => {
      close.value();
      emit(cancelSubmitEventNames.submit);
    };
    return {
      open,
      close,
      onCancel,
      onSubmit,
      dialogTitle,
      showFooter,
      modal,
      onMounted,
    };
  },
};
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
