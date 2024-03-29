<script setup lang="ts">
import ShiftGrid from '@/components/LocationGrid/ShiftGrid.vue';
import type { LocationId, PersonId } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';
import { useViewOptions } from '@/stores/view-options';
import { computed } from 'vue';

const props = defineProps<{
    locationId: LocationId,
    collapsed: boolean,
    personId?: PersonId
}>()

const viewOptions = useViewOptions()
const locationStore = useLocationStore()

const location = computed(() => locationStore.locations[props.locationId])
const week = computed(() => location.value.template[viewOptions.activeWeek])
const weekNo = computed(() => viewOptions.activeWeek)
</script>

<template>
    <h3>{{ location.name }}</h3>
    <table class="location">
        <thead>
            <tr>
                <th class="variable"><!-- week # --></th>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th><!-- stats? --></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="viewOptions.showAll">
                <tr v-for="(week, w) in location.template">
                    <td class="variable header">Week&nbsp;{{ w + 1 }}</td>
                    <td><ShiftGrid v-for="shiftId in week.sunday" :week="w" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                    <td><ShiftGrid v-for="shiftId in week.monday" :week="w" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                    <td><ShiftGrid v-for="shiftId in week.tuesday" :week="w" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                    <td><ShiftGrid v-for="shiftId in week.wednesday" :week="w" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                    <td><ShiftGrid v-for="shiftId in week.thursday" :week="w" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                    <td><ShiftGrid v-for="shiftId in week.friday" :week="w" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                    <td><ShiftGrid v-for="shiftId in week.saturday" :week="w" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                    <td class="variable"></td>
                </tr>
            </template>
            <tr v-else>
                <td class="variable header">Week&nbsp;{{ weekNo + 1 }}</td>
                <td><ShiftGrid v-for="shiftId in week.sunday" :week="weekNo" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                <td><ShiftGrid v-for="shiftId in week.monday" :week="weekNo" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                <td><ShiftGrid v-for="shiftId in week.tuesday" :week="weekNo" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                <td><ShiftGrid v-for="shiftId in week.wednesday" :week="weekNo" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                <td><ShiftGrid v-for="shiftId in week.thursday" :week="weekNo" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                <td><ShiftGrid v-for="shiftId in week.friday" :week="weekNo" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                <td><ShiftGrid v-for="shiftId in week.saturday" :week="weekNo" :shiftId="shiftId" :collapsed="collapsed" :personId="personId" /></td>
                <td class="variable"></td>
            </tr>

        </tbody>
    </table>
</template>

<style scoped>
:deep(th),
:deep(td) {
    width: 160px;
}

:deep(.variable) {
    min-width: 50px;
    border: none;
    width: initial;
}

th, .header {
    font-weight: bold;
}

:deep(td) {
    border: 1px solid var(--color-border);
}

.location tbody tr {
    break-inside: avoid;
}
@media print {
    
    
}
</style>
  