<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filters'
import { useUserStore } from '@/stores/users'

import ContestsTableRow from '@/components/ContestsTableRow.vue'
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
    :min-item-size="72"
    key-field="id"
  >
   <template v-slot="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :data-index="index"
        :active="active"
        :size-dependencies="[item.name]"
      >
        <ContestsTableRow :index="index + 1" :contest="item" />
        <hr class="w-full">
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
