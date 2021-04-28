<template>
  <search-user
    @updateUser="username = $event"
    @updateRank="rank = $event"
  ></search-user>
  <user-info :username="username" :rank="rank"></user-info>
  <display-contests :username="username"></display-contests>
</template>


<script>
import SearchUser from "./components/SearchUser.vue";
import UserInfo from "./components/UserInfo.vue";
import DisplayContests from "./components/DisplayContests.vue";

export default {
  name: "App",
  components: {
    SearchUser,
    UserInfo,
    DisplayContests,
  },
  data() {
    return {
      username: "",
      rank: "",
    };
  },
};
</script>
