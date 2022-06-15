<template>
  <div class="input-group text-start" :class="{ flush: flush }">
    <label class="input-group-text" :for="id" v-if="!!label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :id="id"
      :placeholder="placeholderText"
      :value="modelValue"
      :maxlength="maxlength"
      :max="max"
      :min="min"
      :pattern="pattern"
      ref="textInput"
      @focus="onFocus($event)"
      @blur="onBlur($event)"
      @input="onInput($event)"
      @keydown="onKeyDown($event)"
    />
    <button
      v-if="hasAction"
      type="button"
      class="btn btn-outline-secondary"
      :class="{ disabled: !canDoAction }"
      @click="onAction()"
      :disabled="!canDoAction"
    >
      {{ actionText }}
    </button>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import {
  textInputEventNames,
  getTextInputEmits,
  getTextInputProps,
} from './text-input';

const emits = getTextInputEmits();
const props = getTextInputProps();

export default {
  emits,
  props,
  setup(props, { emit }) {
    const placeholderText = computed(() => props.placeholder || '');
    const onInput = (e: any) =>
      emit(textInputEventNames.vModelUpdateEvent, e.target.value);
    const textInput = ref<HTMLInputElement | null>(null);
    const focus = () => textInput.value?.focus();
    const blur = () => textInput.value?.blur();
    const onFocus = (e: any) => emit(textInputEventNames.onFocus, e);
    const onBlur = (e: any) => emit(textInputEventNames.onBlur, e);
    const onAction = () => emit(textInputEventNames.onAction);
    const onKeyDown = (e: any) => {
      if (e.which === 13) {
        onEnter();
      } else if (e.which === 8 || e.which === 46) {
        return true;
      } else {
        const val = e.target.value + e.key;
        if (!!props.regex && !props.regex.test(val)) {
          e.preventDefault();
          return false;
        }
      }
      return true;
    };
    const onEnter = () => {
      if (props.canDoAction) emit(textInputEventNames.onKeyDownEnter);
    };
    return {
      onInput,
      onAction,
      placeholderText,
      textInput,
      focus,
      onFocus,
      blur,
      onBlur,
      onEnter,
      onKeyDown,
    };
  },
};
</script>

<style lang="scss">
.input-group.text-start {
  &.flush {
    label.input-group-text {
      border-radius: 0;
      border-left-width: 0;
    }
    .form-control {
      border-radius: 0;
      border-right-width: 0;
    }
  }
}
</style>
