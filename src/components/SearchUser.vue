<template>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="username" />
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
      rank: "",
      errors: [],
    };
  },

  emits: {
    updateUser: null,
    updateRank: null,
  },

  methods: {
    async submitForm() {
      const isUserVerified = await this.verifyUser();
      if (isUserVerified) {
        this.$emit("updateUser", this.username);
        this.$emit("updateRank", this.rank);
      }
      // console.log(this.rank);

      // reseting the username and rank
      this.username = "";
      this.rank = "";
    },

    async verifyUser() {
      const user_info_url = "https://codeforces.com/api/user.info?handles=";

      this.errors = [];
      this.username = this.username.trim();
      if (!this.username.length) {
        this.errors.push("Please Enter a Username.");
        return false;
      }

      const user_info = await fetch(
        user_info_url + this.username
      ).then((resp) => resp.json());

      if (user_info.status.localeCompare("FAILED") == 0) {
        this.errors.push(`User with handle ${this.username} not found!`);
        return false;
      }
      if (user_info.result[0].rank) this.rank = user_info.result[0].rank;
      return true;
    },
  },
};
</script>