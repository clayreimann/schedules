<script setup lang="ts">
import type { LocationId } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';
import { computed } from 'vue';
import ShiftGrid from './ShiftGrid.vue';

const props = defineProps<{
    week: number
    locationId: LocationId
}>()

const locationStore = useLocationStore()
const location = computed(() => locationStore.locations[props.locationId])
const days = computed(() => {
    const tmplWeek = location.value.template[props.week]
    return [tmplWeek.sunday, tmplWeek.monday, tmplWeek.tuesday, tmplWeek.wednesday, tmplWeek.thursday, tmplWeek.friday, tmplWeek.saturday]
})
</script>

<template>
    <tr>
        <td class="variable">{{ week + 1 }}</td>
        <template v-for="day, i in days" :key="`${week}-${i}`">
            <td>
                <template v-for="shiftId in day">
                    <ShiftGrid :week="week" :shiftId="shiftId" />
                </template>
            </td>
        </template>
        <td class="variable"></td>
    </tr>
</template>

<style scoped>
</style>
