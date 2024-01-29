import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { v4 as uuid } from 'uuid';
import type { Location, LocationId, ShiftSpecId, Weekday } from './data-model'


export const useLocationStore = defineStore('locations', () => {
    const locations = useLocalStorage('store/locations', {} as Record<LocationId, Location>, { listenToStorageChanges: true })

    const addLocation = () => {
        const locationId = uuid().replace(/-/g, '')
        locations.value[locationId] = {
            id: locationId,
            name: 'New Location',
            template: [1, 2, 3, 4].map(() => ({
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
            }))
        }
        return locationId;
    }

    const addShift = (locationId: LocationId, week: number, day: Weekday, shiftId: ShiftSpecId) => {
        locations.value[locationId].template[week][day].push(shiftId)
    }

    const shiftByDay = computed(() => Object.keys(locations.value).reduce((shifts, locationId) => {
        const schedule = locations.value[locationId].template[0] 
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

    return { locations, shiftByDay, addLocation, addShift }
})
