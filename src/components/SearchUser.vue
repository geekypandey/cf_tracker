<template>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="username" placeholder="Enter usernames separated by semicolon (;)" size="45" />
    <input type="submit" />
  </form>
  <p v-show="errors.length">
    <ul v-for="error in errors" :key="error">
      <li style="color: red">{{ error }}</li>
    </ul>
  </p>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      ranks: [],
      errors: [],
    };
  },

  emits: {
    updateUsers: null,
    updateRanks: null,
  },

  methods: {
    async submitForm() {
      const isUserVerified = await this.verifyUser();
      if (isUserVerified) {
        var usernames = this.username
          .trim()
          .split(";")
          .map((username) => {
            return username.trim();
          })
          .filter((username) => username.length);
        console.log(this.ranks);
        this.$emit("updateUsers", usernames);
        this.$emit("updateRanks", this.ranks);
      }

      // reseting the username and rank
      this.username = "";
      this.ranks = [];
    },

    async verifyUser() {
      const user_info_url = "https://codeforces.com/api/user.info?handles=";

      var usernames = this.username
        .trim()
        .split(";")
        .map((username) => username.trim())
        .filter((username) => username.length);
      console.log(usernames);
      this.errors = [];
      if (!usernames.length) {
        this.errors.push("Please Enter a Username.");
        return false;
      }

      var verified = true;
      for (let username of usernames) {
        username = username.trim();
        if (!username.length) continue;
        const user_info = await fetch(user_info_url + username).then((resp) =>
          resp.json()
        );
        if (user_info.status.localeCompare("FAILED") == 0) {
          this.errors.push(`User with handle ${username} not found!`);
          verified = false;
        }
        if (user_info.result[0].rank) this.ranks.push(user_info.result[0].rank);
        else this.ranks.push("");
      }

      return verified;
    },
  },
};
</script>