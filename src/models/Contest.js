import Problem from '@/models/Problem'

export default class Contest {
  #EMPTY_LINK = '';

  constructor(contest) {
    this.id = contest.id;
    this.name = contest.name;
    this.division = contest.div;
    this.durationSeconds = contest.durationSeconds;
    this.startDate = new Date(contest.startTimeSeconds * 1000);
    this.active = false;
    this.passive = false;
    this.phase = contest.phase;

    this.contestants = new Set();
    this.participants = new Set();
    this.problems = [];
    this._addProblems(contest.problems);
  }

  #weeksBeforeStart() {
    const today = new Date();
    return Math.ceil((this.startDate - today) / (7 * 24 * 60 * 60 * 1000));
  }

  get link() {
    if (this.phase === 'BEFORE' && this.#weeksBeforeStart() <= 2) {
      return `https://codeforces.com/contestRegistration/${this.id}`;
    } else if (this.phase !== 'BEFORE') {
      return `https://codeforces.com/contest/${this.id}`;
    } else {
      return this.#EMPTY_LINK;
    }
  }

  _addProblems(problems) {
      if (problems == undefined) return;
      problems.forEach(problem => this.addProblem(problem))
  }

  addProblem(problem) {
    this.problems.push(new Problem(problem));
  }

  get isContestant() {
      return this.contestants.size > 0;
  }

  get isParticipant() {
      return this.participants.size > 0;
  }
}
