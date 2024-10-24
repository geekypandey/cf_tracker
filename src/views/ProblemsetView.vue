<script setup>
import { ref, computed } from 'vue'
import ContestsData from '@/data/contests.json'
import ProblemCard from '@/components/ProblemCard.vue'

const contests = ref(ContestsData.contests)

const problemSet = computed(() => {
    return contests.value
        .map(contest => contest.problems)
        .flat()
})

console.log(problemSet)
</script>

<template>
    <div class="p-12">
        <div class="grid grid-cols-4 gap-4">
            <ProblemCard :problem="problem" v-for="problem in problemSet" />
        </div>
    </div>
</template>
