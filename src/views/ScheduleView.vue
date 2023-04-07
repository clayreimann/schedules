<script setup lang="ts">
import ScheduleGrid from '@/components/ScheduleGrid/ScheduleGrid.vue';
import type { PersonId } from '@/stores/data-model';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const personId = computed(() => route.params.id as PersonId)

</script>

<template>
  <div class="schedule-view">
    <ScheduleGrid :person-id="personId" />
  </div>
</template>

<style>
.schedule-view {
  padding-bottom: 2rem;
}
</style>