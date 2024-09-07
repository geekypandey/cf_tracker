import Problem from '@/models/Problem'

export default class Contest {
  constructor(id, name, div) {
    this.id = id;
    this.name = name;
    this.link = "https://codeforces.com/contest/" + this.id;
    this.problems = [];
    this.div = div;
    this.active = false;
    this.passive = false;
  }

  addProblem(index, solvedCount, name) {
    this.problems.push(new Problem(this.id, index, solvedCount, name));
  }

  participated() {
    this.participated = true;
  }
}
