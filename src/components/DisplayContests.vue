<template>
  <display-filters
    :usernames="usernames"
    @updateSelected="selected = $event"
    @togglePicked="picked = $event"
    @refreshSub="refresh"
  ></display-filters>
  <hr />
  <div v-if="!contests.length" style="text-align: center">Loading.....</div>
  <table v-else>
    <table-row
      v-for="contest in filteredContests"
      :contest="contest"
      :singleUser="usernames.length === 1"
      :key="contest.id"
    ></table-row>
  </table>
</template>

<script>
import DisplayFilters from "./DisplayFilters.vue";
import TableRow from "./TableRow.vue";
import ContestsData from "../data/contests.json";

// Need to move this out to separate file [Problem and Contest]
class Problem {
  constructor(contest_id, index, solvedCount) {
    this.index = index;
    this.link =
      "https://codeforces.com/contest/" + contest_id + "/problem/" + index;
    this.solved = 0; // poor naming
    this.solvedCount = solvedCount;
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

  addProblem(index, solvedCount) {
    this.problems.push(new Problem(this.id, index, solvedCount));
  }

  participated() {
    this.participated = true;
  }
}

export default {
  components: {
    DisplayFilters,
    TableRow,
  },

  props: {
    usernames: {
      type: Array,
      required: true,
      default: function () {
        return [];
      },
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
      this.contests.forEach(function (contest) {
        contest.active = false;
        contest.passive = false;
        contest.problems.forEach((problem) => (problem.solved = 0));
      });
    },

    populateSub(submissions) {
      // create a dictionary for submissions
      let map = new Map();
      for (let sub of submissions) {
        let c = 0;
        let key = sub.problem.contestId + sub.problem.index;
        // clever but not understandable
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

    async refresh() {
      for (let username of this.usernames) {
        let submissions = await this.getUserSubmissions(username);
        this.populateSub(submissions);
      }
    },

    async getUserSubmissions(username) {
      const user_status_url = "https://codeforces.com/api/user.status?handle=";
      username = username.trim();
      const submissions = await fetch(user_status_url + username)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error(`Username  ${username} not found!`);
          }
        })
        .then((data) => {
          return data["result"];
        })
        .catch((error) => {
          console.log(error);
        });
      return submissions;
    },
  },

  computed: {
    filteredContests() {
      return this.contests.filter((contest) => this.display(contest));
    },
  },

  watch: {
    async usernames() {
      this.resetContests();
      for (let username of this.usernames) {
        let submissions = await this.getUserSubmissions(username);
        this.populateSub(submissions);
      }
    },
  },

  created() {
    // load the data at time of creation
    let data = ContestsData.contests;
    data.sort((a, b) => b.startTimeSeconds - a.startTimeSeconds); // change this sort function
    let contests = [];
    for (let d of data) {
      var c = new Contest(d.contestId, d.name, d.div);
      for (let problem of d.problems) {
        c.addProblem(problem.index, problem.solvedCount);
      }
      contests.push(c);
    }
    this.contests = contests;
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
</style>

