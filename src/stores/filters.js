import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', () => {
    const selectedDivisions = ref([])
    return { selectedDivisions };
})
