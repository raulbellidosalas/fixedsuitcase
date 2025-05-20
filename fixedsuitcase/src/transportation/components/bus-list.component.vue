
<script>

import BusService from '../services/bus.service.js';

export default {
  name: 'bus-list',

  props: {
    buses: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fields: [
        {key: 'id', header: 'id'},
        {key: 'vehiclePlate', header: 'vehiclePlate'},
        {key: 'fuelTankType', header: 'fuelTankType'},
        {key: 'districtId', header: 'districtId'},
        {key: 'totalSeats', header: 'totalSeats'},
        {key: 'availableSeats', header: 'availableSeats'}
      ],
      sortField: 'id',
      sortOrder: 1,
      assignedStudents: {},
      availableSeats: {}
    };
  },
  async created() {
    await this.loadSeatMetrics();
  },
  methods: {
    async loadSeatMetrics() {
      for (const bus of this.buses) {
        this.assignedStudents[bus.id] = await BusService.getAssignedStudents(bus.id);
        this.availableSeats[bus.id] = await BusService.getAvailableSeats(bus.id);
      }
    },
    formatValue(data, key) {
      if (key === 'totalCapacity') {
        return new Intl.NumberFormat(this.$i18n.locale).format(this.assignedStudents[data.id]);
      }
      if (key === 'availableSeats') {
        return new Intl.NumberFormat(this.$i18n.locale).format(this.availableSeats[data.id]);
      }
      return data[key];
    },
    onSort(event) {
      this.sortField = event.sortField;
      this.sortOrder = event.sortOrder;
    }
  }
};
</script>
<template>
  <pv-data-table
      :value="buses"
      :paginator="true"
      :rows="5"
      :sortField="sortField"
      :sortOrder="sortOrder"
      @sort="onSort"
      class="bus-list"
      role="grid"
      aria-label="Buses list"
  >
    <pv-column
        v-for="field in fields"
        :key="field.key"
        :field="field.key"
        :header="$t(`table.${field.header}`)"
        :sortable="true"
    >
      <template #body="{ data }">
        {{ formatValue(data, field.key) }}
      </template>
    </pv-column>
  </pv-data-table>
</template>

<style scoped>
.bus-list {
  margin-top: 1rem;
}
</style>