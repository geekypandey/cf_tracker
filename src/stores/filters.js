import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', () => {
    const selectedDivisions = ref([])
    // default participant is any
    const participantType = ref('any')
    return { selectedDivisions, participantType };
})
