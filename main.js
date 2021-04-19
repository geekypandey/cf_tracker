var app = new Vue({
	el: '#app',
	data: {
		input_name: '',
		username: ''
	},
	methods: {
		submitForm: function() {
			console.log("Username is " + this.input_name);
			this.username = this.input_name;
			this.input_name = '';
		}
	}
})

