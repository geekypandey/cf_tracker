<template>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="userInput" placeholder="Enter usernames separated by semicolon (;)" size="45" />
    <input type="submit" />
    <input type="checkbox" id="remember_me" value="true" v-model="rememberMe" />
    <label for="div1">Remember Me?</label>
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
      userInput: "",
      ranks: [],
      errors: [],
      rememberMe: true,
    };
  },

  emits: {
    updateUsers: null,
    updateRanks: null,
  },

  methods: {
    async submitForm() {
      var usernames = this.userInput
        .trim()
        .split(";")
        .map((username) => username.trim())
        .filter((username) => username.length);

      const isUserVerified = await this.verifyUsers(usernames);

      if (isUserVerified) {
        this.$emit("updateUsers", usernames);
        this.$emit("updateRanks", this.ranks);

        if (this.rememberMe) {
          localStorage.setItem("cf-users", this.userInput);
        } else {
          localStorage.removeItem("cf-users");
        }
      }

      // reseting the username and rank
      this.userInput = "";
      this.ranks = [];
    },

    // having side-effects and not clear based on the function name [experimental]
    async verifyUsers(usernames) {
      const user_info_url = "https://codeforces.com/api/user.info?handles=";

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

  async created() {
    if (localStorage.getItem("cf-users")) {
      var usernames = localStorage
        .getItem("cf-users")
        .trim()
        .split(";")
        .map((username) => username.trim())
        .filter((username) => username.length);

      const isUserVerified = await this.verifyUsers(usernames);

      if (isUserVerified) {
        this.$emit("updateUsers", usernames);
        this.$emit("updateRanks", this.ranks);
      }
      this.ranks = [];
    }
  },
};
</script>

<style scoped>
input {
  margin-left: 5px;
}
</style>