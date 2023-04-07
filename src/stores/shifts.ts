import { useLocalStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import type { ShiftSpec, ShiftSpecId } from "./data-model"

export const useShiftStore = defineStore('shifts', () => {
    const shifts = useLocalStorage('store/shifts', {} as Record<ShiftSpecId, ShiftSpec>, { listenToStorageChanges: true })

    return { shifts }
})
