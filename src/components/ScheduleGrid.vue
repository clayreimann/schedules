<script setup lang="ts">
import type { ScheduleId } from '@/stores/data-model';
import { useScheduleStore } from '@/stores/schedules';
import { computed } from 'vue';

const props = defineProps<{
    scheduleId: ScheduleId
}>()

const scheudleStore = useScheduleStore()
const schedule = computed(() => scheudleStore.schedules[props.scheduleId])

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
                <td>{{ week.sunday }}</td>
                <td>{{ week.monday }}</td>
                <td>{{ week.tuesday }}</td>
                <td>{{ week.wednesday }}</td>
                <td>{{ week.thursday }}</td>
                <td>{{ week.friday }}</td>
                <td>{{ week.saturday }}</td>
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
