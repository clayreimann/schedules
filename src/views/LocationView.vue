<script setup lang="ts">
import LocationGrid from '@/components/LocationGrid/LocationGrid.vue';
import type { LocationId } from '@/stores/data-model';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const locationId = computed(() => route.params.id as LocationId)
</script>

<template>
    <LocationGrid :locationId="locationId" :collapsed="false" />
</template>

<style scoped>
.sch-wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
}
</style>
