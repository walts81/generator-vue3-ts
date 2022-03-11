export const cancelSubmitEventNames = {
  cancel: 'cancel',
  submit: 'submit',
};

export const getCancelSubmitEmits = (): string[] => [
  cancelSubmitEventNames.cancel,
  cancelSubmitEventNames.submit,
];

export const getCancelSubmitProps = () => ({
  small: {
    type: Boolean,
    default: () => false,
  },
  showCancel: {
    type: Boolean,
    default: () => false,
  },
  showSubmit: {
    type: Boolean,
    default: () => true,
  },
  cancelText: {
    type: String,
    default: () => 'Cancel',
  },
  submitText: {
    type: String,
    default: () => 'OK',
  },
});
