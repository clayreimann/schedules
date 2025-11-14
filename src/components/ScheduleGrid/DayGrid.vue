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

const isShiftConflicting = (shiftId: ShiftSpecId) => {
    const shift = shiftStore.shifts[shiftId]
    if (!shift) return false

    // Get all shifts the person is assigned to on this day
    const assignedShifts = props.selectedShifts

    // Check if any assigned shift overlaps in time
    for (const assignedShiftId of assignedShifts) {
        // Skip if it's the same shift (already selected)
        if (assignedShiftId === shiftId) continue

        const assignedShift = shiftStore.shifts[assignedShiftId]
        if (!assignedShift) continue

        // Check for time overlap: (shift1.begin < shift2.end && shift1.end > shift2.begin)
        if (shift.begin < assignedShift.end && shift.end > assignedShift.begin) {
            return true
        }
    }

    return false
}

const disabledCls = (shiftId: ShiftSpecId) => isShiftConflicting(shiftId) ? 'disabled' : ''

const toggleShift = (day: Weekday, shiftId: ShiftSpecId) => {
    // Don't allow toggling if the shift is conflicting
    if (isShiftConflicting(shiftId)) {
        return
    }

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
            <a :class="`btn outline ${shift.colorClass} ${selCls(shift.id)} ${disabledCls(shift.id)}`" @click="toggleShift(day, shift.id)">{{
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

.btn.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
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
            /* Color variants inherit from main.css */
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