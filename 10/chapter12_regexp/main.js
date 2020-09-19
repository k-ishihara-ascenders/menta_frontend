'use strict';

$(function() {
	function exe() {
		const src = $('#source').val();

		const re = /(https?:\/\/[a-zA-Z0-9\-_\.:@!~*'\(¥);\/?&=\+$,%#]+)/g;

		const text = src.replace(re, '<a href="$1">$1</a>');
		$('#resultTxt').val(text);

		$('#resultPreview').html(text);
	};

	$('#btnExec').click(exe);
});

