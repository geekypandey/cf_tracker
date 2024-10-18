<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filters'

import ContestsData from "@/data/contests.json";
import Contest from '@/models/Contest'

const filterStore = useFilterStore()
const { selectedDivisions } = storeToRefs(filterStore)

const contests = computed(() => {
    return ContestsData.contests.map((c) => {
        const contest = new Contest(c);
        contest.display = true;
        if (selectedDivisions.value.length != 0) {
            contest.display = selectedDivisions.value.includes(contest.division);
        }
        return contest;
    });
})
</script>

<template>
  <div v-if="!contests.length" style="text-align: center">Loading.....</div>
  <table class="w-full">
      <tr v-for="(contest, idx) in contests" class="border border-black h-12" v-show="contest.display">
          <td class="border border-black py-2 text-center font-mono w-2">{{ idx + 1 }}</td>
          <td class="border border-black py-2 pl-2 text-center">
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
