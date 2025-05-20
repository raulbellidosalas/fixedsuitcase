
<script>
import {attendeeService} from "../services/attendee.service.js";
import {eventService} from "../services/event.service.js";
import TicketValidation from "../components/ticket-validation.component.vue";

export default {
  name: 'event-check-in-page',
  components: {TicketValidation},
  data() {
    return {
      ticketIdentifier: '',
      validationResult: null
    };
  },
  methods: {
    async validateTicket() {
      this.validationResult = null;
      const attendee = await attendeeService.getAttendeeByTicket(this.ticketIdentifier);
      if (!attendee) {
        this.validationResult = { error: this.$t('checkIn.invalidTicket') };
        return;
      }
      if (attendee.checkedInAt) {
        this.validationResult = { error: this.$t('checkIn.alreadyCheckedIn') };
        return;
      }
      const updatedAttendee = await attendeeService.checkIn(attendee.id);
      const event = await eventService.getEvent(attendee.eventId);
      this.validationResult = {
        eventId: event.id,
        eventName: event.name,
        eventDescription: event.description,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        checkedInAt: updatedAttendee.checkedInAt
      };
    }
  }
};
</script>


<template>
  <div class="p-4" role="main" aria-labelledby="check-in-title">

    <pv-card v-if="validationResult" class="mt-4">
      <template #content>
        <p v-if="validationResult.error">{{ validationResult.error }}</p>
        <div v-else>
          <p>{{ $t('checkIn.eventId') }}: {{ validationResult.eventId }}</p>
          <p>{{ $t('checkIn.eventName') }}: {{ validationResult.eventName }}</p>
          <p>{{ $t('checkIn.eventDescription') }}: {{ validationResult.eventDescription }}</p>
          <p>{{ $t('checkIn.firstName') }}: {{ validationResult.firstName }}</p>
          <p>{{ $t('checkIn.lastName') }}: {{ validationResult.lastName }}</p>
          <p>{{ $t('checkIn.checkedInAt') }}: {{ validationResult.checkedInAt }}</p>
        </div>
      </template>
    </pv-card>
    <div class="p-4" role="main" aria-labelledby="check-in-title">
      <h1 id="check-in-title">{{ $t('checkIn.title') }}</h1>
      <ticket-validation />
    </div>
  </div>
</template>
<style scoped>

</style>