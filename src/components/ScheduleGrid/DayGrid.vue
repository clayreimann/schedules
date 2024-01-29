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
    <div class="shifts">
        <template v-for="shift in shiftsByDay[day]">
            <a :class="`btn outline ${shift.colorClass} ${selCls(shift.id)}`" @click="toggleShift(day, shift.id)">{{
                shift.label }}</a>
        </template>
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

        &.jet {
            --btn-color: var(--theme-color-jet);
            border-color: var(--btn-color);

            &.active {
                background-color: var(--btn-color);
            }
        }

        &.cordovan {
            --btn-color: var(--theme-color-cordovan);
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