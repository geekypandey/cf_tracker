export default class Problem {
  constructor(contest_id, index, solvedCount, name) {
    this.index = index;
    this.link =
      "https://codeforces.com/contest/" + contest_id + "/problem/" + index;
    this.solved = 0; // poor naming
    this.solvedCount = solvedCount;
    this.name = name;
  }

  solved(value) {
    if (this.solved !== 1) this.solved = value;
  }
}
