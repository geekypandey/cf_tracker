import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useFilterStore } from '@/stores/filters'
import { useUserStore } from '@/stores/users'
import { getUserSubmissions } from '@/services/CodeforcesApiService'

import Contest from '@/models/Contest'

import ContestsData from '@/data/contests.json'

export const useContestStore = defineStore('contests', () => {
    const filterStore = useFilterStore()
    const { selectedDivisions, participantType } = storeToRefs(filterStore)

    const userStore = useUserStore()
    const { users } = storeToRefs(userStore)


    const contests = computed(() => {
        const contestData = new Map();
        ContestsData.contests.filter(c => c.phase === 'FINISHED')
                            .filter(c => c.problems != undefined)
                            .map(c => new Contest(c))
                            .toSorted((a, b) => b.startDate - a.startDate)
                            .forEach(c => contestData.set(c.id, c));

        const filterFunctions = [_filterBasedOnDivisions]
        const modifierFunctions = [_addUserAttemptInformation]

        let filteredContests = contestData;

        filteredContests = _addUserAttemptInformation(filteredContests)

        filteredContests = Array.from(filteredContests, (value) => value[1]);

        filteredContests = _filterBasedOnDivisions(filteredContests)
        filteredContests = _filterOnParticipantType(filteredContests)

        return filteredContests;
    })

    function _filterBasedOnDivisions(contests) {
        if (selectedDivisions.value.length != 0) {
            return contests.filter(contest =>
                selectedDivisions.value.includes(contest.division))
        }
        return contests
    }

    function _filterOnParticipantType(contests) {
        if (participantType.value === 'contestant') {
            return contests.filter(contest => contest.isContestant);
        } else if (participantType.value === 'participant') {
            return contests.filter(contest => contest.isParticipant);
        }
        return contests;
    }

    function _addUserAttemptInformation(contests) {
        for (const user of users.value) {
            for (const submission of user.submissions) {
                if (!contests.has(submission.contestId)) continue;
                const participantType = submission.author.participantType;
                contests.get(submission.contestId).participants.add(user.handle);
                if (participantType === 'CONTESTANT') {
                    contests.get(submission.contestId).contestants.add(user.handle);
                }

                // TODO: add information for each problems
                // {username: xyz, inContest: true/false, status: SOLVED, UNSOLVED}
                const contest = contests.get(submission.contestId)
                for (const problem of contest.problems) {
                    if (submission.problem.index === problem.index) {
                        const currentStatus = problem.status.get(user.handle)
                        const inContest = submission.author.participantType === 'CONTESTANT'
                        const isSolved = submission.verdict === 'OK'
                        if (currentStatus == undefined) {
                            problem.status.set(user.handle, {
                                isSolved: isSolved,
                                inContest: inContest,
                            })
                        } else {
                            if (!isSolved) problem.status.get(user.handle).inContest = inContest || currentStatus.inContest;
                            else {
                                if (!currentStatus.isSolved) {
                                    currentStatus.isSolved = isSolved;
                                    currentStatus.inContest = inContest;
                                } else {
                                    currentStatus.inContest = currentStatus.inContest || inContest;
                                }
                            }
                        }
                    }
                }
            }
        }
        return contests;
    }

    return { contests }
})
