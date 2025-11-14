<script setup lang="ts">
import type { PersonId, ShiftSpecId, Weekday } from '@/stores/data-model';
import { usePeopleStore } from '@/stores/people';
import { useScheduleStore } from '@/stores/schedules';
import { useShiftStore } from '@/stores/shifts';
import { useLocationStore } from '@/stores/locations';
import { computed, ref, nextTick } from 'vue';

const props = defineProps<{
    shiftId: ShiftSpecId
    week: number
    day: Weekday
    collapsed: boolean
    personId?: PersonId
}>()

const shiftStore = useShiftStore()
const peopleStore = usePeopleStore()
const scheduleStore = useScheduleStore()
const locationStore = useLocationStore()

const shift = computed(() => shiftStore.shifts[props.shiftId])
const slots = computed(() => scheduleStore.peopleByShiftId[props.week][props.shiftId] || [])
const displayName = (personId: PersonId) => `${peopleStore.people[personId].lastName}`
const getName = (personId: PersonId) => `${peopleStore.people[personId].lastName}, ${peopleStore.people[personId].firstName}`
const isWorking = slots.value.includes(props.personId ?? 'nope')

// Dropdown state - track which slot is being edited
const editingSlot = ref<number | null>(null)

// Get all shifts for this day/week across all locations
const allShiftsForDay = computed(() => {
    const shifts: ShiftSpecId[] = []
    for (const location of Object.values(locationStore.locations)) {
        const weekTemplate = location.template[props.week]
        if (weekTemplate) {
            shifts.push(...weekTemplate[props.day])
        }
    }
    return shifts
})

// Get available people for assignment (excluding those with conflicting shifts)
const availablePeople = computed(() => {
    const currentShift = shift.value
    if (!currentShift) return []

    const busyPeople = new Set<PersonId>()

    // Find all people assigned to shifts that overlap with the current shift
    for (const otherShiftId of allShiftsForDay.value) {
        const otherShift = shiftStore.shifts[otherShiftId]
        if (!otherShift) continue

        // Check if shifts overlap in time
        const overlaps = currentShift.begin < otherShift.end && currentShift.end > otherShift.begin

        if (overlaps) {
            // Add all people assigned to this overlapping shift
            const assignedPeople = scheduleStore.peopleByShiftId[props.week][otherShiftId] || []
            assignedPeople.forEach(personId => busyPeople.add(personId))
        }
    }

    // Return people not in the busy set
    return peopleStore.ids.filter(id => !busyPeople.has(id))
})

// Assign a person to this shift
const assignPerson = (personId: PersonId, slotIndex: number) => {
    // Get the person's schedule
    const scheduleId = scheduleStore.scheduleByPersonId[personId]
    if (!scheduleId) return

    const schedule = scheduleStore.schedules[scheduleId]
    if (!schedule) return

    const weekShifts = schedule.weeks[props.week][props.day]

    // Check if they're already assigned to this shift
    if (!weekShifts.includes(props.shiftId)) {
        weekShifts.push(props.shiftId)
    }

    editingSlot.value = null
}

// Unassign a person from this shift
const unassignPerson = (personId: PersonId) => {
    const scheduleId = scheduleStore.scheduleByPersonId[personId]
    if (!scheduleId) return

    const schedule = scheduleStore.schedules[scheduleId]
    if (!schedule) return

    const weekShifts = schedule.weeks[props.week][props.day]
    const index = weekShifts.indexOf(props.shiftId)

    if (index !== -1) {
        weekShifts.splice(index, 1)
    }

    editingSlot.value = null
}

const openDropdown = async (slotIndex: number) => {
    editingSlot.value = slotIndex
    // Auto-focus the dropdown on next tick
    await nextTick()
    const dropdown = document.querySelector('.slot-dropdown') as HTMLSelectElement
    if (dropdown) {
        dropdown.focus()
    }
}

const closeDropdown = () => {
    editingSlot.value = null
}
</script>

<template>
    <div :class="`shift-container text-${shift.colorClass}`">
        <b :title="shift.id" :class="collapsed ? 'collapsed' : ''">{{ shift.label }}</b>
        <span v-if="collapsed" :class="`counter ${isWorking ? 'working' : ''}`" :title="slots.map(getName).join('\n')">
            {{ slots.length }} of {{ shift.slots }}
        </span>
        <div v-else v-for="n in shift.slots" class="shift" :key="`slot-${n}`">
            <div class="slot-wrapper">
                <span v-if="editingSlot !== n - 1" @click="openDropdown(n - 1)" class="slot-text clickable">
                    <span v-if="slots[n - 1]" :class="slots[n - 1] === personId ? 'working' : ''" :title="getName(slots[n - 1])">
                        {{ displayName(slots[n - 1]) }}
                    </span>
                    <span class="empty" v-else>Empty</span>
                </span>
                <div v-else class="dropdown-container">
                    <select
                        class="slot-dropdown"
                        :value="slots[n - 1] || ''"
                        @change="(e) => {
                            const target = e.target as HTMLSelectElement;
                            if (target.value === '') {
                                if (slots[n - 1]) unassignPerson(slots[n - 1]);
                                else closeDropdown();
                            } else {
                                assignPerson(target.value, n - 1);
                            }
                        }"
                        @blur="closeDropdown"
                        ref="dropdownRef"
                    >
                        <option value="">-- Select --</option>
                        <option v-if="slots[n - 1]" :value="slots[n - 1]" class="current-option">
                            {{ getName(slots[n - 1]) }} (current)
                        </option>
                        <option v-for="personId in availablePeople" :key="personId" :value="personId">
                            {{ getName(personId) }}
                        </option>
                    </select>
                </div>
            </div>
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

.slot-wrapper {
    position: relative;
}

.slot-text {
    display: inline-block;
    width: 100%;
}

.slot-text.clickable {
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
}

.dropdown-container {
    width: 100%;
}

.slot-dropdown {
    width: 100%;
    padding: 0.2rem;
    border: 1px solid var(--color-border);
    background-color: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
}

.slot-dropdown:focus {
    outline: 2px solid var(--color-border-hover);
    outline-offset: 1px;
}

.current-option {
    font-weight: bold;
}

.empty {
    color: var(--color-text);
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