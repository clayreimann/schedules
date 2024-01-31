<script setup lang="ts">
import type { PersonId } from '@/stores/data-model';
import { usePeopleStore } from '@/stores/people';
import { useScheduleStore } from '@/stores/schedules';
import { useViewOptions } from '@/stores/view-options';
import { computed } from 'vue';
import DayGrid from './DayGrid.vue';
import LocationGrid from '../LocationGrid/LocationGrid.vue';
import { useLocationStore } from '@/stores/locations';

const props = defineProps<{
    personId: PersonId
}>()

const peopleStore = usePeopleStore()
const scheduleStore = useScheduleStore()

const person = computed(() => peopleStore.people[props.personId])
const scheduleId = computed(() => scheduleStore.scheduleByPersonId[props.personId])

const viewOptions = useViewOptions()
const scheudleStore = useScheduleStore()
const locationStore = useLocationStore()
const locations = computed(() => Object.keys(locationStore.locations))
const schedule = computed(() => scheudleStore.schedules[scheduleId.value])
const weekIdx = computed(() => viewOptions.activeWeek)
const week = computed(() => schedule.value.weeks[viewOptions.activeWeek])

</script>

<template>
    <div class="no-print" v-if="viewOptions.showLocations">
        <LocationGrid v-for="locationId in locations" :locationId="locationId" :collapsed="viewOptions.collapsed" :person-id="personId" />
    </div>
    <h3 class="employee-name">{{ person.lastName }}, {{ person.firstName }}</h3>
    <table>
        <template v-if="viewOptions.showAll">
            <template v-for="(week, i) in schedule.weeks">
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
                <tr>
                    <td class="variable header">Week&nbsp;{{ i + 1 }}</td>
                    <td><DayGrid :week="i" day="sunday" :schedule-id="scheduleId" :selected-shifts="week.sunday" /></td>
                    <td><DayGrid :week="i" day="monday" :schedule-id="scheduleId" :selected-shifts="week.monday" /></td>
                    <td><DayGrid :week="i" day="tuesday" :schedule-id="scheduleId" :selected-shifts="week.tuesday" /></td>
                    <td><DayGrid :week="i" day="wednesday" :schedule-id="scheduleId" :selected-shifts="week.wednesday" /></td>
                    <td><DayGrid :week="i" day="thursday" :schedule-id="scheduleId" :selected-shifts="week.thursday" /></td>
                    <td><DayGrid :week="i" day="friday" :schedule-id="scheduleId" :selected-shifts="week.friday" /></td>
                    <td><DayGrid :week="i" day="saturday" :schedule-id="scheduleId" :selected-shifts="week.saturday" /></td>
                    <td class="variable"></td>
                </tr>
            </tbody>
            </template>
        </template>
        <template v-else>
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
                <tr>
                    <td class="variable header">Week&nbsp;{{ weekIdx + 1 }}</td>
                    <td><DayGrid :week="weekIdx" day="sunday" :schedule-id="scheduleId" :selected-shifts="week.sunday" /></td>
                    <td><DayGrid :week="weekIdx" day="monday" :schedule-id="scheduleId" :selected-shifts="week.monday" /></td>
                    <td><DayGrid :week="weekIdx" day="tuesday" :schedule-id="scheduleId" :selected-shifts="week.tuesday" /></td>
                    <td><DayGrid :week="weekIdx" day="wednesday" :schedule-id="scheduleId" :selected-shifts="week.wednesday" /></td>
                    <td><DayGrid :week="weekIdx" day="thursday" :schedule-id="scheduleId" :selected-shifts="week.thursday" /></td>
                    <td><DayGrid :week="weekIdx" day="friday" :schedule-id="scheduleId" :selected-shifts="week.friday" /></td>
                    <td><DayGrid :week="weekIdx" day="saturday" :schedule-id="scheduleId" :selected-shifts="week.saturday" /></td>
                    <td class="variable"></td>
                </tr>
            </tbody>
        </template>
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

th, .header {
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


@media print {
    thead:not(:first-of-type) {
        display: none;
    }

    th, .header {
        font-weight: normal;
    }

    .employee-name {
        font-weight: bold;
        text-align: center;
        padding-bottom: 2rem;
    }
}

.employee-name {
    break-before: page;
}
</style>
