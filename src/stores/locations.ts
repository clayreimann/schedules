import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { ShiftSpecId, Location, LocationId, ShiftSpec } from './data-model'

const initLocations: Record<LocationId, Location> = {
    'west-towne': {
        id: 'west-towne',
        name: 'West Towne Clinic',
        template: [
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] }
        ]
    },
    'union-corners': {
        id: 'union-corners',
        name: 'Union Corners Clinic',
        template: [
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
            { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] }
        ]
    }
}

const initShifts = ['wt', 'uc'].reduce((locs: Record<ShiftSpecId, ShiftSpec>, loc) => {
    ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((day) => {
        ['am', 'pm', 'eve'].forEach((shift) => {
            let time = '8-12'
            const isWeekend = day == 'sat' || day == 'sun'
            if (isWeekend && shift == 'am') {
                time = '8-1'
            } else if (isWeekend && shift == 'pm') {
                time = '1-6'
            } else if (shift == 'pm') {
                time = '12-4'
            } else if (shift == 'eve') {
                time = '4-9'
            }
            if (shift == 'eve' && isWeekend) {
                return
            }
            const id: ShiftSpecId = `${loc}-${day}-${shift}`
            locs[id] = {
                id,
                time,
                label: `${loc == 'wt' ? 'West Towne' : 'Union Corners'} ${shift.toLocaleUpperCase()}`,
                slots: 4,
                colorClass: loc == 'wt' ? 'cambridge' : 'rose-brown'
            }
            const location = loc == 'wt' ? initLocations['west-towne'] : initLocations['union-corners']
            if (day == 'mon') {
                location.template[0].monday.push(id)
                location.template[1].monday.push(id)
                location.template[2].monday.push(id)
                location.template[3].monday.push(id)
            } else if (day == 'tue') {
                location.template[0].tuesday.push(id)
                location.template[1].tuesday.push(id)
                location.template[2].tuesday.push(id)
                location.template[3].tuesday.push(id)
            } else if (day == 'wed') {
                location.template[0].wednesday.push(id)
                location.template[1].wednesday.push(id)
                location.template[2].wednesday.push(id)
                location.template[3].wednesday.push(id)
            } else if (day == 'thu') {
                location.template[0].thursday.push(id)
                location.template[1].thursday.push(id)
                location.template[2].thursday.push(id)
                location.template[3].thursday.push(id)
            } else if (day == 'fri') {
                location.template[0].friday.push(id)
                location.template[1].friday.push(id)
                location.template[2].friday.push(id)
                location.template[3].friday.push(id)
            } else if (day == 'sat') {
                location.template[0].saturday.push(id)
                location.template[1].saturday.push(id)
                location.template[2].saturday.push(id)
                location.template[3].saturday.push(id)
            } else if (day == 'sun') {
                location.template[0].sunday.push(id)
                location.template[1].sunday.push(id)
                location.template[2].sunday.push(id)
                location.template[3].sunday.push(id)
            }
        })
    })
    return locs
}, {})

export const useShiftStore = defineStore('shifts', () => {
    const shifts = reactive(initShifts)

    return { shifts }
})

export const useLocationStore = defineStore('locations', () => {
    const locations = reactive<Record<LocationId, Location>>(initLocations)

    return { locations }
})
