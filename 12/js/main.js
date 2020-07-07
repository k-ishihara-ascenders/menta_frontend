'use strict';

new Vue({
	el: '#app',
	data: {
		contact: 'Hello World!',
		message: 'Hello World!',
		message2: 'こんにちは',
		url: 'https://google.com',
		attribute: 'href',
		twitterObject: {
			href: 'https://twitter.com',
			id: 3
		},
		number: 0,
		x: 0,
		y: 0,
		event: 'click',
		counter: 0,
		isActive: true,
		color: 'red',
		bg: 'bg-blue',
		textColor: 'red',
		bgColor: 'blue',
		styleObject: {
			color: 'red',
			'background-color': 'blue'
		}
	},
	computed: {
		lessThanThree: function() {
			return this.counter > 3 ? '3より上' : '3以下';
		},
		classObject: function() {
			return {
				red: this.isActive,
				'bg-blue': !this.isActive
			}
		},
	},
	watch: {
		// counterが変わった時
		counter: function() {
			var vm = this;
			setTimeout(function() {
				vm.counter = 0;
			}, 3000);
		}
	},
	methods: {
		reverseContact: function() {
			this.contact = this.contact.split('').reverse().join('');
		},
		sayHi: function() {
			this.message = 'Hello World!';
			return 'hi';
		},
		countUp: function(times) {
			this.number += 1 * times;
		},
		changeMousePosition: function(divideNumber, event) {
			this.x = event.clientX / divideNumber;
			this.y = event.clientY / divideNumber;
		},
		noEvent: function(event) {
			event.stopPropagation();
		},
		noEventSecond: function(event) {
			event.preventDefault();
		},
		myAlert: function() {
			alert('アラート');
		}
	}
})
