import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { Person, PersonId } from './data-model'

export const usePeopleStore = defineStore('people', () => {
    const people = useLocalStorage('store/people', {} as Record<PersonId, Person>, { listenToStorageChanges: true })
    const ids = computed(() => Object.keys(people.value).sort())

    return { people, ids }
})
