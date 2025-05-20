<script>
import {eventService} from "../../registration/services/event.service.js";
import eventSummary from "../../registration/components/event-summary.component.vue";

export default {
  name: 'home-page',
  components: {eventSummary},
  data() {
    return { events: [] };
  },
  async created() {
    try {
      const response = await eventService.getAll();
      this.events = response.data || []; // Asegúrate de que sea un array
    } catch (error) {
      console.error('Error fetching events:', error);
      this.events = []; // En caso de error, inicializa como array vacío
    }
  }
};
</script>
<template>
  <div class="p-4" role="main" aria-labelledby="home-title">
    <h1 id="home-title">{{ $t('home.title') }}</h1>
    <p>{{ $t('home.welcome') }}</p>
    <h2>{{ $t('home.registeredEvents') }}</h2>

    <div v-if="events.length === 0" class="no-events" role="alert">
      {{ $t('home.noEvents') }}
    </div>
    <div v-else class="grid" role="grid">
      <div v-for="event in events" :key="event.id" class="col-6" role="gridcell">
        <event-summary :event="event" />
      </div>
    </div>
  </div>
</template>
<style scoped>


</style>