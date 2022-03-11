<template>
  <div v-show="isOn" class="spinner-container">
    <div class="spinner-overlay"></div>
    <div class="lds-dual-ring spinner"></div>
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

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid $spinner-color;
  border-color: $spinner-color transparent $spinner-color transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
