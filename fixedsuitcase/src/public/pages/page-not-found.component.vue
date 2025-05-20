
<script>


export default {
  name: 'not-found-page',

  methods: {
    goToHome() {
      this.$router.push('/home');
    }
  }
};
</script>
<template>
  <div class="not-found-page p-4" role="main" aria-labelledby="not-found-title">
    <h1 id="not-found-title">{{ $t('notFound.title') }}</h1>
    <p>{{ $t('notFound.message', { path: '/home' }) }}</p>
    <pv-button
        :label="$t('notFound.back')"
        @click="goToHome"
        aria-label="Back to Home"
    />
  </div>
</template>


<style scoped>
.not-found-page {
  text-align: center;
}
</style>