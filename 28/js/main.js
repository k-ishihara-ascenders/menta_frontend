'use strict';

const app = new Vue({
	el: '#app',
	data: {
		message: "Hello World",
		url: 'https://jp.vuejs.org/index.html',
		toggle: true,
		languages: ['JavaScript', 'Ruby', 'Python']
	},
	methods: {
		onclick: function() {
			this.message = 'Clicked!';
		}
	}
})