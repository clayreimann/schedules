<script setup lang="ts">
import { useViewOptions } from '@/stores/view-options';

const viewOptions = useViewOptions()

</script>

<template>
    <div class="view-options">
        <b>Display Options:</b>
        <label>
            Show All
            <input type="checkbox" v-model="viewOptions.showAll">
        </label>
        <label>
            Show Locations
            <input type="checkbox" v-model="viewOptions.showLocations">
        </label>
        <label v-if="!viewOptions.showAll">
            <select v-model.number="viewOptions.activeWeek">
                <option value="0">1st</option>
                <option value="1">2nd</option>
                <option value="2">3rd</option>
                <option value="3">4th</option>
            </select>
        </label>
        <label>
            Collapsed
            <input type="checkbox" v-model="viewOptions.collapsed">
        </label>
    </div>
</template>

<style scoped>
.view-options {
  display: inline-flex;
  place-content: center;

  & label {
    display: inline-block;
    padding: 0 0.5rem;
  }
}
</style>