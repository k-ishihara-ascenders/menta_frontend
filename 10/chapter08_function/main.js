'use strict';

$(function() {
	let target = $('.col-xs-3');

	$(window).resize(resize);
	resize();

	$('.col-xs-3').hover(hoverEv, hoverRe);

	function resize() {
		target = $('.col-xs-3');
		const w = target.width();

		target
		.height(w)
		.css('font-size', Math.floor(0.66*w) + 'px')
		.css('line-height', w + 'px');
	}

	function hoverEv() {
		$(this)
		.css('background', '#ffc')
		.css('cursor', 'pointer');

		const text  = $(this).find('span').text();
		$('#expArea').val(text);
	}

	function hoverRe() {
		$(this)
		.css('background', '#fff');

		$('#expArea').val("");
	}
});

