'use strict';

$(function() {
	const tmplt = $('#template').html();

	// 追加
	$('#btnAppend').click(function() {
		const text = $('#line').val();
		const html = tmplt.replace('%s', text);
		const $target = $('input[name=sel]:checked').parents('li').eq(0);
		$target.after(html);
		$target.next().find('input').prop('checked', true);
	});

	// 入れ子
	$('#btnNest').click(function() {
		const text = $('#line').val();
		const html = '<ul>' + tmplt.replace('%s', text) + '</ul>';
		const $target = $('input[name=sel]:checked').parents('li').eq(0);
		$target.append(html);
		$target.children().find('input').prop('checked', true);
	});
});