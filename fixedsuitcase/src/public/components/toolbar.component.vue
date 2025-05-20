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

      <img src="https://logo.clearbit.com/firststudentinc.com" alt="firststudent Logo" width="50" />
      <span class="ml-2"> {{$t('toolbar.trusted')}}</span>
    </template>
    <template #center>
      <router-link to="/home" class="p-toolbar-item">{{ $t('option.home') }}</router-link>
      <router-link to="/transportation/assignments/new" class="p-toolbar-item">{{ $t('option.assignments') }}</router-link>
    </template>
    <template #end>
      <language-switcher></language-switcher>
    </template>

  </pv-toolbar>
</template>
<style scoped>

</style>
