export const textInputEventNames = {
  vModelUpdateEvent: 'update:modelValue',
  onAction: 'onAction',
  onKeyDownEnter: 'keydown.enter',
  onFocus: 'focus',
  onBlur: 'blur',
};

export const getTextInputEmits = () => [
  textInputEventNames.vModelUpdateEvent,
  textInputEventNames.onAction,
  textInputEventNames.onKeyDownEnter,
  textInputEventNames.onFocus,
  textInputEventNames.onBlur,
];

let textInputId = 0;
export const getTextInputProps = () => ({
  type: {
    type: String,
    default: 'text',
  },
  id: {
    type: String,
    default: `input_${++textInputId}`,
  },
  hasAction: {
    type: Boolean,
    default: false,
  },
  canDoAction: {
    type: Boolean,
    default: true,
  },
  flush: {
    type: Boolean,
    default: false,
  },
  max: Number,
  min: Number,
  maxlength: Number,
  pattern: String,
  regex: RegExp,
  actionText: String,
  label: String,
  modelValue: String,
  placeholder: String,
});
