<template>
  <div ng-show="isOn" class="spinner-container">
    <div class="spinner-overlay"></div>
    <div class="lds-ripple spinner">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    isOn: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'spinner';

.lds-ripple {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid $spinner-color;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>
