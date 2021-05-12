<template>
  <p v-if="username.length">
    Username :
    <span :style="{ color: color }"
      >{{ username }} <span v-show="rank">[{{ rank }}]</span></span
    >
  </p>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
      default: "",
    },
    rank: {
      type: String,
      required: true,
      default: "",
    },
  },

  data() {
    return {
      color: "",
    };
  },

  watch: {
    rank() {
      const colorMap = new Map([
        ["newbie", "gray"],
        ["pupil", "rgb(136, 204, 34)"],
        ["apprentice", "green"],
        ["specialist", "rgb(3, 168, 158)"],
        ["expert", "blue"],
        ["canditate_master", "rgb(170, 0, 170)"],
        ["master", "rgb(255, 140, 0)"],
      ]);
      if (colorMap.has(this.rank)) {
        this.color = colorMap.get(this.rank);
      } else if (this.rank) {
        this.color = "red";
      } else {
        this.color = "";
      }
    },
  },
};
</script>