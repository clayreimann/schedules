import { defineStore } from "pinia";
import { ref } from "vue";


export const useViewOptions = defineStore('view-options', () => {
    const activeWeek = ref(0)
    const showAll = ref(false)

    return { activeWeek, showAll }
})