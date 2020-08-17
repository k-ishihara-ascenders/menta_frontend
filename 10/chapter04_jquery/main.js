'use strict';

$(function() {
	const taxBtn = $('#tax-btn');
	const taxAmountText = $('#tax-amount');
	const taxIncludedText = $('#tax-included');

	const calcTax = function() {
		const price = $('#price').val() * 1;
		const taxRate = $('#tax-rate').val() * 1;
		const taxAmount = Math.floor(price * taxRate / 100);
		const taxIncluded = price + taxAmount;
		taxAmountText.text(taxAmount.toString(10));

		console.log(taxAmountText);

		taxIncludedText.text(taxIncluded.toString(10));
	}

	$(taxBtn).click(calcTax);
});