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

  get isSolved() {
      for (const [user, status] of this.status.entries()) {
          if (status.isSolved) return true;
      }
      return false;
  }

  get isSolvedInContest() {
      for (const [user, status] of this.status.entries()) {
          if (status.isSolved && status.inContest) return true;
      }
      return false;
  }

  get isAttempted() {
      return this.status.size > 0;
  }

  get isContestant() {
      for (const [_, status] of this.status.entries()) {
          if (status.inContest) return true;
      }
      return false;
  }
}
