<script setup lang="ts">
import type { ShiftSpecId } from '@/stores/data-model';
import { useShiftStore } from '@/stores/shifts';
import { computed } from 'vue';

const props = defineProps<{
    shiftId: ShiftSpecId
}>()
const shiftStore = useShiftStore()
const shift = computed(() => shiftStore.shifts[props.shiftId])
</script>

<template>
    <div :class="`shift-container ${shift.colorClass}`">
        <b>{{ shift.label }}</b>
        <label for="slots">
            Slots:
            <input type="number" v-model="shift.slots">
        </label>
    </div>
</template>

<style scoped>
input {
    width: 50%;
}
</style>