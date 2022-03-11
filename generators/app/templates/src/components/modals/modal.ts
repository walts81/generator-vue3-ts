import { getCancelSubmitProps } from '../inputs/cancel-submit';

export const getModalProps = () => ({
  title: String,
  message: String,
  showClose: {
    type: Boolean,
    default: () => false,
  },
  centerTitle: {
    type: Boolean,
    default: () => false,
  },
  centerContent: {
    type: Boolean,
    default: () => false,
  },
  dialogType: String,
  ...getCancelSubmitProps(),
});
