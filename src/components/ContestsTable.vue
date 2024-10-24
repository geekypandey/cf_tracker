<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filters'
import { useUserStore } from '@/stores/users'

import ContestsData from "@/data/contests.json";
import Contest from '@/models/Contest'

const filterStore = useFilterStore()
const { selectedDivisions } = storeToRefs(filterStore)

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
console.log(users)

const contestData = ContestsData.contests.filter(c => c.phase === 'FINISHED')
                        .filter(c => c.problems != undefined)
                        .map(c => new Contest(c));


const contests = computed(() => {
    let filteredContests = contestData;
    if (selectedDivisions.value.length != 0) {
        filteredContests = filteredContests.filter(c => selectedDivisions.value.includes(c.division));
    }
    if (users.value.length != 0) {
        filteredContests.forEach(contest => contest.solvedBy.push(users.value))
        // TODO: get user submissions here and update the problems solvedBy component
    }
    return filteredContests;
})
</script>

<template>
  <div v-if="!contests.length" style="text-align: center">Loading.....</div>

  <DynamicScroller
    class="h-full"
    :items="contests"
    :minItemSize="72"
    key-field="id"
  >
   <template v-slot="{ item, index }">
      <DynamicScrollerItem
        :item="item"
        :data-index="index"
      >
          <div class="flex space-x-2 w-full p-2 items-center pl-4">
              <div>{{ index + 1 }} </div>
              <div class="py-2 text-center hover:underline hover:cursor-pointer w-96">
                  <a :href="item.link" target="_blank" class="font-mono">{{ item.name }}</a>
              </div>
              <div class="flex space-x-4 p-0">
                  <div class="flex flex-col items-center text-center" v-for="problem in item.problems">
                      <span class="w-12 hover:underline hover:cursor-pointer">
                          <a :href="problem.link" target="_blank" class="font-mono">{{ problem.index }}</a>
                      </span>
                      <span class="text-sm text-gray-500 font-mono"> {{ problem.solvedCount }} </span>
                  </div>
              </div>
          </div>
          <hr class="w-full">
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
