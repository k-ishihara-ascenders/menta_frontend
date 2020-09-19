'use strict';

$(function() {
	// ## 変数の初期化 ##
	// videoタグの取得
	const video = $('#video').get(0);

	// 再生の関数
	const play = () => {
		video.play();
	}
	// 一時停止の関数
	const pause = () => {
		video.pause();
	}
	// 停止の関数
	const stop = () => {
		video.pause();
		video.currentTime = 0;
	}

	// ボタンのイベントを登録
	$('#btnPlay').click(play);
	$('#btnPause').click(pause);
	$('#btnStop').click(stop);
});

