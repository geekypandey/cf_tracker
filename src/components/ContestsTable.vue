<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filters'

import ContestsData from "@/data/contests.json";
import Contest from '@/models/Contest'

const filterStore = useFilterStore()
const { selectedDivisions } = storeToRefs(filterStore)

const contestData = ContestsData.contests.filter(c => c.phase === 'FINISHED')
                        .filter(c => c.problems != undefined)
                        .map(c => new Contest(c));


const contests = computed(() => {
    if (selectedDivisions.value.length != 0) {
        return contestData.filter(c => selectedDivisions.value.includes(c.division));
    }
    return contestData;
})
</script>

<template>
  <div v-if="!contests.length" style="text-align: center">Loading.....</div>
  <table class="w-full">
      <tr v-for="(contest, idx) in contests" class="border border-black h-12" v-show="contest.display">
          <td class="border border-black py-2 text-center font-mono">{{ idx + 1 }}</td>
          <td class="border border-black py-2 pl-2 text-center hover:bg-gray-200 hover:cursor-pointer">
              <a :href="contest.link" target="_blank" class="font-mono">{{ contest.name }}</a>
          </td>
          <td class="grid grid-cols-6 p-0 group">
              <div v-for="problem in contest.problems" class="m-1 p-1 rounded flex flex-col space-y-1 items-center justify-center text-center border border-black hover:bg-gray-200 hover:cursor-pointer">
                  <a target="_blank">
                      <span class="font-mono">{{ problem.index }}. {{ problem.name }}</span>
                  </a>
                  <div class="flex space-x-6 font-mono">
                      <span class="font-bold">[{{ problem.solvedCount }}]</span>
                  </div>
                  <!-- <span class="italic font-mono">[{{ problem.points }}]</span> -->
              </div>
          </td>
      </tr>
  </table>
</template>
