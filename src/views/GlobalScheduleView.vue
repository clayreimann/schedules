<script setup lang="ts">
import LocationGrid from '@/components/LocationGrid.vue';
import type { Schedule } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';

const locationsStore = useLocationStore()
const schedule: Schedule = {
  id: '',
  personId: '',
  weeks: [
    { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
    { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
    { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
    { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] }
  ]
}

</script>

<template>
  <div class="wrapper">
    <template v-for="location in locationsStore.locations">
      <LocationGrid :location="location" />
    </template>
  </div>
</template>

<style scoped>
.wrapper {
  line-height: 1.2;
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}
</style>
