<script setup lang="ts">
import ScheduleGrid from '@/components/ScheduleGrid/ScheduleGrid.vue';
import type { PersonId } from '@/stores/data-model';
import { usePeopleStore } from '@/stores/people';
import { useScheduleStore } from '@/stores/schedules';
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const peopleStore  = usePeopleStore()
const scheduleStore = useScheduleStore()

const personId = computed(() => route.params.id as PersonId)
const person = computed(() => peopleStore.people[personId.value])
const scheduleId = computed(() => scheduleStore.scheduleByPersonId[personId.value])

</script>

<template>
  <div class="schedule-view">
    {{ person.name }}
    <ScheduleGrid :schedule-id="scheduleId" />
  </div>
</template>

<style>
.schedule-view {
  padding-bottom: 2rem;
}
</style>