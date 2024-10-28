<script setup>
defineProps({
    index: Number,
    contest: Object,
})
</script>

<template>
  <div class="flex space-x-2 w-full p-2 items-center pl-4">
      <div>{{ index }} </div>
      <div class="py-2 text-center hover:underline hover:cursor-pointer w-96">
          <a :href="contest.link" target="_blank" class="font-mono text-md">{{ contest.name }}</a>
      </div>
      <div class="flex space-x-1 p-0">
          <div class="flex flex-col items-center text-center border border-black rounded-md w-20" 
              :class="[problem.isSolved ? 'bg-solved-green' : '', (problem.isAttempted && !problem.isSolved) ? 'bg-unsolved-red' : '']" v-for="problem in contest.problems">
              <span class="w-12 hover:underline hover:cursor-pointer flex space-x-1 items-center justify-center">
                  <a :href="problem.link" target="_blank" class="font-mono text-lg" :class="{ 'dark:text-black': problem.isAttempted }">{{ problem.index }}</a>
                  <span v-if="problem.isSolvedInContest" class="text-black">&#10003;</span>
                  <span v-if="contest.isContestant && problem.isAttempted && !problem.isSolved" class="dark:text-black">&#10008;</span>
              </span>
              <span class="text-sm text-gray-500 font-mono" :class="[problem.isSolved ? 'dark:text-gray-600' : 'dark:text-gray-400']"> {{ problem.solvedCount }} </span>
          </div>
      </div>
  </div>
</template>
