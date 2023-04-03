import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { tmplLocations, type ShiftSpecId, type Weekday } from './data-model'


export const useLocationStore = defineStore('locations', () => {
    const locations = reactive(tmplLocations)

    const shiftByDay = computed(() => Object.keys(locations).reduce((shifts, locationId) => {
        const schedule = locations[locationId].template[0]
        shifts['monday'].push(...schedule.monday)
        shifts['tuesday'].push(...schedule.tuesday)
        shifts['wednesday'].push(...schedule.wednesday)
        shifts['thursday'].push(...schedule.thursday)
        shifts['friday'].push(...schedule.friday)
        shifts['saturday'].push(...schedule.saturday)
        shifts['sunday'].push(...schedule.sunday)
        return shifts
    }, {
        'monday': [] as ShiftSpecId[],
        'tuesday': [] as ShiftSpecId[],
        'wednesday': [] as ShiftSpecId[],
        'thursday': [] as ShiftSpecId[],
        'friday': [] as ShiftSpecId[],
        'saturday': [] as ShiftSpecId[],
        'sunday': [] as ShiftSpecId[],
    } as Record<Weekday, ShiftSpecId[]>))

    return { locations, shiftByDay }
})
