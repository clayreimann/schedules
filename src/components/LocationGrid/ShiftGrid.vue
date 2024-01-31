<script setup lang="ts">
import type { PersonId, ShiftSpecId } from '@/stores/data-model';
import { usePeopleStore } from '@/stores/people';
import { useScheduleStore } from '@/stores/schedules';
import { useShiftStore } from '@/stores/shifts';
import { computed } from 'vue';

const props = defineProps<{
    shiftId: ShiftSpecId
    week: number
    collapsed: boolean
    personId?: PersonId
}>()

const shiftStore = useShiftStore()
const peopleStore = usePeopleStore()
const scheduleStore = useScheduleStore()

const shift = computed(() => shiftStore.shifts[props.shiftId])
const slots = computed(() => scheduleStore.peopleByShiftId[props.week][props.shiftId] || [])
const displayName = (personId: PersonId) => `${peopleStore.people[personId].lastName}`
const getName = (personId: PersonId) => `${peopleStore.people[personId].lastName}, ${peopleStore.people[personId].firstName}`
const isWorking = slots.value.includes(props.personId ?? 'nope')
</script>

<template>
    <div :class="`shift-container text-${shift.colorClass}`">
        <b :title="shift.id" :class="collapsed ? 'collapsed' : ''">{{ shift.label }}</b>
        <span v-if="collapsed" :class="`counter ${isWorking ? 'working' : ''}`" :title="slots.map(getName).join('\n')">
            {{ slots.length }} of {{ shift.slots }}
        </span>
        <div v-else v-for="n in shift.slots" class="shift">
            <span v-if="slots[n - 1]">
                <span :class="slots[n - 1] === personId ? 'working' : ''" :title="getName(slots[n - 1])">{{
                    displayName(slots[n - 1]) }}</span>
            </span>
            <span class="empty" v-else>Empty</span>
        </div>
        <div class="shift overflow" v-if="slots.length > shift.slots"
            :title="slots.slice(shift.slots).map(getName).join(' / ')">+ {{ slots.length - shift.slots }} more (hover)</div>
    </div>
</template>

<style>
.working {
    text-decoration: underline;
    font-weight: bold;
}

.shift-container {
    padding: 0.3rem 0.1rem;

    & span.counter {
        display: inline-block;
        margin-left: 1rem;
    }

    & b {
        display: block;

        &.collapsed {
            display: inline-block;
            min-width: 4rem;
        }
    }

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
</style>

<style scoped>
.shift {
    padding: 0.1rem 0.3rem;
    border-top: 1px dotted var(--color-border);

    &:first-of-type {
        border-top: 0;
    }

    &.overflow {
        font-style: italic;
    }
}

.empty {
    color: black;
    font-weight: bold;
}

.overflow {
    font-weight: bold;
}

@media print {
    .empty {
        font-weight: normal;
        text-decoration: underline;
    }
}
</style>