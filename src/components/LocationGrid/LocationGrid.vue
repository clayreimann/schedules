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
    <h2>{{ location.name }}</h2>
    <table>
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
            <td class="variable">{{ week + 1 }}</td>
                <template v-for="day, i in days" :key="`${week}-${i}`">
                    <td>
                        <template v-for="shiftId in day">
                            <ShiftGrid :week="week" :shiftId="shiftId" />
                        </template>
                    </td>
                </template>
                <td class="variable"></td>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border-collapse: collapse;
}

th,
td {
    width: 160px;
}

th {
    font-weight: bold;
}

td {
    border: 1px solid var(--color-border);
}

th.variable,
td.variable {
    min-width: 50px;
    border: none;
    width: initial;
}
</style>
