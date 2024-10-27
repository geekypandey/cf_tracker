<script setup>
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '@/stores/filters'
import { useUserStore } from '@/stores/users'
import { useContestStore } from '@/stores/contests'

import ContestsTableRow from '@/components/ContestsTableRow.vue'
import ContestsData from "@/data/contests.json";
import Contest from '@/models/Contest'

const contestStore = useContestStore()
const { contests } = storeToRefs(contestStore)
</script>

<template>
  <div v-if="!contests.length" style="text-align: center">No Results Found</div>

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
