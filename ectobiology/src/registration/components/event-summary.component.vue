<script>
import {attendeeService} from "../services/attendee.service.js";

export default {
  name: 'event-summary',
  props: {
    event: { type: Object, required: true }
  },
  data() {
    return { attendees: [] };
  },
  computed: {
    registeredCount() {
      return this.attendees.length;
    },
    /**
     * checkedIn is a sum of all the attendees atending
     * then after the return,
     * we define Intl dividing the amount checked in with the amount registered
     * @returns {number|number}
     */
    attendancePercentage() {
      const total = this.attendees.length
      const checkedIn = this.attendees.filter(a => a.checkedInAt).length
      return total === 0 ? 0 : Math.round((checkedIn / total) * 100)
    }
  },
  async created() {
    const response = await attendeeService.getByEventId(this.event.id);
    this.attendees = response.data || [];
  }
};
</script>
<template>
  <pv-card>
    <template #header>
      <h3>{{ event.name }}</h3>
    </template>
    <template #content>
      <p>{{ event.description }}</p>
    </template>
    <template #footer>
      <div class="flex justify-content-between">
        <span>{{ $t('event.registered') }}: {{ registeredCount }}</span>
        <span>{{ $t('event.attendance') }}: {{ attendancePercentage }}%</span>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>

</style>