'use strict';

const app = new Vue({
	el: '#app',
	data: {
		basePrice: 100,
		basePrice2: 100
	},
	computed: {
		taxIncludedPrice: {
			get: function() {
				return this.basePrice * 1.08;
			},
			set: function(taxIncludedPrice) {
				this.basePrice = taxIncludedPrice / 1.08;
			}
		}
	}
})