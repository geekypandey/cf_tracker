<template>
  <search-user
    @updateUsers="usernames = $event"
    @updateRanks="ranks = $event"
  ></search-user>
  <display-user-info :usernames="usernames" :ranks="ranks"></display-user-info>
  <display-contests :usernames="usernames"></display-contests>
</template>


<script>
import SearchUser from "./components/SearchUser.vue";
import DisplayUserInfo from "./components/DisplayUserInfo.vue";
import DisplayContests from "./components/DisplayContests.vue";

export default {
  name: "App",
  components: {
    SearchUser,
    DisplayUserInfo,
    DisplayContests,
  },
  data() {
    return {
      usernames: [],
      ranks: [],
    };
  },
};
</script>
