<script setup lang="ts">
import { useLocationStore } from '@/stores/locations';
import { usePeopleStore } from '@/stores/people';
import { useScheduleStore } from '@/stores/schedules';
import { useShiftStore } from '@/stores/shifts';


const locationStore = useLocationStore()
const peopleStore = usePeopleStore()
const scheduleStore = useScheduleStore()
const shiftStore = useShiftStore()

const pad = (num: number, depth = 2) => {
    const len = `${num}`.length
    return '0'.repeat(depth - len) + `${num}`
}
const saveFile = () => {
    const text = JSON.stringify({
        locations: locationStore.locations,
        schedules: scheduleStore.schedules,
        shifts: shiftStore.shifts,
        people: peopleStore.people,
    }, null, 2);
    const now = new Date()
    const date = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}T${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
	const filename = `schedule-run-${date}.schedule`;
	const element = document.createElement('a');
	element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);     
}
const processFile = async (target: HTMLInputElement | null) => {
    if (target === null || target.files === null || target.files.length == 0) {
        return
    }
    const text = await target.files[0].text()
    try {
        const data = JSON.parse(text)
        console.log(data);
        if (data.shifts) {
            shiftStore.shifts = data.shifts
        }
        if (data.people) {
            peopleStore.people = data.people
        }
        if (data.locations) {
            locationStore.locations = data.locations
        }
        if (data.schedules) {
            scheduleStore.schedules = data.schedules
        }
    } catch (e) {
        console.error(e)
        console.error('From text: ', text)
    }
}
const deleteData = () => {
    shiftStore.shifts = {}
    peopleStore.people = {}
    locationStore.locations = {}
    scheduleStore.schedules = {}
}
</script>

<template>
    <h3>Import/Export</h3>
    <div>
        <label for="upload">            
            <input type="file" accept=".json,.schedule" @change="processFile($event.target as HTMLInputElement)">
        </label>
    </div>
    <div>
        <a @click="saveFile">Download data</a>
    </div>
    <div>
        <a @click="deleteData">Delete all data!</a>
    </div>
</template>