<template>
  <tr>
    <td>
      <a :href="contest.link" target="_blank"> {{ contest.name }}</a>
    </td>
    <td
      v-for="problem in contest.problems"
      :key="problem.index"
      :class="{ AC: problem.solved > 0, WA: problem.solved < 0 }"
    >
      <a :href="problem.link" target="_blank"> {{ problem.index }}</a>
      <span v-show="singleUser">
        <span v-show="problem.solved == 2">&#10004;</span>
        <span v-show="problem.solved == -2">&#10008;</span>
      </span>
      <br />
      <span style="color: brown">[{{ problem.solvedCount }}]</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    contest: {
      type: Object,
      required: true,
    },
    singleUser: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style scoped>
.AC {
  background: #7cf07c;
}
.WA {
  background: #f02a00;
}

td {
  border: 1px solid black;
  padding: 5px 20px;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: blue;
}
</style>