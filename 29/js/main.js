'use strict';

// todo
// ステータスから


const vm = new Vue({
	el: '#app',

	data: {
		id: 1, // ID
		radioName: 'radio', // ラジオボタンの名前用
		radioYet: 'yet', // ラジオボタンの未着手用の文言
		radioProgress: 'progress', // ラジオボタンの進行中用の文言
		radioDone: 'done', // ラジオボタンの完了用の文言
		newTodo: '', // タスク名
		newLimit: { // 期限日
			year: '',
			month: '',
			day: ''
		},
		status: '未着手', // デフォルトのステータス
		isDone: false, // 完了かどうか
		todos: [], // タスクの配列
		nowYear: 0, // 現在の年（期限の年の最低年用）
		maxYear: 0, // 期限の年の最高年用
		lastDay: 0, // 期限の日の末日設定用
	},

	methods: {
		addTodo: function() {
			if(this.newTodo == '' || this.newLimit.year == '' || this.newLimit.month == '' || this.newLimit.day == '') return;
			if(this.newLimit == '') return;
			this.todos.push({
				id: this.id,
				title: this.newTodo,
				radioName: this.radioName + this.id.toString(),
				radioYet: this.radioYet + this.id.toString(),
				radioProgress: this.radioProgress + this.id.toString(),
				radioDone: this.radioDone + this.id.toString(),
				limit: this.newLimit,
				status: this.status,
				isDone: this.isDone
			});
			this.id++;
			this.newTodo = '';
			this.newLimit.year = '';
			this.newLimit.month = '';
			this.newLimit.day = '';
		},

		deleteTodo: function(index) {
			this.todos.splice(index, 1);
		},

		radioChange: function(index) { // 完了かどうかの判断用
			if(this.todos[index].status === "完了") {
				this.todos[index].isDone = true;
			} else {
				this.todos[index].isDone = false;
			}
		},

		changeMonth: function() { // 期限の日の末日設定
			const day31 = ['1','3','5','7','8','10','12'];
			const day30 = ['4','6','9','11'];
			const day29 = ['2'];

			if(day31.includes(this.newLimit.month)) {
				this.limitDay = 31;
			} else if(day30.includes(this.newLimit.month)) {
				this.limitDay = 30;
			} else if(day29.includes(this.newLimit.month)) {
				this.limitDay = 29;
			} else {
				console.log('エラー');
			}
		}
	},

	created: function() { // 現在の年の取得用
		this.nowYear = new Date().getFullYear();
		this.maxYear = this.nowYear + 10;
	}
});