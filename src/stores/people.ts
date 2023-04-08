import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { Person, PersonId } from './data-model'

export const usePeopleStore = defineStore('people', () => {
    const people = useLocalStorage('store/people', {} as Record<PersonId, Person>, { listenToStorageChanges: true })
    
    const ids = computed(() => Object.keys(people.value)
        .map(id => people.value[id])
        .sort((a, b) => {
            console.log(a.lastName, b.lastName, a.lastName < b.lastName ? -1 : 1);
            return a.lastName < b.lastName ? -1 : 1
        })
        .map(p => p.id)
    )

    return { people, ids }
})
