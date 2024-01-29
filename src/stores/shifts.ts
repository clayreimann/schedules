import { useLocalStorage } from "@vueuse/core"
import { defineStore } from "pinia"
import { v4 as uuid } from 'uuid';
import type { ShiftSpec, ShiftSpecId } from "./data-model"

export const useShiftStore = defineStore('shifts', () => {
    const shifts = useLocalStorage('store/shifts', {} as Record<ShiftSpecId, ShiftSpec>, { listenToStorageChanges: true })

    const addShift = () => {
        const shiftId: ShiftSpecId = uuid().replace(/-/g, '')
        shifts.value[shiftId] = {
            id: shiftId,
            begin: 0,
            end: 0,
            slots: 1,
            label: '',
            tags: [],
            colorClass: '',
        }
        return shiftId
    }

    return { shifts, addShift }
})
