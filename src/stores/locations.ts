import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { tmplLocations } from './data-model'


export const useLocationStore = defineStore('locations', () => {
    const locations = reactive(tmplLocations)

    return { locations }
})
