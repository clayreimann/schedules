<script setup lang="ts">
import type { Weekday, ShiftSpec, Week, ShiftSpecId, ScheduleId } from '@/stores/data-model';
import { useLocationStore } from '@/stores/locations';
import { useScheduleStore } from '@/stores/schedules';
import { useShiftStore } from '@/stores/shifts';
import { computed } from 'vue';


const props = defineProps<{
    day: Weekday,
    week: number,
    scheduleId: ScheduleId,
    selectedShifts: ShiftSpecId[],
}>()

const locationStore = useLocationStore()
const shiftStore = useShiftStore()
const scheduleStore = useScheduleStore()
const schedule = computed(() => scheduleStore.schedules[props.scheduleId])
const shiftsByDay = computed(() => Object.keys(locationStore.shiftByDay).reduce(
    (shifts, day) => {
        const weekday = day as Weekday
        shifts[weekday] = locationStore.shiftByDay[weekday].map(id => shiftStore.shifts[id])
        return shifts
    }, {} as Record<Weekday, ShiftSpec[]>)
)
const startTimes = computed(() => Object.keys(locationStore.shiftByDay).reduce(
    (startTimes, day) => {
        const weekday = day as Weekday
        const shiftSpecs = locationStore.shiftByDay[weekday].map(id => shiftStore.shifts[id])
        startTimes[weekday] = shiftSpecs.reduce((starts, shift) => {
            if (!starts[shift.begin]) {
                starts[shift.begin] = []
            }
            starts[shift.begin].push(shift)
            return starts;
        }, {} as Record<number, ShiftSpec[]>)
        return startTimes
    }, {} as Record<Weekday, Record<number, ShiftSpec[]>>)
)

const selCls = (shiftId: ShiftSpecId) => props.selectedShifts.includes(shiftId) ? 'active' : ''

const toggleShift = (day: Weekday, shiftId: ShiftSpecId) => {
    const shifts = schedule.value.weeks[props.week][day]
    if (shifts.includes(shiftId)) {
        shifts.splice(shifts.indexOf(shiftId), 1)
    } else {
        shifts.push(shiftId)
    }
}

</script>

<template>
    <div>
        <div v-for="shifts, time of startTimes[day]" class="shift-batch">
            <div class="shift-start">{{ time }}</div>
            <div class="shifts">
                <template v-for="shift in shifts">
                    <a :class="`btn outline ${shift.colorClass} ${selCls(shift.id)}`" @click="toggleShift(day, shift.id)">{{
                        shift.label }}</a>
                </template>
            </div>
        </div>
    </div>
</template>

<style>
.shift-batch {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
}

.shift-start {
    width: 3rem;
}

.shifts {
    display: flex;
    flex-direction: column;
}

.btn.outline {
    border: 1px solid black;
    border-radius: 4px;
    padding: 0.2rem;
    margin: 0.2rem;
    background-color: white;
    cursor: pointer;
    color: inherit;
    text-align: center;


    &.cambridge {
        --btn-color: var(--theme-color-cambridge);
        border-color: var(--btn-color);

        &.active {
            background-color: var(--btn-color);
        }
    }

    &.rose-brown {
        --btn-color: var(--theme-color-rose-brown);
        border-color: var(--btn-color);

        &.active {
            background-color: var(--btn-color);
        }
    }
}

@media print {
    .btn.outline {
        border: none;
        display: none;
        padding: 0;
        margin: 0;

        &.active {
            display: block;
            white-space: nowrap;
        }

        &.cambridge {
            --btn-color: var(--theme-color-cambridge);
            border-color: var(--btn-color);

            &.active {
                background-color: var(--btn-color);
            }
        }

        &.rose-brown {
            --btn-color: var(--theme-color-rose-brown);
            border-color: var(--btn-color);

            &.active {
                background-color: var(--btn-color);
            }
        }
    }

    .shift-batch {
        padding: 0;
    }
    
    .shift-start {
        display: none;
    }

    .shifts {
        display: block;
    }
}
</style>