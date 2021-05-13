<template>
  <p v-if="usernames.length">
    Usernames :
    <span
      v-for="(username, index) in usernames"
      :style="{ color: colors[index] }"
      :key="username"
    >
      {{ username }}
      <span v-show="ranks[index]">[{{ ranks[index] }}]</span>
      <span v-show="index != usernames.length - 1" style="color: black">
        ||
      </span>
    </span>
  </p>
</template>

<script>
export default {
  props: {
    usernames: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
    ranks: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
    },
  },

  data() {
    return {
      colors: [],
    };
  },

  watch: {
    ranks() {
      this.colors = [];
      const colorMap = new Map([
        ["newbie", "gray"],
        ["pupil", "rgb(136, 204, 34)"],
        ["apprentice", "green"],
        ["specialist", "rgb(3, 168, 158)"],
        ["expert", "blue"],
        ["canditate_master", "rgb(170, 0, 170)"],
        ["master", "rgb(255, 140, 0)"],
      ]);
      for (let rank of this.ranks) {
        if (colorMap.has(rank)) {
          this.colors.push(colorMap.get(rank));
        } else if (rank) {
          this.colors.push("red");
        } else {
          this.colors.push("");
        }
      }
    },
  },
};
</script>