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
import { Component, Vue } from 'vue-property-decorator';
import { setBusy } from './set-busy';
import { addToast } from './toast-queue';
import ConfirmModal from './modals/modal.vue';

@Component({
  components: {
    ConfirmModal,
  },
})
export default class HelloWorld extends Vue {
  onAnswerNo() {
    this.onAnswer('No');
  }
  onAnswerYes() {
    this.onAnswer('Yes');
  }

  private onAnswer(answer: string) {
    addToast({
      title: 'Confirmation Toast',
      text: `You answered '${answer}'`,
    });
  }

  showModal() {
    (this.$refs.confirmModal as any).open();
  }

  showBusy() {
    setBusy(true);
    setTimeout(() => setBusy(false), 5000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.show-busy {
  margin-right: 1rem;
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
