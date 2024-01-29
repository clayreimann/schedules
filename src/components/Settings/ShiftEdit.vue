<script setup lang="ts">
import type { ShiftSpecId } from '@/stores/data-model';
import { useShiftStore } from '@/stores/shifts';
import { computed, ref } from 'vue';

const props = defineProps<{
    shiftId: ShiftSpecId
}>()
const edit = ref(false)
const shiftStore = useShiftStore()
const shift = computed(() => shiftStore.shifts[props.shiftId])
shift.value.tags = shift.value.tags ?? []
</script>

<template>
    <div :class="`shift-container`">
        <b :class="`text-${shift.colorClass}`">{{ shift.label }} <small> <a @click="edit = !edit" class="btn">{{edit ? 'done' : 'edit'}}</a> </small></b>
        <div v-if="edit">
            <label for="label">
                Label:
                <input type="text" v-model="shift.label">
            </label>
            <label for="slots">
                Slots:
                <input type="number" v-model="shift.slots">
            </label>
            <label for="hours">
                Begin: <input class="short" type="number" v-model="shift.begin">
                End: <input class="short" type="number" v-model="shift.end">
            </label>
            <label for="color">
                <span :class="`text-${shift.colorClass}`">Color:</span>
                <select v-model="shift.colorClass">
                    <option v-for="color in ['jet','cambridge','rose-brown','cordovan','flax']" :value="color">{{ color }}</option>
                </select>
            </label>
            <label>
                Tags:<br>
                <span v-for="(tag, i) in shift.tags" :key="i">
                    <input type="text" v-model="shift.tags[i]">
                    <button @click="shift.tags.splice(i, 1)">-</button>
                </span>
                <br v-if="shift.tags.length > 0"><button @click="shift.tags.push('')">+</button>
            </label>
        </div>
        <div v-else>
            <div>Slots: {{ shift.slots }}</div>
            <div>Tags: {{ shift.tags?.join(', ') }} ({{ shift.tags?.length }})</div>
            <div>Times: {{ shift.begin }} - {{ shift.end }}</div>
        </div>
    </div>
</template>

<style scoped>
label {
    display: block;
}

input {
    width: 5rem;

    &.short {
        width: 3rem;
    }
}
</style>