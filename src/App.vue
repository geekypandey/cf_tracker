<template>
  <form @submit.prevent="submitForm">
      <input type="text" v-model="input_name">
      <input type="submit">
    </form>
    <br v-show="!username.length">
    <p v-show="username.length">Username: <span style="color:blue;">{{ username }}</span></p>

    <input type="checkbox" id="div1" value="div1" v-model="selected">
    <label for="div1">Div 1</label>
    <input type="checkbox" id="div2" value="div2" v-model="selected">
    <label for="div2">Div 2</label>
    <input type="checkbox" id="div3" value="div3" v-model="selected">
    <label for="div3">Div 3</label>
    <input type="checkbox" id="educational" value="educational" v-model="selected">
    <label for="educational">Educational Rounds</label>

    <br>
    <br>
    <div v-show="username.length">
      <input type="radio" id="all" name="whichContests" value="all" v-model="picked">
      <label for="all">All</label>
      <input type="radio" id="participated" name="whichContests" value="participated" v-model="picked">
      <label for="participated">Participated</label>
    </div>
    <br>

    <p v-show="errors.length">
    <ul v-for="error in errors" :key="error">
      <li style="color: red">{{ error }}</li>
    </ul>
    </p>

    <p v-if="!contests.length" style="text-align:center;"> Loading.....</p>
    <table v-else>
      <tr v-for="contest in contests"
        v-show="(!selected.length || selected.includes(contest.type)) && (picked.localeCompare('all') == 0? true: contest.participated)"
        :key="contest.name">
        <td><a :href="contest.contest_link" target="_blank">{{ contest.name }}</a></td>
        <td v-for="problem in contest.problems"
          v-bind:bgcolor="problem.solved == 1 ? '#7cf07c': problem.solved == -1 ? '#F02A00' : ''"
          style="text-align:center;" :key="problem.link">
          <a :href="problem.problem_link" target="_blank">
            {{ problem.index }}
            <span v-show="problem.result.localeCompare('SC') == 0">&#10004;</span>
            <span v-show="problem.result.localeCompare('WC') == 0">&#10008;</span>
          </a>
        </td>
      </tr>
    </table>
</template>


<script>
let user_status_url = "https://codeforces.com/api/user.status?handle=";
let problemset_problem_url = "https://codeforces.com/api/problemset.problems";
let contest_list_url = "https://codeforces.com/api/contest.list";

class Problem {
  constructor(id, index) {
    this.index = index;
    this.problem_link =
      "https://codeforces.com/contest/" + id + "/problem/" + index;
    this.result = "";
    this.solved = 0;
  }

  setResult(result) {
    this.result = result;
  }
}

class Contest {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.contest_link = "https://codeforces.com/contest/" + this.id;
    this.problems = [];
    this.type = "";
    this.participated = false;
    if (this.name.includes("Educational")) {
      this.type = "educational";
    } else if (this.name.includes("Div. 1")) {
      this.type = "div1";
    } else if (this.name.includes("Div. 2")) {
      this.type = "div2";
    } else if (this.name.includes("Div. 3")) {
      this.type = "div3";
    }
  }

  addProblem(index) {
    this.problems.push(new Problem(this.id, index));
  }

  setParticipated() {
    this.participated = true;
  }
}

export default {
  name: "App",
  data() {
    return {
      input_name: "",
      username: "",
      user_status: [],
      errors: [],
      contests: [],
      selected: [],
      picked: "all",
    };
  },
  methods: {
    submitForm: async function () {
      const submissions = await fetch(user_status_url + this.input_name)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Username not found!");
          }
        })
        .then((data) => {
          this.username = this.input_name;
          sessionStorage.setItem("username", this.username);
          this.input_name = "";
          this.errors = [];
          return data["result"];
        })
        .catch((error) => {
          this.username = "";
          this.input_name = "";
          if (sessionStorage && sessionStorage.getItem("username"))
            sessionStorage.removeItem("username");
          if (!this.errors.length) this.errors.push(error);
          return [];
        });
      var map = new Map();
      for (let sub of submissions) {
        var key = sub.problem.contestId + sub.problem.index;
        var passed = sub.verdict.localeCompare("OK") == 0;
        var participated =
          sub.author.participantType.localeCompare("CONTESTANT") == 0;
        if (map.has(key)) {
          if (passed) {
            if (map.get(key).localeCompare("SC") == 0) continue;
            if (participated) map.set(key, "SC");
            else map.set(key, "SP");
          } else {
            if (map.get(key).localeCompare("SC") == 0) continue;
            if (map.get(key).localeCompare("SP") == 0) continue;
            if (map.get(key).localeCompare("WC") == 0) continue;
            if (participated) map.set(key, "SC");
            else map.set(key, "WP");
          }
        } else {
          if (passed && participated) map.set(key, "SC");
          if (passed && !participated) map.set(key, "SP");
          if (!passed && participated) map.set(key, "WC");
          if (!passed && !participated) map.set(key, "WP");
        }
      }
      for (let contest of this.contests) {
        for (let problem of contest.problems) {
          let key = contest.id + problem.index;
          if (map.has(key)) {
            var result = map.get(key);
            if (
              result.localeCompare("SC") == 0 ||
              result.localeCompare("WC") == 0
            )
              contest.setParticipated();
            problem.setResult(result);
            if (
              result.localeCompare("WC") == 0 ||
              result.localeCompare("WP") == 0
            )
              problem.solved = -1;
            else problem.solved = 1;
          } else {
            problem.setResult("");
            problem.solved = 0;
          }
        }
      }
    },
  },
  created: async function () {
    if (sessionStorage && sessionStorage.getItem("username")) {
      this.username = sessionStorage.getItem("username");
    }
    const contestSize = await fetch(problemset_problem_url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Some issue with fetching the problems!");
        }
      })
      .then((data) => {
        let problems = data.result.problems;
        let contests = new Map();
        for (let problem of problems) {
          const id = problem.contestId;
          if (contests.has(id)) {
            contests.set(id, contests.get(id) + 1);
          } else {
            contests.set(id, 1);
          }
        }
        return contests;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });

    const contest_list = await fetch(contest_list_url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Some error!");
        }
      })
      .then((data) => {
        let contests = data.result;
        contests.sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);
        let response = [];
        let start = "A".charCodeAt(0);
        for (let contest of contests) {
          if (!contestSize.has(contest.id)) continue;
          var len = contestSize.get(contest.id);
          var c = new Contest(contest.id, contest.name);
          for (var i = start; i < start + len; i++) {
            var index = String.fromCharCode(i);
            c.addProblem(index);
          }
          response.push(c);
        }
        return response;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
    this.contests = contest_list;
  },
};
</script>

<style scoped>
th,
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
