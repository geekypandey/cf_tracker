import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/users'

const DEFAULT_PARTICIPANT = 'any'

export const useFilterStore = defineStore('filter', () => {
    const userStore = useUserStore()
    const { users } = storeToRefs(userStore)

    const selectedDivisions = ref([])
    const participant = ref(DEFAULT_PARTICIPANT)

    const participantType = computed({
        get() {
            if (users.value.length > 0) {
                return participant.value;
            }
            return DEFAULT_PARTICIPANT;
        },
        set(newValue) {
            participant.value = newValue
        }
    })
    return { selectedDivisions, participantType };
})
