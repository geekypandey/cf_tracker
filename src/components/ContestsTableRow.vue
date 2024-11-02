<script setup>
defineProps({
    index: Number,
    contest: Object,
})
</script>

<template>
    <div class="flex items-center p-2 gap-3">
        <span class="w-8 text-center shrink-0">{{ index }}</span>
        <div class="flex flex-col w-full md:flex-row md:items-center">
            <a :href="contest.link" class="font-mono break-words md:w-96 xl:w-[32rem] shrink-0" target="_blank">{{ contest.name }}</a>

            <div class="flex flex-wrap gap-1">
                <div class="flex flex-col items-center w-14 h-14 justify-center border border-gray-900 rounded-md" 
                    :class="[problem.isSolved ? 'bg-solved-green' : (problem.isAttempted ? 'bg-unsolved-red' : '')]"
                    v-for="problem in contest.problems">
                    <div class="flex gap-0.5">
                        <a :href="problem.link" :class="{ 'dark:text-gray-800' : problem.isAttempted }" target="_blank">{{ problem.index }}</a>
                        <span v-if="problem.isSolvedInContest" class="dark:text-black">&#10003;</span>
                        <span v-if="problem.isContestant && !problem.isSolvedInContest" class="dark:text-black">&#10008;</span>
                    </div>
                    <span class="text-xs dark:text-gray-500 text-gray-600" v-if="problem.solvedCount > 0">[{{ problem.solvedCount }}]</span>
                </div>
            </div>

        </div>
    </div>
</template>
