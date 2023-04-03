<script setup lang="ts">
import type { ScheduleId } from '@/stores/data-model';
import { useScheduleStore } from '@/stores/schedules';
import { useShiftStore } from '@/stores/shifts';
import { computed } from 'vue';
import DayGrid from './DayGrid.vue';

const props = defineProps<{
    scheduleId: ScheduleId
}>()

const scheudleStore = useScheduleStore()
const schedule = computed(() => scheudleStore.schedules[props.scheduleId])

const shiftStore = useShiftStore()


</script>

<template>
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
            <tr v-for="(week, i) in schedule.weeks">
                <td class="variable">{{ i + 1 }}</td>
                <td><DayGrid :week="i" day="sunday" :schedule-id="scheduleId" :selected-shifts="week.sunday"/></td>
                <td><DayGrid :week="i" day="monday" :schedule-id="scheduleId" :selected-shifts="week.monday"/></td>
                <td><DayGrid :week="i" day="tuesday" :schedule-id="scheduleId" :selected-shifts="week.tuesday"/></td>
                <td><DayGrid :week="i" day="wednesday" :schedule-id="scheduleId" :selected-shifts="week.wednesday"/></td>
                <td><DayGrid :week="i" day="thursday" :schedule-id="scheduleId" :selected-shifts="week.thursday"/></td>
                <td><DayGrid :week="i" day="friday" :schedule-id="scheduleId" :selected-shifts="week.friday"/></td>
                <td><DayGrid :week="i" day="saturday" :schedule-id="scheduleId" :selected-shifts="week.saturday"/></td>
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
}
</style>
