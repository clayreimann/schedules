import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import { tmplShifts } from "./data-model"

export const useShiftStore = defineStore('shifts', () => {
    const shifts = reactive(tmplShifts)

    return { shifts }
})
