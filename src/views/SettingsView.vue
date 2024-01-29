<script setup lang="ts">
import PersonEdit from '@/components/Settings/PersonEdit.vue';
import { usePeopleStore } from '@/stores/people';
import { ref } from 'vue';
import { v4 as uuid } from 'uuid';
import { useLocationStore } from '@/stores/locations';
import LocationEdit from '@/components/Settings/LocationEdit.vue';
import { useScheduleStore } from '@/stores/schedules';

const peopleStore = usePeopleStore()
const scheduleStore = useScheduleStore()
const selectedPerson = ref('')
const newEmployee = () => {
  const newId = uuid().replace(/-/g, '')
  peopleStore.people[newId] = { id: newId, lastName: 'Employee', firstName: 'New' }
  scheduleStore.addSchedule(newId);
  selectedPerson.value = newId
}


const locationStore = useLocationStore()
const selectedLocation = ref('')

const addLocation = () => {
  selectedLocation.value = locationStore.addLocation()
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

  <h3>Edit Locations</h3>
  <div class="header">
    <select v-model="selectedLocation">
      <option value="">Select a location</option>
      <option v-for="location in locationStore.locations" :value="location.id">{{ location.name }}</option>
    </select>
    <a class="btn" @click="addLocation">Add a location</a>
  </div>
  <LocationEdit :location-id="selectedLocation" />
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
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