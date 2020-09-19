'use strict';

$(function() {
	// テンプレートのHTML文字列取得
	const template = $('#template').html();

	// クッキーに入れるデータの名前
	const cookieName = 'memo-data';

	// 新規メモを末尾に追加する処理
	const appendNewMemo = function(ttl, bdy) {
		// 「%s」を、ttlとbdyの文字列に置換
		const html = template.replace('%s', ttl).replace('%s', bdy);
		// メモエリアの末尾に末尾に追加
		$('#memoArea').append(html);
	};

	// 新規メモをメモエリアに表示とクッキーに保存処理
	const add = function() {
		// タイトルと本文を取り出し
		const ttl = $('#title').val();
		const bdy = $('#body').val();

		// 新規メモ追加処理
		appendNewMemo(ttl, bdy);

		// メモをクッキーに保存
		saveMemo();
	};

	// リセット処理
	const reset = function() {
		// メモエリアの中を空にする
		$('#memoArea').empty();

		// クッキーを空に
		Cookies.remove(cookieName);
	};

	// メモをクッキーに保存する処理
	const saveMemo = function() {
		// クッキーに保存する値の配列作成
		const arrMemo = [];

		// 作成したすべてのメモを用意した配列に格納
		$('#memoArea .memo-group').each(function() {
			// 取得したタイトルと本文をエンコードする
			const $this = $(this);
			let ttl = $this.find('input').val();
			let bdy = $this.find('textarea').val();
			ttl = encodeURI(ttl);
			bdy = encodeURI(bdy);

			// 値のオブジェクトを作成して用意した配列に格納
			var obj = {ttl: ttl, bdy: bdy};
			arrMemo.push(obj);
		});

		// 配列に入れたオブジェクトをjson文字列に変換して値の変数にセットする
		const memoVal = JSON.stringify(arrMemo);

		// 用意した保存用の名前と値をクッキーに保存する
		Cookies.set(cookieName, memoVal);
	};

	// リロードしてもメモを復帰させる処理
	const restoreMemo = function() {
		// クッキーの値を読み込み、空なら終了
		const cookieVal = Cookies.get(cookieName);
		if(cookieVal === undefined) return;

		// クッキーに保存する用の配列作成
		let memoArr = [];

		// クッキーの値をオブジェクトに変換して配列に格納、失敗時はエラーメッセージをコンソールに表示させて終了
		try{
			memoArr = JSON.parse(cookieVal);
		} catch(e) {
			console.log("[coolie read error]" + e);
			return;
		}

		// メモを取り出してきて構築
		$.each(memoArr, function() {
			// メモのタイトルと本文を取得
			const memo = $(this);
			let ttl = memo[0].ttl;
			let bdy = memo[0].bdy;

			// 取り出したタイトルと本文をデコード
			ttl = decodeURI(ttl);
			bdy = decodeURI(bdy);

			// 復帰させたメモを末尾に追加
			appendNewMemo(ttl, bdy);
		});
	};

	// [追加]ボタンのイベント登録
	$('#btnAdd').click(add);

	// [リセット]ボタンのイベント登録
	$('#btnReset').click(reset);

	// クッキーに保存されてるメモを復帰させる
	restoreMemo();
});

