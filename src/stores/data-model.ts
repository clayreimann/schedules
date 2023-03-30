export type ShiftSpecId = string

export type LocationId = string

export type PersonId = string

export type ScheduleId = string

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
    time: string
    slots: number
    label: string
    colorClass: string
}

export interface Person {
    id: PersonId
    name: string
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
