export default class Problem {
  constructor(problem) {
    this.index = problem.index;
    this.name = problem.name;
    this.link = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`;
    this.solvedCount = problem.solvedCount;
    this.points = problem.points;
    this.rating = problem.rating;
    this.tags = problem.tags ? problem.tags : [];
    this.type = problem.type;
    this.status = new Map();
  }
}
