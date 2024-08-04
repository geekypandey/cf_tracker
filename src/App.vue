<script setup>
import { ref } from 'vue'

import SearchUser from "@/components/SearchUser.vue";
import DisplayUserInfo from "@/components/DisplayUserInfo.vue";
import DisplayContests from "@/components/DisplayContests.vue";

const usernames = ref([])
const ranks = ref([])
const showNewFeatures = ref(false)
</script>

<template>
  <header class="flex bg-slate-300 py-2">
    <span class="ml-96 text-3xl font-medium">CF-TRACKER</span>
    <div class="ml-96 flex space-x-12" v-if="showNewFeatures">
      <span class="text-xl py-1">Upcoming contests</span>
      <span class="text-xl py-1">Playground</span>
    </div>
  </header>
  <main class="my-1 ml-32">
    <div class="ml-20 mb-2">
      <search-user
        @updateUsers="usernames = $event"
        @updateRanks="ranks = $event"
        ></search-user>
      <display-user-info :usernames="usernames" :ranks="ranks"></display-user-info>
    </div>
    <div>
      <display-contests :usernames="usernames"></display-contests>
    </div>
  </main>
</template>
