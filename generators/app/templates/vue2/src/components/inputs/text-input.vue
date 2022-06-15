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
import { Component, Prop, Vue } from 'vue-property-decorator';

let textInputId = 0;
@Component
export default class TextInput extends Vue {
  @Prop({ type: String, default: 'text' }) type!: string;
  @Prop({ type: String, default: `input_${++textInputId}` }) id!: string;
  @Prop({ type: Boolean, default: false }) hasAction!: boolean;
  @Prop({ type: Boolean, default: true }) canDoAction!: boolean;
  @Prop({ type: Boolean, default: false }) flush!: boolean;
  @Prop(Number) max!: number;
  @Prop(Number) min!: number;
  @Prop(Number) maxlength!: number;
  @Prop(String) pattern!: string;
  @Prop() regex!: any;
  @Prop(String) actionText!: string;
  @Prop(String) label!: string;
  @Prop(String) value!: string;
  @Prop(String) placeholder!: string;

  get placeholderText() {
    return this.placeholder || '';
  }

  onInput(e: any) {
    this.$emit('input', e.target.value);
  }

  focus() {
    (this.$refs.textInput as any)?.focus();
  }

  blur() {
    (this.$refs.textInput as any)?.blur();
  }

  onFocus(e: any) {
    this.$emit('focus', e);
  }

  onBlur(e: any) {
    this.$emit('blur', e);
  }

  onAction() {
    this.$emit('onAction');
  }

  onKeyDown(e: any) {
    if (e.which === 13) {
      this.onEnter();
    } else if (e.which === 8 || e.which === 46) {
      return true;
    } else {
      const val = e.target.value + e.key;
      if (!!this.regex && !this.regex.test(val)) {
        e.preventDefault();
        return false;
      }
    }
    return true;
  }

  onEnter() {
    if (this.canDoAction) this.$emit('keydown.enter');
  }
}
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
