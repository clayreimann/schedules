<script setup lang="ts">
import { useLocationStore } from '@/stores/locations';
import { useViewOptions } from "@/stores/view-options";

import LocationGrid from '@/components/LocationGrid/LocationGrid.vue';

const locationStore = useLocationStore();
const viewOptions = useViewOptions();

</script>

<template>
<div>
    <template v-for="(name, loc) in locationStore.locations">
        <LocationGrid :location-id="loc" :collapsed="viewOptions.collapsed" />
    </template>
</div>
</template>