<script setup>
import { ref, computed } from 'vue'
import ContestsData from '@/data/contests.json'

const contests = ref(ContestsData.contests)

const problemSet = computed(() => {
    return contests.value
        .map(contest => contest.problems)
        .flat()
})

console.log(problemSet)
</script>

<template>
    <div class="grid grid-cols-6 border border-green-600">
        <div v-for="problem in problemSet" class="flex items-center bg-white justify-center h-12 m-1 rounded-md border border-black">
            {{ problem ? problem.name : '' }}
        </div>
    </div>
</template>
