<script>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from "./language-switcher.component.vue";

export default {
  name: 'Toolbar-c',
  components: {LanguageSwitcher},
};
</script>
<template>

  <pv-toolbar>
    <template #start>

      <img src="https://logo.clearbit.com/eventify.io" alt="Eventify Logo" width="50" />
      <span class="ml-2">ISO 27001:2022 certified</span>
    </template>
    <template #center>
      <router-link to="/home" class="p-toolbar-item">{{ $t('toolbar.home') }}</router-link>
      <router-link to="/registration/event-check-ins/new" class="p-toolbar-item">{{ $t('toolbar.checkIn') }}</router-link>
    </template>
    <template #end>
      <language-switcher></language-switcher>
    </template>

  </pv-toolbar>
</template>
<style scoped>

</style>
