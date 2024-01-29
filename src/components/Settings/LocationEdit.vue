<script setup lang="ts">
import type { LocationId, Weekday } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';
import { computed } from 'vue';
import ShiftEdit from '@/components/Settings/ShiftEdit.vue';
import { useShiftStore } from '@/stores/shifts';

const props = defineProps<{
    locationId: LocationId
}>()
const shiftStore = useShiftStore()
const locationStore = useLocationStore()
const location = computed(() => locationStore.locations[props.locationId])
const addShift = (locationId: LocationId, week: number, day: Weekday) => {
    const shiftId = shiftStore.addShift()
    locationStore.addShift(locationId, week, day, shiftId)
}
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
                    <td>Week&nbsp;{{ i + 1 }}</td>
                    <td>
                        <ShiftEdit v-for="shiftId in week.sunday" :shiftId="shiftId" />
                        <button @click="addShift(location.id, i, 'sunday')">Add shift</button>
                    </td>
                    <td>
                        <ShiftEdit v-for="shiftId in week.monday" :shiftId="shiftId" />
                        <button @click="addShift(location.id, i, 'monday')">Add shift</button>
                    </td>
                    <td>
                        <ShiftEdit v-for="shiftId in week.tuesday" :shiftId="shiftId" />
                        <button @click="addShift(location.id, i, 'tuesday')">Add shift</button>
                    </td>
                    <td>
                        <ShiftEdit v-for="shiftId in week.wednesday" :shiftId="shiftId" />
                        <button @click="addShift(location.id, i, 'wednesday')">Add shift</button>
                    </td>
                    <td>
                        <ShiftEdit v-for="shiftId in week.thursday" :shiftId="shiftId" />
                        <button @click="addShift(location.id, i, 'thursday')">Add shift</button>
                    </td>
                    <td>
                        <ShiftEdit v-for="shiftId in week.friday" :shiftId="shiftId" />
                        <button @click="addShift(location.id, i, 'friday')">Add shift</button>
                    </td>
                    <td>
                        <ShiftEdit v-for="shiftId in week.saturday" :shiftId="shiftId" />
                        <button @click="addShift(location.id, i, 'saturday')">Add shift</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </template>
</template>

<style scoped>
td {
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    min-width: 80px;
}
</style>