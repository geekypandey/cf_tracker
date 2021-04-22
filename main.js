let user_status_url = 'https://codeforces.com/api/user.status?handle='
let problemset_problem_url = 'https://codeforces.com/api/problemset.problems'
let contest_list_url = 'https://codeforces.com/api/contest.list'

var app = new Vue({
	el: '#app',
	data: {
		input_name: '',
		username: '',
		user_status: [],
		errors: [],
		contests: []
	},
	methods: {
		submitForm: function() {
			fetch(user_status_url + this.input_name)
				.then(response => {
					if(response.ok) {
						return response.json();
					} else {
						throw new Error("Username not found!");
					}
				})
				.then(data => {
					this.user_status = data['result'];
					this.username = this.input_name;
					this.input_name = '';
					this.errors = [];
				})
				.catch(error => {
					this.user_status = [];
					this.username = '';
					this.input_name = '';
					this.errors.push(error);
				});
		}
	},
	created: async function() {
		const contestSize = await fetch(problemset_problem_url)
			.then(response => {
				if(response.ok) {
					return response.json();
				} else {
					throw new Error("Some issue with fetching the problems!");
				}
			})
			.then(data => {
				let problems = data.result.problems;
				let contests = new Map();
				for(problem of problems) {
					const id = problem.contestId;
					if(contests.has(id)) {
						contests.set(id, contests.get(id)+1);
					} else {
						contests.set(id, 1);
					}
				}
				return contests;
			})
			.catch(error => {
				console.error(error);
				return null;
			});

		const contest_list = await fetch(contest_list_url)
			.then(response => {
				if(response.ok) {
					return response.json();
				} else {
					throw new Error('Some error!');
				}
			})
			.then(data => {
				let contests = data.result;
				contests.sort((a, b) => b.startTimeSeconds - a.startTimeSeconds);
				let response = [];
				let start = 'A'.charCodeAt(0);
				for(contest of contests) {
					if(!contestSize.has(contest.id)) continue;
					var len = contestSize.get(contest.id);
					var res = [['https://codeforces.com/contest/' + contest.id, contest.name]];
					var p_index = [];
					for(var i = start; i < start+len; i++) {
						var index = String.fromCharCode(i);
						p_index.push(['https://codeforces.com/contest/'+ contest.id + '/problem/' + index, index]);
					}
					res.push(p_index);
					response.push(res);
				}
				return response;
			})
			.catch(error => {
				console.error(error);
				return null;
			});
		this.contests = contest_list;
	}
})

