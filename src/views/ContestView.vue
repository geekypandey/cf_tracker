<script setup>
import { ref } from 'vue'

import UserSearch from "@/components/UserSearch.vue";
import UserInfo from "@/components/UserInfo.vue";
import ContestsTable from "@/components/ContestsTable.vue";
import ContestFilters from '@/components/ContestFilters.vue'

const usernames = ref([])
const ranks = ref([])
</script>

<template>
  <div class="flex items-center justify-center my-8 px-4">
    <div class="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-md">
      <UserSearch @updateUsers="usernames = $event" @updateRanks="ranks = $event" />
      <UserInfo :usernames="usernames" :ranks="ranks" class="mb-1"/>
      <ContestFilters />
    </div>
  </div>
  <div class="mx-4 bg-white dark:bg-gray-800 dark:text-white rounded-md">
    <ContestsTable :usernames="usernames" />
  </div>
</template>
