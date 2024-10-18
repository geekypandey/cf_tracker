import Problem from '@/models/Problem'

export default class Contest {
  constructor(contest) {
    this.id = contest.id;
    this.name = contest.name;
    this.link = `https://codeforces.com/contest/${contest.id}`;
    this.division = contest.div;
    this.durationSeconds = contest.durationSeconds;
    this.startDate = new Date(contest.startTimeSeconds * 1000);
    this.active = false;
    this.passive = false;

    this.display = true;
    this.isSolved = false;
    this.problems = [];
    this._addProblems(contest.problems);
  }

  _addProblems(problems) {
      if (problems == undefined) return;
      // TODO: sort problem based on their indexes
      problems.forEach(problem => this.addProblem(problem))
  }

  addProblem(problem) {
    this.problems.push(new Problem(problem));
  }
}
