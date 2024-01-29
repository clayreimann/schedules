<script setup lang="ts">
import LocationGrid from '@/components/LocationGrid/LocationGrid.vue';
import ScheduleGrid from '@/components/ScheduleGrid/ScheduleGrid.vue';
import { useLocationStore } from '@/stores/locations';
import { usePeopleStore } from '@/stores/people';

const locationsStore = useLocationStore()
const peopleStore = usePeopleStore()

</script>

<template>
  <template v-for="location in locationsStore.locations">
      <LocationGrid :locationId="location.id" :collapsed="false"/>
    </template>
    <template v-for="person in peopleStore.people">
      <ScheduleGrid :personId="person.id"/>
    </template>
</template>

<style scoped>
.sch-wrapper {
  line-height: 1.2;
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
}

.view-options {
  display: flex;
  place-content: baseline;

  & label {
    display: inline-block;
    padding: 0 0.5rem;
  }
}

table {
  border-collapse: collapse;
}

:deep(th),
:deep(td) {
  width: 160px;
}

:deep(.variable) {
  min-width: 50px;
  border: none;
  width: initial;
}

:deep(th) {
  font-weight: bold;
}

:deep(td) {
  border: 1px solid var(--color-border);
}</style>
