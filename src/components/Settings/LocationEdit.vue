<script setup lang="ts">
import type { LocationId } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';
import { computed } from 'vue';
import ShiftEdit from '@/components/Settings/ShiftEdit.vue';

const props = defineProps<{
    locationId: LocationId
}>()
const locationStore = useLocationStore()
const location = computed(() => locationStore.locations[props.locationId])
</script>

<template>
    <template v-if="location">
        <h3>{{ location.name }}</h3>
        <label for="name">
            Name:
            <input id="name" v-model="location.name" />
        </label>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(week, i) in location.template">
                    <td>{{ i + 1 }}</td>
                    <td><ShiftEdit v-for="shiftId in week.sunday" :shiftId="shiftId" /></td>
                    <td><ShiftEdit v-for="shiftId in week.monday" :shiftId="shiftId" /></td>
                    <td><ShiftEdit v-for="shiftId in week.tuesday" :shiftId="shiftId" /></td>
                    <td><ShiftEdit v-for="shiftId in week.wednesday" :shiftId="shiftId" /></td>
                    <td><ShiftEdit v-for="shiftId in week.thursday" :shiftId="shiftId" /></td>
                    <td><ShiftEdit v-for="shiftId in week.friday" :shiftId="shiftId" /></td>
                    <td><ShiftEdit v-for="shiftId in week.saturday" :shiftId="shiftId" /></td>
                </tr>
            </tbody>
        </table>
    </template>
</template>

<style scoped>
td {
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
}
</style>