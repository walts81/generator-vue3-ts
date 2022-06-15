<template>
  <div class="hello">
    <button
      type="button"
      class="btn btn-primary btn-lg show-busy"
      @click="showBusy()"
    >
      Show Busy Spinner
    </button>
    <button type="button" class="btn btn-primary btn-lg" @click="showModal()">
      Show Confirm Modal
    </button>
    <confirm-modal
      ref="confirmModal"
      title="Modal Example"
      center-title
      message="This is an example of a confirmation modal. Please answer yes or no below."
      show-cancel
      cancel-text="No"
      submit-text="Yes"
      @cancel="onAnswerNo()"
      @submit="onAnswerYes()"
    ></confirm-modal>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { setBusy } from './set-busy';
import { addToast } from './toast-queue';
import ConfirmModal from './modals/modal.vue';

export default {
  components: { ConfirmModal },
  setup() {
    const confirmModal = ref<any>(null);
    const onAnswerNo = () => {
      onAnswer('No');
    };
    const onAnswerYes = () => {
      onAnswer('Yes');
    };
    const onAnswer = (answer: string) => {
      addToast({
        title: 'Confirmation Toast',
        text: `You answered '${answer}'`,
      });
    };
    const showModal = () => {
      confirmModal.value.open();
    };
    const showBusy = () => {
      setBusy(true);
      setTimeout(() => setBusy(false), 5000);
    };
    return { onAnswerYes, onAnswerNo, showModal, confirmModal, showBusy };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.show-busy {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
