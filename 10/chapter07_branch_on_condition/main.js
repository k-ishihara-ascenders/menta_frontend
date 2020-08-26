'use strict';

$(function() {
	const quizCheck = function() {
		// クイズの答えをセット
		const q1 = $('input[name=q1]:checked').val();
		const q2 = $('input[name=q2]:checked').val();
		const q3 = $('input[name=q3]:checked').val();

		// 正誤判定
		let right = 0;
		if(q1 == 2) right++;
		if(q2 == 3) right++;
		if(q3 == 3) right++;

		// 正答率を表示
		const percent = Math.floor(right / 3 * 100);
		const text = `正答率は${percent}%です`;
		$('#res').empty().text(text);

		// 結果のスタイル調整
		switch(percent) {
			case 0:
				$('#res').css('background', '#666').css('color', '#fff');
				break;
			case 100:
				console.log('aaa');
				$('#res').css('background', '#faa').css('color', '#000');
				break;
			default:
				$('#res').css('background', '#fff').css('color', '#000');
		}
	}

	// 正答率チェックのイベント
	$('#btnCheck').click(quizCheck);
});