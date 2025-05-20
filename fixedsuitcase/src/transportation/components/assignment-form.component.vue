<script>

import StudentService from '../../crm/services/student.service.js';
import BusService from '../services/bus.service.js';
import AssignmentService from '../services/assignment.service.js';

export default {
  name: 'assignment-form',

  data() {
    return {
      studentId: '',
      busId: ''
    };
  },
  methods: {
    async updateAssignment() {
      try {
        // Validate inputs
        if (!this.studentId || !this.busId) {
          this.$emit('assignment-result', this.$t('assignments.invalidStudent'));
          return;
        }

        // Fetch student and bus
        let student, bus;
        try {
          student = await StudentService.getStudent(this.studentId);
          bus = await BusService.getBus(this.busId);
        } catch (error) {
          this.$emit('assignment-result', error.response?.status === 404 ? this.$t('assignments.invalidStudent') : this.$t('assignments.invalidBus'));
          return;
        }

        // Validate districtId
        if (student.districtId !== bus.districtId) {
          this.$emit('assignment-result', this.$t('assignments.invalidBus'));
          return;
        }

        // Check for conflicting assignments (same student, different bus)
        const assignments = await AssignmentService.getAssignmentsByStudent(this.studentId);
        const conflictingAssignments = assignments.filter(a => a.busId !== parseInt(this.busId));
        if (conflictingAssignments.length > 0) {
          this.$emit('assignment-result', this.$t('assignments.alreadyAssigned'));
          return;
        }

        // Check available seats
        const availableSeats = await BusService.getAvailableSeats(this.busId);
        if (availableSeats <= 0 && assignments.length === 0) {
          this.$emit('assignment-result', this.$t('assignments.invalidBus'));
          return;
        }

        // Check sibling assignments
        const siblings = await StudentService.getStudentsByParent(student.parentId);
        const siblingAssignments = await Promise.all(
            siblings
                .filter(s => s.id !== student.id)
                .map(s => AssignmentService.getAssignmentsByStudent(s.id))
        );
        const siblingBusIds = siblingAssignments
            .flat()
            .map(a => a.busId);
        if (siblingBusIds.length > 0 && !siblingBusIds.includes(parseInt(this.busId))) {
          this.$emit('assignment-result', this.$t('assignments.invalidBus'));
          return;
        }

        // Update existing assignment's assignedAt
        try {
          await AssignmentService.updateAssignmentAssignedAt(parseInt(this.studentId), parseInt(this.busId));
          this.$emit('assignment-result', this.$t('assignments.success'));
          this.studentId = '';
          this.busId = '';
        } catch (error) {
          this.$emit('assignment-result', this.$t('assignments.invalidStudent'));
        }
      } catch (error) {
        console.error('Assignment update error:', error);
        this.$emit('assignment-result', this.$t('assignments.invalidStudent'));
      }
    }
  }
};
</script>

<template>
  <div class="assignment-form p-fluid" role="form" aria-label="Update assignment form">
    <div class="p-field">
      <label for="student-id">{{ $t('assignments.studentId') }}</label>
      <pv-input-text
          id="student-id"
          v-model="studentId"
          :placeholder="$t('assignments.studentId')"
          aria-required="true"
      />
    </div>
    <div class="p-field">
      <label for="bus-id">{{ $t('assignments.busId') }}</label>
      <pv-input-text
          id="bus-id"
          v-model="busId"
          :placeholder="$t('assignments.busId')"
          aria-required="true"
      />
    </div>
    <pv-button
        :label="$t('assignments.assign')"
        @click="updateAssignment"
        class="mt-2"
        aria-label="Update assignment timestamp"
    />
  </div>
</template>


<style scoped>
.assignment-form {
  max-width: 600px;
  margin: 0 auto;
}

.p-field {
  margin-bottom: 1rem;
}
</style>