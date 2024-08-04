<script setup>
import { ref } from 'vue'

import SearchUser from "@/components/SearchUser.vue";
import DisplayUserInfo from "@/components/DisplayUserInfo.vue";
import DisplayContests from "@/components/DisplayContests.vue";

const usernames = ref([])
const ranks = ref([])
</script>

<template>
  <div class="px-64 py-8">
    <SearchUser @updateUsers="usernames = $event" @updateRanks="ranks = $event" />
    <display-user-info :usernames="usernames" :ranks="ranks"></display-user-info>
  </div>
  <div>
    <display-contests :usernames="usernames"></display-contests>
  </div>
</template>
