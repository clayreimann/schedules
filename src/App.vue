<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalScheduleView from '@/views/GlobalScheduleView.vue'
import { usePeopleStore } from '@/stores/people'
import { useLocationStore } from '@/stores/locations';
import ContextSelect from '@/components/ContextSelect.vue'

const peopleStore = usePeopleStore()
const locationStore = useLocationStore()
</script>

<template>
  <div class="wrapper">
    <nav>
      <div>
        <h5>Locations</h5>
        <template v-for="l in locationStore.locations">
          <RouterLink :to="`/location/${l.id}`">{{ l.name }}</RouterLink>
        </template>
      </div>

      <div>
        <h5>People</h5>
        <template v-for="id in peopleStore.ids">
          <RouterLink :to="`/schedule/${id}`">{{ peopleStore.people[id].lastName }}, {{ peopleStore.people[id].firstName }}</RouterLink>
        </template>
      </div>

      <div>
        <h5>Other</h5>
        <RouterLink to="/all">Everything</RouterLink>
        <RouterLink to="/">Settings</RouterLink>
        <RouterLink to="/export">Import/Export</RouterLink>
        <ContextSelect/>
      </div>

    </nav>

    <div class="portal">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
:root {
  --nav-height: 3rem;
}

.wrapper {
  height: 100vh;
}

.portal {
  height: calc(100vh - 15rem);
  overflow: auto;
}

nav {
  width: 100%;
  height: 15rem;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav div a:last-of-type {
  margin-right: 0.5rem;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
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
    font-size: 1rem;

    padding: 1rem 0;
  }
}

@media print {
  nav {
    display: none;
  }
  .wrapper {
    height: initial;
  }
  .portal {
    height: initial;
    overflow: initial;
  }
}
</style>
