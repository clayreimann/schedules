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
    tags: string[]
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
