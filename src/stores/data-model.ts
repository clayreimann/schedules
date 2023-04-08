export type ShiftSpecId = string

export type LocationId = string

export type PersonId = string

export type ScheduleId = string

export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface Location {
    id: LocationId
    name: string
    template: TemplateWeek[]
}

export interface TemplateWeek {
    monday: ShiftSpecId[]
    tuesday: ShiftSpecId[]
    wednesday: ShiftSpecId[]
    thursday: ShiftSpecId[]
    friday: ShiftSpecId[]
    saturday: ShiftSpecId[]
    sunday: ShiftSpecId[]
}

export interface ShiftSpec {
    id: ShiftSpecId
    begin: number
    end: number
    slots: number
    label: string
    colorClass: string
}

export interface Person {
    id: PersonId
    lastName: string
    firstName: string
}

export interface Schedule {
    id: ScheduleId
    personId: PersonId
    weeks: Week[]
}

export interface Week {
    monday: ShiftSpecId[]
    tuesday: ShiftSpecId[]
    wednesday: ShiftSpecId[]
    thursday: ShiftSpecId[]
    friday: ShiftSpecId[]
    saturday: ShiftSpecId[]
    sunday: ShiftSpecId[]
}

export const tmplLocations: Record<LocationId, Location> = {
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

export const tmplShifts = ['wt', 'uc'].reduce((locs: Record<ShiftSpecId, ShiftSpec>, loc) => {
    ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach((day) => {
        ['am', 'pm', 'eve'].forEach((shift) => {
            let begin = 8
            let end = 12
            const isWeekend = day == 'sat' || day == 'sun'
            if (isWeekend && shift == 'am') {
                begin = 8
                end = 13
            } else if (isWeekend && shift == 'pm') {
                begin = 13
                end = 18
            } else if (shift == 'pm') {
                begin = 12
                end = 16
            } else if (shift == 'eve') {
                begin = 16
                end = 21
            }
            if (shift == 'eve' && isWeekend) {
                return
            }
            const id: ShiftSpecId = `${loc}-${day}-${shift}`
            locs[id] = {
                id,
                begin,
                end,
                label: `${loc == 'wt' ? 'West Towne' : 'Union Corners'} ${shift.toLocaleUpperCase()}`,
                slots: 4,
                colorClass: loc == 'wt' ? 'cambridge' : 'rose-brown'
            }
            const location = loc == 'wt' ? tmplLocations['west-towne'] : tmplLocations['union-corners']
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

export const tmplPeople = [
    { id: 'berkner-laura', name: 'Berkner, Laura', },
    { id: 'christensen-kayla', name: 'Christensen, Kayla', },
    { id: 'douglas-carolyn', name: 'Douglas, Carolyn', },
    { id: 'erickson-avid', name: 'Erickson, David', },
    { id: 'hoffmann-rika', name: 'Hoffmann, Erika', },
    { id: 'goebel-cassie', name: 'Goebel, Cassie', },
    { id: 'gorbach-roxanne', name: 'Gorbach, Roxanne', },
    { id: 'jensen-reimann-kaitlyn', name: 'Jensen-Reimann, Kaitlyn', },
    { id: 'margaret-xxx', name: 'Margaret, XXX', },
    { id: 'mcdonald-thomas', name: 'McDonald, Thomas ', },
    { id: 'novoa-leah', name: 'Novoa, Leah ', },
    { id: 'packwood-katherine', name: 'Packwood, Katherine ', },
    { id: 'pechacek-jaime', name: 'Pechacek, Jaime ', },
    { id: 'penaranda-sean', name: 'Penaranda, Sean', },
    { id: 'plasky-james', name: 'Plasky, James', },
    { id: 'rowe-amanda', name: 'Rowe, Amanda', },
    { id: 'schroeder-therese', name: 'Schroeder, Therese', },
    { id: 'swodziski-olivia', name: 'Swodziski, Olivia', },
    { id: 'traut-alexander', name: 'Traut, Alexander', },
    { id: 'wahmhoff-neszta', name: 'Wahmhoff, Neszta', },
    { id: 'wallner-joseph', name: 'Wallner, Joseph', },
    { id: 'wolter-elizabeth', name: 'Wolter, Elizabeth', }
].reduce((peopleById, person) => {
    peopleById[person.id] = person
    return peopleById
}, {} as Record<PersonId, Person>)

export const tmplSchedules: Record<ScheduleId, Schedule> = {
    'berkner-laura': {
        id: 'berkner-laura', personId: 'berkner-laura',
        weeks: [
            { sunday: [], monday: ['wt-mon-am'], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'christensen-kayla': {
        id: 'christensen-kayla', personId: 'christensen-kayla',
        weeks: [
            { sunday: [], monday: ['wt-mon-am'], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'douglas-carolyn': {
        id: 'douglas-carolyn', personId: 'douglas-carolyn',
        weeks: [
            { sunday: [], monday: ['wt-mon-am', 'wt-mon-pm'], tuesday: [], wednesday: [], thursday: ['uc-thu-am', 'uc-thu-pm'], friday: ['uc-fri-eve'], saturday: [] },
            { sunday: ['uc-sun-am', 'uc-sun-pm'], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'erickson-avid': {
        id: 'erickson-avid', personId: 'erickson-avid',
        weeks: [
            { sunday: [], monday: ['wt-mon-am'], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'hoffmann-rika': {
        id: 'hoffmann-rika', personId: 'hoffmann-rika',
        weeks: [
            { sunday: [], monday: ['wt-mon-am'], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'goebel-cassie': {
        id: 'goebel-cassie', personId: 'goebel-cassie',
        weeks: [
            { sunday: [], monday: ['wt-mon-am'], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'gorbach-roxanne': {
        id: 'gorbach-roxanne', personId: 'gorbach-roxanne',
        weeks: [
            { sunday: [], monday: ['wt-mon-am'], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'jensen-reimann-kaitlyn': {
        id: 'jensen-reimann-kaitlyn', personId: 'jensen-reimann-kaitlyn',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'margaret-xxx': {
        id: 'margaret-xxx', personId: 'margaret-xxx',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'mcdonald-thomas': {
        id: 'mcdonald-thomas', personId: 'mcdonald-thomas',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'novoa-leah': {
        id: 'novoa-leah', personId: 'novoa-leah',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'packwood-katherine': {
        id: 'packwood-katherine', personId: 'packwood-katherine',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'pechacek-jaime': {
        id: 'pechacek-jaime', personId: 'pechacek-jaime',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'penaranda-sean': {
        id: 'penaranda-sean', personId: 'penaranda-sean',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'plasky-james': {
        id: 'plasky-james', personId: 'plasky-james',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'rowe-amanda': {
        id: 'rowe-amanda', personId: 'rowe-amanda',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'schroeder-therese': {
        id: 'schroeder-therese', personId: 'schroeder-therese',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'swodziski-olivia': {
        id: 'swodziski-olivia', personId: 'swodziski-olivia',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'traut-alexander': {
        id: 'traut-alexander', personId: 'traut-alexander',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'wahmhoff-neszta': {
        id: 'wahmhoff-neszta', personId: 'wahmhoff-neszta',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'wallner-joseph': {
        id: 'wallner-joseph', personId: 'wallner-joseph',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    },
    'wolter-elizabeth': {
        id: 'wolter-elizabeth', personId: 'wolter-elizabeth',
        weeks: [
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
            { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] },
        ]
    }

}