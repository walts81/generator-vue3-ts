import { getModalProps } from './modal';

export const getInputModalProps = () => ({
  ...getModalProps(),
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
});
