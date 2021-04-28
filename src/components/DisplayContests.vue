<template>
  <filter-contests
    :username="username"
    @updateSelected="selected = $event"
    @togglePicked="picked = $event"
  ></filter-contests>
  <br />
  <div v-if="!contests.length" style="text-align: center">Loading.....</div>
  <table v-else>
    <table-row
      v-for="contest in filteredContests"
      :contest="contest"
      :key="contest.id"
    ></table-row>
  </table>
</template>

<script>
import FilterContests from "./FilterContests.vue";
import TableRow from "./TableRow.vue";
import ContestsData from "../data/contests.json";

class Problem {
  constructor(id, index) {
    this.index = index;
    this.link = "https://codeforces.com/contest/" + id + "/problem/" + index;
    this.solved = 0;
  }

  solved(value) {
    if (this.solved !== 1) this.solved = value;
  }
}

class Contest {
  constructor(id, name, div) {
    this.id = id;
    this.name = name;
    this.link = "https://codeforces.com/contest/" + this.id;
    this.problems = [];
    this.div = div;
    this.active = false;
    this.passive = false;
  }

  addProblem(index) {
    this.problems.push(new Problem(this.id, index));
  }

  participated() {
    this.participated = true;
  }
}

export default {
  components: {
    FilterContests,
    TableRow,
  },
  props: {
    username: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      contests: [],
      selected: [],
      picked: "all",
    };
  },
  methods: {
    display(contest) {
      return (
        (!this.selected.length || this.selected.includes(contest.div)) &&
        (this.picked == "all"
          ? true
          : this.picked == "active"
          ? contest.active
          : contest.passive)
      );
    },
    resetContests() {
      for (let contest of this.contests) {
        contest.active = false;
        contest.passive = false;
        for (let problem of contest.problems) {
          problem.solved = 0;
        }
      }
    },
    populateSub(submissions) {
      // create a dictionary for submissions
      this.resetContests();
      let map = new Map();
      for (let sub of submissions) {
        let c = 0;
        let key = sub.problem.contestId + sub.problem.index;
        if (sub.verdict == "OK") {
          c++;
        } else {
          c--;
        }

        if (sub.author.participantType == "CONTESTANT") {
          if (sub.verdict == "OK") c++;
          else c--;
        }
        if (map.has(key)) {
          map.set(key, Math.max(map.get(key), c));
        } else {
          map.set(key, c);
        }
      }

      for (let contest of this.contests) {
        for (let problem of contest.problems) {
          let key = contest.id + problem.index;
          if (!map.has(key)) continue;
          let val = map.get(key);
          problem.solved = val;
          if (val > 0) contest.passive = true;
          if (val == -2 || val == 2) contest.active = true;
        }
      }
    },
  },
  computed: {
    filteredContests() {
      return this.contests.filter((contest) => this.display(contest));
    },
  },
  watch: {
    async username() {
      const user_status_url = "https://codeforces.com/api/user.status?handle=";
      const submissions = await fetch(user_status_url + this.username)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Username not found!");
          }
        })
        .then((data) => {
          return data["result"];
        })
        .catch((error) => {
          console.log(error);
        });
      this.populateSub(submissions);
    },
  },
  created() {
    let data = ContestsData.contests;
    data.sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);
    let contests = [];
    for (let d of data) {
      var c = new Contest(d.contestId, d.name, d.div);
      for (let idx of d.index) {
        c.addProblem(idx);
      }
      contests.push(c);
    }
    this.contests = contests;
  },
};
</script>

