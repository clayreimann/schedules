<script setup lang="ts">
import type { PersonId } from '@/stores/data-model';
import { usePeopleStore } from '@/stores/people';
import { useScheduleStore } from '@/stores/schedules';
import { computed } from 'vue';

const props = defineProps<{
    personId: PersonId
}>()

const peopleStore = usePeopleStore()
const person = computed(() => peopleStore.people[props.personId])

const scheduleStore = useScheduleStore()
const remove = (id: PersonId) => {
    delete peopleStore.people[id]
    
    const scheduleId = scheduleStore.scheduleByPersonId[id]
    delete scheduleStore.schedules[scheduleId]
}
</script>

<template>
    <template v-if="person">
        <h4>{{ person.lastName }}, {{ person.firstName }} <small>({{ person.id }})</small></h4>
        <label for="lastName">
            Last name:
            <input type="text" v-model="person.lastName">
        </label>
        <label for="firstName">
            First name:
            <input type="text" v-model="person.firstName">
        </label>
        <a class="btn btn-danger" @click="remove(person.id)">Delete Employee</a>
    </template>
</template>

<style scoped>
label {
    display: block;
}
small {
    font-size: 0.8rem;
}
</style>