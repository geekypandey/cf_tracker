<script setup>
import ContestsData from "@/data/contests.json";

const contests = ContestsData.contests;
</script>

<template>
  <div v-if="!contests.length" style="text-align: center">Loading.....</div>
  <table class="w-full">
      <tr v-for="(contest, idx) in contests" class="border border-black h-12">
          <td class="border border-black py-2 text-center">{{ idx + 1 }}</td>
          <td class="border border-black py-2 text-left pl-2 text-center">
              <a :href="contest.link" target="_blank">{{ contest.name }}</a>
          </td>
          <td class="grid grid-cols-6 p-0">
              <div v-for="problem in contest.problems" class="m-1 p-1 rounded flex flex-col items-center justify-center text-center border border-black hover:bg-gray-200 hover:cursor-pointer">
                  <a target="_blank">
                      {{ problem.index }}. {{ problem.name }}
                  </a>
                  <div class="flex space-x-6 italic font-mono bg-gray-100">
                      <div class="h-2 w-2">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="1.5" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                      </div>
                      <div>[{{ problem.solvedCount }}]</div>
                  </div>
                  <!-- <span class="italic font-mono">[{{ problem.points }}]</span> -->
              </div>
          </td>
      </tr>
  </table>
</template>

<style scoped>
</style>

