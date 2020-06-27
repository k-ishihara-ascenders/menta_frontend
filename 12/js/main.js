'use strict';

new Vue({
	el: '#app',
	data: {
		message: 'Hello World!'
	},
	methods: {
		reverseMessage: function() {
			this.message = this.message.split('').reverse().join('')
		},
		sayHi: function() {
			this.message = 'Hello! VueJS';
			return 'hi';
		}
	}
})
