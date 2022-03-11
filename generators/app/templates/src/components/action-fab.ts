import { PropType } from 'vue';

export const actionFabEventNames = {
  select: 'select',
};

export const getActionFabEmits = () => [actionFabEventNames.select];

export const getActionFabProps = () => ({
  top: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  left: {
    type: Boolean,
    default: false,
  },
  right: {
    type: Boolean,
    default: false,
  },
  hAction: {
    type: Boolean,
    default: false,
  },
  vAction: {
    type: Boolean,
    default: false,
  },
  icon: String,
  buttonType: String,
  items: {
    type: Array as PropType<Array<any>>,
  },
});
