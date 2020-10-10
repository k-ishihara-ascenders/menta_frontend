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
		// isEdit: false, // 編集フォームの表示・非表示
		todos: [], // タスクの配列
		// editIndex: 0,
		// editTodo: '',
		// editLimit: {
		// 	year: '',
		// 	month: '',
		// 	date: ''
		// },
		// editStatus: '',
		// nowYear: 0, // 期限の年の最低年用
		// maxYear: 0, // 期限の年の最高年用
	},

	// computed: {
	// 	dayMax: function() {
	// 		const monthList = {
	// 			day31: [1,3,5,7,8,10,12,'1','3','5','7','8','10','12'],
	// 			day30: [4,6,9,11,'4','6','9','11'],
	// 			day29: [2,'2']
	// 		};

	// 		if(monthList.day31.includes(this.newLimit.month)) {
	// 			return 31;
	// 		} else if(monthList.day30.includes(this.newLimit.month)) {
	// 			return 30;
	// 		} else if(monthList.day29.includes(this.newLimit.month)) {
	// 			return 29;
	// 		}
	// 	}
	// },

	methods: {
		addTodo: function(e) {
			// const valYear = this.newLimit.year;
			// const minYear = document.querySelector('input[name=year]').getAttribute('min');
			// const maxYear = document.querySelector('input[name=year]').getAttribute('max');
			// const valMonth = this.newLimit.month;
			// const minMonth = document.querySelector('input[name=month]').getAttribute('min');
			// const maxMonth = document.querySelector('input[name=month]').getAttribute('max');
			// const valDay = this.newLimit.date;
			// const minDay = document.querySelector('input[name=day]').getAttribute('min');
			// const maxDay = document.querySelector('input[name=day').getAttribute('max');

			// if(parseInt(valYear, 10) < minYear || parseInt(valYear, 10) > maxYear || parseInt(valMonth, 10) < minMonth || parseInt(valMonth, 10) > maxMonth || parseInt(valDay, 10) < minDay || parseInt(valDay, 10) > maxDay || this.newTodo == '' || this.newLimit.year == '' || this.newLimit.month == '' || this.newLimit.day == '') return;

			if(this.newTodo == '' || this.newLimit.year == '' || this.newLimit.month == '' || this.newLimit.day == '') return;

			const limits = new Date(this.newLimit.year, this.newLimit.month, this.newLimit.date);

			this.todos.push({
				id: this.id,
				title: this.newTodo,
				radioName: this.radioName + this.id.toString(),
				radioYet: this.radioYet + this.id.toString(),
				radioProgress: this.radioProgress + this.id.toString(),
				radioDone: this.radioDone + this.id.toString(),
				limit: `${limits.getFullYear()}年${limits.getMonth()}月${limits.getDate()}日`,
				status: this.status,
				isDone: this.isDone
			});
			this.id++;
			this.newTodo = '';
			this.newLimit.year = '';
			this.newLimit.month = '';
			this.newLimit.date = '';

			// this.newLimit.year = new Date().getFullYear();
			// this.newLimit.month = new Date().getMonth() + 1;
			// this.newLimit.date = new Date().getDate();
		},

		// editShow: function(index) {
		// 	this.isEdit = true;
		// 	this.editIndex = index;
		// 	this.editId = this.todos[index].
		// 	this.editLimit.year = '';
		// 	this.editLimit.month = '';
		// 	this.editLimit.date = '';
		// },

		// changeTodo: function(index) {
		// 	this.isEdit = false;
		// },

		deleteTodo: function(index) {
			this.todos.splice(index, 1);
		},

		radioChange: function(index) { // 完了かどうかの判断用
			if(this.todos[index].status === "完了") {
				this.todos[index].isDone = true;
			} else {
				this.todos[index].isDone = false;
			}
		}
	},

	// created: function() { // 現在の年の取得用
	// 	this.newLimit.year = new Date().getFullYear();
	// 	this.newLimit.month = new Date().getMonth() + 1;
	// 	this.newLimit.date = new Date().getDate();
	// 	this.nowYear  = new Date().getFullYear();
	// 	this.maxYear = this.nowYear + 10;
	// },
});