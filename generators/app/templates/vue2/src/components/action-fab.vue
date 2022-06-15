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
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ActionFab extends Vue {
  @Prop({ type: Boolean, default: false }) top!: boolean;
  @Prop({ type: Boolean, default: false }) bottom!: boolean;
  @Prop({ type: Boolean, default: false }) left!: boolean;
  @Prop({ type: Boolean, default: false }) right!: boolean;
  @Prop({ type: Boolean, default: false }) hAction!: boolean;
  @Prop({ type: Boolean, default: false }) vAction!: boolean;
  @Prop(String) icon!: string;
  @Prop(String) buttonType!: string;
  @Prop({ type: Array, default: () => [] }) items!: any[];

  actionHon = false;
  actionVon = false;

  get showEllipsis() {
    return (
      (this.hAction && !this.actionHon) || (this.vAction && !this.actionVon)
    );
  }

  get showClose() {
    return (this.hAction && this.actionHon) || (this.vAction && this.actionVon);
  }

  get subItems() {
    if (!this.actionHon && !this.actionVon) return [];
    return this.items || [];
  }

  toggleBtn() {
    if (this.hAction) this.actionHon = !this.actionHon;
    if (this.vAction) this.actionVon = !this.actionVon;
  }

  getBtnClass() {
    const classes: any = {
      top: this.top,
      bottom: this.bottom,
      left: this.left,
      right: this.right,
    };
    if (!!this.buttonType) classes[this.buttonType] = true;
    if (this.hAction && this.actionHon) classes['open'] = true;
    if (this.vAction && this.actionVon) classes['open'] = true;
    if (this.hAction && !this.actionHon) classes['btn-primary'] = true;
    if (this.vAction && !this.actionVon) classes['btn-primary'] = true;
    if (this.hAction) classes['action-btn-h'] = true;
    if (this.vAction) classes['action-btn-v'] = true;
    return classes;
  }

  getSubBtnClass(item: any, ix: number) {
    const classes: any = {
      top: this.top,
      bottom: this.bottom,
      left: this.left,
      right: this.right,
    };
    if (this.hAction) classes[`sub-btn-h-${ix + 1}`] = true;
    if (this.vAction) classes[`sub-btn-v-${ix + 1}`] = true;
    if (!!item.buttonType) classes[item.buttonType] = true;
    return classes;
  }

  getIcon(item: any) {
    const classes: any = {};
    if (!!item.icon) {
      const iconClasses = item.icon.split(' ');
      for (const iconClass of iconClasses) {
        classes[iconClass] = true;
      }
    }
    return classes;
  }

  onAction(item: any) {
    this.actionHon = false;
    this.actionVon = false;
    this.$emit('select', item);
  }
}
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
