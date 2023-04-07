<script setup>
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
        <label v-if="!viewOptions.showAll">
            <select v-model.number="viewOptions.activeWeek">
                <option value="0">1</option>
                <option value="1">2</option>
                <option value="2">3</option>
                <option value="3">4</option>
            </select>
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