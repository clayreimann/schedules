<script setup lang="ts">
import LocationGrid from '@/components/LocationGrid/LocationGrid.vue';
import WeekGridRow from '@/components/LocationGrid/WeekGridRow.vue';
import WeekHeaderRow from '@/components/LocationGrid/WeekHeaderRow.vue';
import type { LocationId } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';
import { useViewOptions } from '@/stores/view-options';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const viewOptions = useViewOptions()
const locationsStore = useLocationStore()

const locationId = computed(() => route.params.id as LocationId)
const location = computed(() => locationsStore.locations[locationId.value])

</script>

<template>
    <LocationGrid :locationId="locationId" />
</template>

<style scoped>
.sch-wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
}
</style>
