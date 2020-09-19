'use strict';

$(function() {
		// ## 変数の初期化 ##
		// Audioオブジェクトの生成
		const audio = new Audio('');
		// 音声パス
		const url = 'sound2/se_maoudamashii_jingle05.';
		// 再生可能かどうかの判定のための変数
		let canPlay = false;

		// ## サウンドを読み込むための関数 ##
		const readSound = () => {
			// エラー対応
			try {
				// ## ユーザーのブラウザでの使用可能なファイル形式の判定、拡張子を得る ##
				// 拡張子の変数用意
				let ext = null;
				// 条件分岐で拡張子を設定
				if(audio.canPlayType('audio/ogg') === 'maybe') {ext = 'ogg'; console.log('ogg');}
				else if(audio.canPlayType('audio/mp3') === 'maybe') {ext = 'mp3';console.log('mp3');}
				// 再生可能になった事を許可する関数
				audio.addEventListener('canplaythrough', function() {
					canPlay = true;
				});
				// ファイルを読み込む・設定
				audio.src = url + ext;
			} catch (error) {
				console.log(error);
			}
		}

		// 再生するための関数
		const play = () => {
			// 再生できない時の処理
			if(!(canPlay = true)) return;
			// 現在時間の設定
			audio.currentTime = 0;
			// ループの可否
			audio.loop = false;
			// 再生
			audio.play();
		}

		// ループ再生するための関数
		const loop = () => {
			// 再生できない時の処理
			if(!(canPlay = true)) return;
			// 現在時間の設定
			audio.currentTime = 0;
			// ループの可否
			audio.loop = true;
			// 再生
			audio.play();
		}

		// 停止するための関数
		const pause = () => {
			// 再生できない時の処理
			if(!(canPlay = true)) return;
			// 停止
			audio.pause();
		}

		// ボタンのイベントを登録
		$('#btnPlay').click(function(){ play() });
		$('#btnLoop').click(function(){ loop() });
		$('#btnStop').click(function(){ pause() });

		// サウンドの読み込み
		readSound();
});

