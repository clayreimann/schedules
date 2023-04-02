<script setup lang="ts">
import type { ShiftSpecId } from '@/stores/data-model';
import { usePeopleStore } from '@/stores/people';
import { useScheduleStore } from '@/stores/schedules';
import { useShiftStore } from '@/stores/shifts';
import { computed, defineProps } from 'vue';

const props = defineProps<{
    shiftId: ShiftSpecId
    week: number
}>()

const shiftStore = useShiftStore()
const peopleStore = usePeopleStore()
const scheduleStore = useScheduleStore()

const shift = computed(() => shiftStore.shifts[props.shiftId])
const slots = computed(() => scheduleStore.peopleByShiftId[props.week][props.shiftId] || [])

</script>

<template>
    <div :class="`shift-container ${shift.colorClass}`">
        <b :title="shift.id">{{ shift.label }}</b>
        <div v-for="n in shift.slots" class="shift">
            <span v-if="slots[n-1]">
                {{ peopleStore.people[slots[n - 1]].name }}
            </span>
            <span class="empty" v-else>Empty</span>
        </div>
    </div>
</template>

<style scoped>
.shift-container {
    padding: 0.3rem 0.1rem;

    &.cambridge {
        /* border: 1px solid var(--theme-color-cambridge); */

        & b {
            color: var(--theme-color-cambridge);
        }
    }

    &.rose-brown {
        /* border: 1px solid var (--theme-color-rose-brown); */

        & b {
            color: var(--theme-color-rose-brown);
        }
    }
}

.shift {
    padding: 0.1rem 0.3rem;
    border-top: 1px dotted var(--color-border);

    &:first-of-type {
        border-top: 0;
    }
}

.empty {
    color: lightgray;
}
</style>