<script setup>
import { ref } from 'vue'

import SearchUser from "@/components/SearchUser.vue";
import DisplayUserInfo from "@/components/DisplayUserInfo.vue";
import DisplayContests from "@/components/DisplayContests.vue";

const usernames = ref([])
const ranks = ref([])
</script>

<template>
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
</template>
