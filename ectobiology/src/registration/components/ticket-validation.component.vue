
<script>

import {attendeeService} from "../services/attendee.service.js";
import {eventService} from "../services/event.service.js";

export default {
  name: 'ticket-validation',

  data() {
    return {
      ticketIdentifier: '',
      validationResult: null
    };
  },
  methods: {
    async validateTicket() {
      this.validationResult = null;
      try {
        const attendee = await attendeeService.getAttendeeByTicket(this.ticketIdentifier.trim());
        if (!attendee) {
          this.validationResult = { error: this.$t('checkIn.invalidTicket') };
          return;
        }
        if (attendee.checkedInAt) {
          this.validationResult = { error: this.$t('checkIn.alreadyCheckedIn') };
          return;
        }
        const updatedAttendee = await attendeeService.checkIn(attendee.id);
        const event = await eventService.getById(attendee.eventId);
        this.validationResult = {
          eventId: event.id,
          eventName: event.name,
          eventDescription: event.description,
          firstName: attendee.firstName,
          lastName: attendee.lastName,
          checkedInAt: updatedAttendee.checkedInAt
        };
      } catch (error) {
        console.error('Validation error:', error);
        this.validationResult = { error: this.$t('checkIn.invalidTicket') };
      }
    },
    formatDate(date) {
      if (!date) return '';
      return new Intl.DateTimeFormat(this.$i18n.locale, {
        dateStyle: 'medium',
        timeStyle: 'short'
      }).format(new Date(date));
    }
  }
};
</script>



<template>
  <div class="ticket-validation" role="region" aria-labelledby="ticket-validation-title">
    <h2 id="ticket-validation-title">{{ $t('checkIn.ticketValidation') }}</h2>
    <div class="p-fluid">
      <div class="p-field">
        <label for="ticket-identifier">{{ $t('checkIn.ticketIdentifier') }}</label>
        <pv-input-text
            id="ticket-identifier"
            v-model="ticketIdentifier"
            :placeholder="$t('checkIn.ticketIdentifier')"
            aria-required="true"
        />
      </div>
      <pv-button
          :label="$t('checkIn.button')"
          @click="validateTicket"
          class="mt-2"
          aria-label="Submit ticket for check-in"
      />
    </div>
    <pv-card v-if="validationResult" class="mt-4" role="alert">
      <template #content>
        <p v-if="validationResult.error" class="error-text">{{ validationResult.error }}</p>
        <div v-else class="result-details">
          <p><strong>{{ $t('checkIn.eventId') }}:</strong> {{ validationResult.eventId }}</p>
          <p><strong>{{ $t('checkIn.eventName') }}:</strong> {{ validationResult.eventName }}</p>
          <p><strong>{{ $t('checkIn.eventDescription') }}:</strong> {{ validationResult.eventDescription }}</p>
          <p><strong>{{ $t('checkIn.firstName') }}:</strong> {{ validationResult.firstName }}</p>
          <p><strong>{{ $t('checkIn.lastName') }}:</strong> {{ validationResult.lastName }}</p>
          <p><strong>{{ $t('checkIn.checkedInAt') }}:</strong> {{ formatDate(validationResult.checkedInAt) }}</p>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.ticket-validation {
  max-width: 600px;
  margin: 0 auto;
}
.p-field {
  margin-bottom: 1rem;
}
.error-text {
  color: #d32f2f;
}
.result-details p {
  margin: 0.5rem 0;
}
</style>