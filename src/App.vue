<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalScheduleView from '@/views/GlobalScheduleView.vue'
import { usePeopleStore } from '@/stores/people'

const peopleStore = usePeopleStore()
</script>

<template>
  <div class="wrapper">
    <GlobalScheduleView />
  </div>


  <nav>
    <RouterLink to="/">Settings</RouterLink>
    <template v-for="id in peopleStore.ids">
      <RouterLink :to="`/schedule/${id}`">{{ peopleStore.people[id].name }}</RouterLink>
    </template>
  </nav>
  <RouterView />
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    padding-right: calc(var(--section-gap) / 2);
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
