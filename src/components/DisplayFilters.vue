<template>
  <input type="checkbox" id="div1" value="1" v-model="selected" />
  <label for="div1">Div 1</label>
  <input type="checkbox" id="div2" value="2" v-model="selected" />
  <label for="div2">Div 2</label>
  <input type="checkbox" id="div3" value="3" v-model="selected" />
  <label for="div3">Div 3</label>
  <input type="checkbox" id="educational" value="E" v-model="selected" />
  <label for="educational">Educational Rounds</label>

  <div v-show="usernames.length">
    <input type="radio" name="whichContests" value="all" v-model="picked" />
    <label for="all">All</label>
    <input type="radio" name="whichContests" value="active" v-model="picked" />
    <label for="participated">Contests Participated</label>
    <input type="radio" name="whichContests" value="passive" v-model="picked" />
    <label for="attempted">Attempted Any</label>
    <input
      type="button"
      @click="refresh"
      value="Refresh"
      style="float: right; margin-right: 20px"
    />
  </div>
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
  },
  emits: ["updateSelected", "togglePicked", "refreshSub"],
  data() {
    return {
      selected: [],
      picked: "all",
    };
  },

  methods: {
    refresh() {
      this.$emit("refreshSub");
    },
  },

  watch: {
    selected() {
      this.$emit("updateSelected", this.selected);
    },
    picked() {
      this.$emit("togglePicked", this.picked);
    },
  },
};
</script>