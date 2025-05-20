
<script>
import BusService from '../../transportation/services/bus.service.js';
import BusList from '../../transportation/components/bus-list.component.vue';

export default {
  name: 'home-page',
  components: { BusList },
  data() {
    return {
      buses: []
    };
  },
  async created() {
    try {
      this.buses = await BusService.getBuses();
    } catch (error) {
      console.error('Error fetching buses:', error);
      this.buses = [];
    }
  }
};
</script>
<template>
  <div class="home-page p-4" role="main" aria-labelledby="home-title">
    <h1 id="home-title">{{ $t('home.title') }}</h1>
    <p>{{ $t('home.welcome') }}</p>
    <h2>{{ $t('home.buses') }}</h2>
    <div v-if="buses.length === 0" class="no-buses" role="alert">
      {{ $t('home.noBuses') }}
    </div>
    <bus-list v-else :buses="buses" />
  </div>
</template>

<style scoped>
.no-buses {
  text-align: center;
  font-size: 1.2rem;
  margin: 1rem 0;
  color: #d32f2f;
}
</style>