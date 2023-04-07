import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from 'vue';
import type { PersonId, Schedule, ScheduleId, ShiftSpecId } from './data-model';


export const useScheduleStore = defineStore('schedules', () => {
    const schedules = useLocalStorage('store/schedules', {} as Record<ScheduleId, Schedule>, { listenToStorageChanges: true })

    const peopleByShiftId = computed<Record<ShiftSpecId, PersonId[]>[]>(() => {
        const weeks: Record<ShiftSpecId, PersonId[]>[] = []
        for (const id of Object.keys(schedules.value)) {
            const schedule = schedules.value[id]
            for (let wk = 0; wk < schedule.weeks.length; wk++) {
                if (weeks.length <= wk) {
                    weeks.push({})
                }
                const week = schedule.weeks[wk];
                for (const day of [week.sunday, week.monday, week.tuesday, week.wednesday, week.thursday, week.friday, week.saturday]) {
                    for (const shiftId of day) {
                        if (!weeks[wk].hasOwnProperty(shiftId)) {
                            weeks[wk][shiftId] = []
                        }
                        weeks[wk][shiftId].push(schedule.personId)
                    }   
                }
            }
        }
        return weeks;
    })

    const scheduleByPersonId = computed(() => Object.keys(schedules.value).reduce((all, scheduleId) => {
        const schedule = schedules.value[scheduleId]
        all[schedule.personId] = scheduleId
        return all
    }, {} as Record<PersonId, ScheduleId>))

    return { schedules, peopleByShiftId, scheduleByPersonId }
})