<script setup lang="ts">
import type { Location } from '@/stores/data-model'
import { useShiftStore } from '@/stores/locations';

defineProps<{
    location: Location
}>()

const shiftStore = useShiftStore()

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
            <tr v-for="(week, i) in location.template">
                <td class="variable">{{ i + 1 }}</td>
                <td>
                    <template v-for="shiftId in week.sunday">
                        <div>{{ shiftId }}: {{ shiftStore.shifts[shiftId].slots }}</div>
                    </template>
                </td>
                <td>
                    <template v-for="shiftId in week.monday">
                        <div>{{ shiftId }}: {{ shiftStore.shifts[shiftId].slots }}</div>
                    </template>
                </td>
                <td>
                    <template v-for="shiftId in week.tuesday">
                        <div>{{ shiftId }}: {{ shiftStore.shifts[shiftId].slots }}</div>
                    </template>
                </td>
                <td>
                    <template v-for="shiftId in week.wednesday">
                        <div>{{ shiftId }}: {{ shiftStore.shifts[shiftId].slots }}</div>
                    </template>
                </td>
                <td>
                    <template v-for="shiftId in week.thursday">
                        <div>{{ shiftId }}: {{ shiftStore.shifts[shiftId].slots }}</div>
                    </template>
                </td>
                <td>
                    <template v-for="shiftId in week.friday">
                        <div>{{ shiftId }}: {{ shiftStore.shifts[shiftId].slots }}</div>
                    </template>
                </td>
                <td>
                    <template v-for="shiftId in week.saturday">
                        <div>{{ shiftId }}: {{ shiftStore.shifts[shiftId].slots }}</div>
                    </template>
                </td>
                <td class="variable"></td>
            </tr>
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
    padding: 0.2rem 0.8rem;
}

td {
    border: 1px solid var(--color-border);
}

th.variable,
td.variable {
    min-width: 50px;
    border: none;
    width: initial;
}</style>
