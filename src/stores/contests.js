import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useFilterStore } from '@/stores/filters'
import { useUserStore } from '@/stores/users'
import { getUserSubmissions } from '@/services/CodeforcesApiService'

import Contest from '@/models/Contest'

import ContestsData from '@/data/contests.json'

export const useContestStore = defineStore('contests', () => {
    const filterStore = useFilterStore()
    const { selectedDivisions } = storeToRefs(filterStore)

    const userStore = useUserStore()
    const { users } = storeToRefs(userStore)

    const contestData = ContestsData.contests.filter(c => c.phase === 'FINISHED')
                        .filter(c => c.problems != undefined)
                        .map(c => new Contest(c));

    const contests = computed(() => {
        const filterFunctions = [_filterBasedOnDivisions]
        const modifierFunctions = [_addUserAttemptInformation]

        let filteredContests = contestData;

        filteredContests = _filterBasedOnDivisions(filteredContests)
        filteredContests = _addUserAttemptInformation(filteredContests)
        return filteredContests;
    })

    function _filterBasedOnDivisions(contests) {
        if (selectedDivisions.value.length != 0) {
            return contests.filter(contest => selectedDivisions.value.includes(contest.division))
        }
        return contests
    }

    function _addUserAttemptInformation(contests) {
        if (users.value.length == 0) {
        }
        return contests;
    }

    return { contests }
})
