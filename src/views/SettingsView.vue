<script setup lang="ts">
import PersonEdit from '@/components/Settings/PersonEdit.vue';
import { usePeopleStore } from '@/stores/people';
import { ref } from 'vue';
import { v4 as uuid } from 'uuid';

const peopleStore = usePeopleStore()
const selectedPerson = ref('')
const newEmployee = () => {
  const newId = uuid().replace(/-/g, '')
  peopleStore.people[newId] = { id: newId, lastName: 'Employee', firstName: 'New' }
  selectedPerson.value = newId
}
</script>

<template>
  <h3>Edit Personnel</h3>
  <div class="header">
    <select v-model="selectedPerson">
      <option value="">Select an employee</option>
      <option v-for="person in peopleStore.people" :value="person.id">{{ person.lastName }}, {{ person.firstName }}</option>
    </select>
    <a class="btn" @click="newEmployee">Add an employee</a>
  </div>
  <PersonEdit :person-id="selectedPerson" />
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
}

a.btn {
  display: inline-block;
  padding: 0 0.5rem;
  margin: 0 1rem;
}

h3 {
  margin-top: 2rem;
}

h3:first-of-type {
  margin-top: initial;
}
</style>