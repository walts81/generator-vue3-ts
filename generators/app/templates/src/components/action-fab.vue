<template>
  <div class="action-fab">
    <button
      type="button"
      class="btn btn-fab action-btn"
      :class="getBtnClass()"
      @click="onAction($event)"
      v-if="!hAction && !vAction"
    >
      <i :class="icon"></i>
    </button>

    <button
      type="button"
      class="btn btn-fab"
      :class="getBtnClass()"
      @click="toggleBtn()"
      v-if="hAction || vAction"
    >
      <i class="fas fa-ellipsis-h" v-if="showEllipsis"></i>
      <i class="fas fa-times" v-if="showClose"></i>
    </button>

    <button
      v-for="(item, ix) in subItems"
      :key="'button_' + ix"
      type="button"
      class="btn btn-fab small"
      :class="getSubBtnClass(item, ix)"
      @click="onAction(item)"
    >
      <i :class="getIcon(item)"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue';
import { getActionFabEmits, getActionFabProps } from '@/models/action-fab';

const emits = getActionFabEmits();
const props = getActionFabProps();

export default {
  emits,
  props,
  setup(props, { emit }) {
    const actionHon = ref(false);
    const actionVon = ref(false);
    const showEllipsis = computed(
      () =>
        (props.hAction && !actionHon.value) ||
        (props.vAction && !actionVon.value)
    );
    const showClose = computed(
      () =>
        (props.hAction && actionHon.value) || (props.vAction && actionVon.value)
    );
    const subItems = computed(() => {
      if (!actionHon.value && !actionVon.value) return [];
      return props.items || [];
    });
    const toggleBtn = () => {
      if (props.hAction) actionHon.value = !actionHon.value;
      if (props.vAction) actionVon.value = !actionVon.value;
    };
    const getBtnClass = () => {
      const classes: any = {
        top: props.top,
        bottom: props.bottom,
        left: props.left,
        right: props.right,
      };
      if (!!props.buttonType) classes[props.buttonType] = true;
      if (props.hAction && actionHon.value) classes['open'] = true;
      if (props.vAction && actionVon.value) classes['open'] = true;
      if (props.hAction && !actionHon.value) classes['btn-primary'] = true;
      if (props.vAction && !actionVon.value) classes['btn-primary'] = true;
      if (props.hAction) classes['action-btn-h'] = true;
      if (props.vAction) classes['action-btn-v'] = true;
      return classes;
    };
    const getSubBtnClass = (item: any, ix: number) => {
      const classes: any = {
        top: props.top,
        bottom: props.bottom,
        left: props.left,
        right: props.right,
      };
      if (props.hAction) classes[`sub-btn-h-${ix + 1}`] = true;
      if (props.vAction) classes[`sub-btn-v-${ix + 1}`] = true;
      if (!!item.buttonType) classes[item.buttonType] = true;
      return classes;
    };
    const getIcon = (item: any) => {
      const classes: any = {};
      if (!!item.icon) {
        const iconClasses = item.icon.split(' ');
        for (const iconClass of iconClasses) {
          classes[iconClass] = true;
        }
      }
      return classes;
    };
    const onAction = (item: any) => {
      actionHon.value = false;
      actionVon.value = false;
      emit('select', item);
    };
    return {
      subItems,
      getBtnClass,
      getSubBtnClass,
      getIcon,
      onAction,
      actionHon,
      actionVon,
      showEllipsis,
      showClose,
      toggleBtn,
    };
  },
};
</script>

<style lang="scss">
.btn.btn-fab {
  border-radius: 2rem;
  height: 56px;
  width: 56px;
  padding: 0;
  z-index: 99;

  font-size: 1.5rem;
  i.fa,
  i.far,
  i.fas {
    line-height: 3rem;
  }

  &.small {
    height: 46px;
    width: 46px;
    font-size: 1rem;
    i.fa,
    i.far,
    i.fas {
      line-height: 1rem;
    }
  }

  &.top {
    position: fixed;
    top: 58px;
    @media (min-width: 576px) {
      top: 10px;
    }
  }
  &.bottom {
    position: fixed;
    bottom: 10px;
  }
  &.right {
    position: fixed;
    right: 10px;
    &.small {
      right: 15px;
    }
  }
  &.left {
    position: fixed;
    left: 10px;
    &.small {
      left: 15px;
    }
  }

  &.mini {
    height: 40px;
    width: 40px;
  }
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
}

.action-btn-h.btn-fab {
  right: 75px;
  &.open {
    background: transparent;
  }
}
.action-btn-v.btn-fab {
  &.open {
    background: transparent;
  }
}

.sub-btn-h-2.btn-fab.bottom.right {
  right: 80px;
  bottom: 75px;
}
.sub-btn-h-1.btn-fab.bottom.right {
  right: 80px;
  bottom: 130px;
}
.sub-btn-v-2.btn-fab.bottom.right {
  bottom: 75px;
}
.sub-btn-v-1.btn-fab.bottom.right {
  bottom: 130px;
}
</style>
