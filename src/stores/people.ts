import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Person, PersonId } from './data-model'

export const usePeopleStore = defineStore('people', () => {
    const people = reactive<Record<PersonId, Person>>({
        'berkner-laura': { id: 'berkner-laura', name: 'Berkner, Laura', },
        'christensen-kayla': { id: 'christensen-kayla', name: 'Christensen, Kayla', },
        'douglas-carolyn': { id: 'douglas-carolyn', name: 'Douglas, Carolyn', },
        'erickson-avid': { id: 'erickson-avid', name: 'Erickson, David', },
        'hoffmann-rika': { id: 'hoffmann-rika', name: 'Hoffmann, Erika', },
        'goebel-cassie': { id: 'goebel-cassie', name: 'Goebel, Cassie', },
        'gorbach-roxanne': { id: 'gorbach-roxanne', name: 'Gorbach, Roxanne', },
        'jensen-reimann-kaitlyn': { id: 'jensen-reimann-kaitlyn', name: 'Jensen-Reimann, Kaitlyn', },
        'margaret-xxx': { id: 'margaret-xxx', name: 'Margaret, XXX', },
        'mcdonald-thomas': { id: 'mcdonald-thomas', name: 'McDonald, Thomas ', },
        'novoa-leah': { id: 'novoa-leah', name: 'Novoa, Leah ', },
        'packwood-katherine': { id: 'packwood-katherine', name: 'Packwood, Katherine ', },
        'pechacek-jaime': { id: 'pechacek-jaime', name: 'Pechacek, Jaime ', },
        'penaranda-sean': { id: 'penaranda-sean', name: 'Penaranda, Sean', },
        'plasky-james': { id: 'plasky-james', name: 'Plasky, James', },
        'rowe-amanda': { id: 'rowe-amanda', name: 'Rowe, Amanda', },
        'schroeder-therese': { id: 'schroeder-therese', name: 'Schroeder, Therese', },
        'swodziski-olivia': { id: 'swodziski-olivia', name: 'Swodziski, Olivia', },
        'traut-alexander': { id: 'traut-alexander', name: 'Traut, Alexander', },
        'wahmhoff-neszta': { id: 'wahmhoff-neszta', name: 'Wahmhoff, Neszta', },
        'wallner-joseph': { id: 'wallner-joseph', name: 'Wallner, Joseph', },
        'wolter-elizabeth': { id: 'wolter-elizabeth', name: 'Wolter, Elizabeth', }
    })
    const ids = computed(() => Object.keys(people).sort())

    return { people, ids }
})
