<script setup>
import { ref } from 'vue'

import SearchUser from "@/components/SearchUser.vue";
import DisplayUserInfo from "@/components/DisplayUserInfo.vue";
import DisplayContests from "@/components/DisplayContests.vue";
import DisplayFilters from '@/components/DisplayFilters.vue'

const usernames = ref([])
const ranks = ref([])
</script>

<template>
  <div>
    <div class="mx-64 my-8 bg-white p-4 rounded-md">
      <SearchUser @updateUsers="usernames = $event" @updateRanks="ranks = $event" />
      <DisplayUserInfo :usernames="usernames" :ranks="ranks" />
      <DisplayFilters />
    </div>
  </div>
  <div class="mx-4 bg-white rounded-md">
    <DisplayContests :usernames="usernames" />
  </div>
</template>
