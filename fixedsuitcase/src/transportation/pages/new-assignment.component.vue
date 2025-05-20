
<script>
import AssignmentForm from '../components/assignment-form.component.vue';

export default {
  name: 'new-assignment-page',
  components: { AssignmentForm },
  data() {
    return {
      resultMessage: '',
      isSuccess: false
    };
  },
  methods: {
    handleResult(message) {
      this.resultMessage = message;
      this.isSuccess = message === this.$t('assignments.success');
    }
  }
};
</script>

<template>
  <div class="new-assignment-page p-4" role="main" aria-labelledby="assignments-title">
    <h1 id="assignments-title">{{ $t('assignments.title') }}</h1>
    <h2>{{ $t('assignments.newAssignment') }}</h2>
    <assignment-form @assignment-result="handleResult" />
    <p v-if="resultMessage" class="result-message" role="alert" :class="{ success: isSuccess }">
      {{ resultMessage }}
    </p>
  </div>
</template>


<style scoped>
.result-message {
  margin-top: 1rem;
  color: #d32f2f;
}
.result-message.success {
  color: #4caf50;
}
</style>