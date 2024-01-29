import { defineStore } from "pinia";
import { ref } from "vue";


export const useViewOptions = defineStore('view-options', () => {
    const activeWeek = ref(0)
    const showAll = ref(false)
    const showLocations = ref(false)
    const activeLocation = ref("")

    return { activeWeek, showAll, showLocations, activeLocation }
})