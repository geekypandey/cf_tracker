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
              :class="[problem.isSolved ? 'bg-solved-green' : '', contest.isParticipant && !problem.isSolved ? 'bg-unsolved-red' : '']" v-for="problem in contest.problems">
              <span class="w-12 hover:underline hover:cursor-pointer">
                  <a :href="problem.link" target="_blank" class="font-mono text-lg">{{ problem.index }}</a>
                  <span v-if="problem.isSolvedInContest">&#10004;</span>
                  <span v-if="contest.isContestant && !problem.isSolved">&#10008;</span>
              </span>
              <span class="text-sm text-gray-500 font-mono"> {{ problem.solvedCount }} </span>
          </div>
      </div>
  </div>
</template>
