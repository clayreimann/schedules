<script setup lang="ts">
import type { PersonId } from '@/stores/data-model';
import { usePeopleStore } from '@/stores/people';
import { computed } from 'vue';

const props = defineProps<{
    personId: PersonId
}>()

const peopleStore = usePeopleStore()
const person = computed(() => peopleStore.people[props.personId])
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