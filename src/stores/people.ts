import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { tmplPeople } from './data-model'

export const usePeopleStore = defineStore('people', () => {
    const people = reactive(tmplPeople)
    const ids = computed(() => Object.keys(people).sort())

    return { people, ids }
})
