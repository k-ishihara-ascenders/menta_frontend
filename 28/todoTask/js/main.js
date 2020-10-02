// 1. Vueインスタンスとルートテンプレートの作成
// 2. 主要な要素（タイトル・入力フォーム・タスク追加ボタン）
// 3. 追加ボタンのイベントハンドリング（送信しない処理も）
// 4. inputのvalueを双方向データバインディング（デバッグもしてみる）
// 5. タスクの追加処理（配列に追加）
// 6. タスク追加後の文字列クリア
// 7. 未入力時入力しない
// 8. リスト表示
// 9. タスクの完了管理
// 10. スタイル調整（完了済みに横線）
// 11. タスクの削除

'use strict';

const vm = new Vue({
	el: '#app',
	data: {
		newItem: '',
		isDone: false,
		todos: []
	},
	methods: {
		addItem: function() {
			if(this.newItem == '') return;
			this.todos.push({
				item: this.newItem,
				isDone: this.isDone
			});
			this.newItem = '';
		},
		deleteItem: function(index) {
			this.todos.splice(index, 1);
		}
	}
});
