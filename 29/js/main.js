'use strict';

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
			date: ''
		}, // dateオブジェクト
		status: '未着手', // デフォルトのステータス
		isDone: false, // 完了かどうか
		todos: [], // タスクの配列

		isEdit: false, // 編集用の表示・非表示
		editIndex: 0,// 編集用のインデックス
		editTodo: '', // 編集用のタスク名
		editLimit: { // 編集用の期限日
			year: '',
			month: '',
			date: ''
		},
	},

	methods: {
		addTodo: function(e) {
			if(this.newTodo == '' || this.newLimit.year == '' || this.newLimit.month == '' || this.newLimit.day == '') return;

			const limits = new Date(this.newLimit.year, this.newLimit.month -1, this.newLimit.date).toLocaleDateString();

			this.todos.push({
				id: this.id,
				title: this.newTodo,
				radioName: this.radioName + this.id.toString(),
				radioYet: this.radioYet + this.id.toString(),
				radioProgress: this.radioProgress + this.id.toString(),
				radioDone: this.radioDone + this.id.toString(),
				limit: {
					year: this.newLimit.year,
					month: this.newLimit.month,
					date: this.newLimit.date,
				},
				limits: limits,
				status: this.status,
				isDone: this.isDone
			});
			this.id++;
			this.newTodo = '';
			this.newLimit.year = '';
			this.newLimit.month = '';
			this.newLimit.date = '';
		},

		editShow: function(index) {
			this.editIndex = index;
			this.editTodo = this.todos[index].title;
			this.editLimit.year = this.todos[index].limit.year;
			this.editLimit.month = this.todos[index].limit.month;
			this.editLimit.date = this.todos[index].limit.date;
			this.isEdit = true;
		},

		changeTodo: function(index) {
			const editLimits = new Date(this.editLimit.year, this.editLimit.month -1, this.editLimit.date).toLocaleDateString();

			this.todos[index].title = this.editTodo;
			this.todos[index].limit.year = this.editLimit.year;
			this.todos[index].limit.month = this.editLimit.month;
			this.todos[index].limit.date = this.editLimit.date;
			this.todos[index].limits = editLimits,

			this.isEdit = false;
		},

		deleteTodo: function(index) {
			this.todos.splice(index, 1);
			this.isEdit = false;
		},

		radioChange: function(index) { // 完了かどうかの判断用
			if(this.todos[index].status === "完了") {
				this.todos[index].isDone = true;
			} else {
				this.todos[index].isDone = false;
			}
		}
	},
});