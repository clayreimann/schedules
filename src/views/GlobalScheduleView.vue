<script setup lang="ts">
import LocationGrid from '@/components/LocationGrid/LocationGrid.vue';
import type { Schedule } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';
import { ref } from 'vue';

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

const activeWeek = ref(0)

</script>

<template>
  <div class="wrapper">
    <div>
      <select v-model.number="activeWeek">
        <option value="0">1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
      </select>
    </div>
    <template v-for="location in locationsStore.locations">
      <LocationGrid :week="activeWeek" :locationId="location.id" />
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
