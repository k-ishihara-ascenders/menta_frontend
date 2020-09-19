'use strict';

$(function() {
	// ## 変数の初期化 ##
	// スタート時間用の変数
	let d = null;
	// 定期実行用の変数
	let id = null;
	// 定期的に表示させるための秒数を格納する変数
	let wait = null;

	// 経過時間文字列の取得
	const getTimeText = () => {
		// 現在時間取得
		const nowTime = new Date();
		// 現在時間とスタート時の差の取得
		const getTime = nowTime - d;
		// 経過時間の時間取得
		const h = Math.floor(getTime / 1000 / 60 / 60);
		// 経過時間の分取得
		let m = Math.floor(getTime / 1000 / 60) % 60;
		// 経過時間の秒取得
		let s = Math.floor(getTime / 1000) % 60;	// 秒
		// 経過時間のミリ秒取得
		let ms = getTime % 1000;	// ミリ秒

		// 分に0をつける
		m = ('0' + m).substr(-2);
		// 秒に0をつける
		s = ('0' + s).substr(-2);
		// ミリ秒に0をつける
		ms = ('00' + ms).substr(-3);

		// 文字列返す
		return h + ':' + m + ':' + s + ':' + ms;
	}

	// ボタンクリックイベント
	$('#btn').click(function() {
		// 開始と停止の分岐
		if(id === null) {
			// ## 開始の処理 ##
			// スタート時間取得
			d = new Date();
			// 文字を定期的に表示（定期実行解除の準備も）
			id = setInterval(function() {
				$('#output').text(getTimeText());
			});
			// ボタンの停止表示に変更
			$('#btn').text('停止');
		} else {
			// ## 停止の処理 ##
			// 定期実行の解除
			clearInterval(id);
			// 定期実行の変数初期化
			id = null;
			// 文字を表示
			$('#output').text(getTimeText());

			// ボタンの開始表示に変更
			$('#btn').text('開始');
		}
	});
});

