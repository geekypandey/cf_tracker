<template>
  <search-user
    @updateUser="username = $event"
    @updateRank="rank = $event"
  ></search-user>
  <display-user-info :username="username" :rank="rank"></display-user-info>
  <display-contests :username="username"></display-contests>
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
      username: "",
      rank: "",
    };
  },
};
</script>
