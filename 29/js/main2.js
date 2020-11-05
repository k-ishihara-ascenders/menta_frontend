// issue
// 1. ソート機能（複合検索も）
// 2. 期限ソートした時にチェック外れるの調査

'use strict';

const ModalComponent = {
	props: [
		'todos',
		'postIndex',
		'commentList',
	],
	data() {
		return {
			newComment: '',
			commentTodos: this.todos,
			commentModalList: this.commentList,
		}
	},
	methods: {
		postComment: function(index) {
			this.commentTodos[index].comments.push(this.newComment);
			this.commentModalList = this.commentTodos[index].comments;
			this.newComment = '';
			this.$emit('commentAddTodos', this.commentTodos);
		},

		closeComment: function() {
			document.getElementById('modalBlock').classList.remove('show');
		},
	},
	template: `
		<div id="modalBlock">
			<div class="commentBlock">
				<p class="closeBtn" @click="closeComment">閉じる</p>

				<textarea cols="50" rows="5" v-model="newComment"></textarea>
				<button @click="postComment(postIndex)">コメントする</button>

				<ul class="cList">
					<li v-for="comment in commentList">{{ comment }}</li>
				</ul>

			</div>
			<div class="modalBg" @click="closeComment"></div>
		</div>
	`
};

const vm = new Vue({
	el: '#app',
	components: {
		'modal-component': ModalComponent,
	},
	data: {
		id: 1, // ID
		radioName: 'radio', // ラジオボタンの名前用
		radioYet: 'yet', // ラジオボタンの未着手用の文言
		radioProgress: 'progress', // ラジオボタンの進行中用の文言
		radioDone: 'done', // ラジオボタンの完了用の文言
		newTodo: '', // タスク名
		newText: '', // 内容
		newLimit: { // 期限日
			year: '',
			month: '',
			date: ''
		}, // dateオブジェクト
		status: '未着手', // デフォルトのステータス
		isDone: false, // 完了かどうか
		isProgress: false, // 進行中かどうか
		todos: [
			{
				"id": 1,
				"title": "ふぁえふぁふぁふむふむあえふぁｓｆだ",
				"text": "ふぁｗふぇわｆ",
				"radioName": "radio1",
				"radioYet": "yet1",
				"radioProgress": "progress1",
				"radioDone": "done1",
				"limit": {
					"year": 2020,
					"month": 1,
					"date": 1
				},
				"limits": "2020/1/1",
				"createTime": "2020/11/5",
				"status": "未着手",
				"isDone": false,
				"isProgress": false,
				"comments": []
			},
			{
				"id": 2,
				"title": "ふふぁふぁふむふむあえふぁｓｆだ",
				"text": "ふぁｗふぇわｆ",
				"radioName": "radio2",
				"radioYet": "yet2",
				"radioProgress": "progress2",
				"radioDone": "done2",
				"limit": {
					"year": 2021,
					"month": 1,
					"date": 1
				},
				"limits": "2021/1/1",
				"createTime": "2020/11/5",
				"status": "未着手",
				"isDone": false,
				"isProgress": false,
				"comments": []
			},
			{
				"id": 3,
				"title": "むふむあえふぁｓｆだ",
				"text": "ふぁｗふぇわｆ",
				"radioName": "radio3",
				"radioYet": "yet3",
				"radioProgress": "progress3",
				"radioDone": "done3",
				"limit": {
					"year": 2022,
					"month": 1,
					"date": 1
				},
				"limits": "2022/1/1",
				"createTime": "2020/11/5",
				"status": "未着手",
				"isDone": false,
				"isProgress": false,
				"comments": []
			}
		], // タスクの配列
		processTodos: [],  // 表示用のタスクの配列

		isEdit: false, // 編集用の表示・非表示
		editIndex: 0,// 編集用のインデックス
		editTodo: '', // 編集用のタスク名
		editText: '', // 編集用の内容
		editLimit: { // 編集用の期限日
			year: '',
			month: '',
			date: ''
		},
		isSortId: true,
		sortIdText: '新しい順に変更',

		filterDateStart: {
			year: '2020',
			month: '1',
			date: '1'
		},
		filterDateEnd: {
			year: '2020',
			month: '1',
			date: '2'
		},
		filterCheck: [],
		editTime: '',
		postIndex: 0,
		commentList: [],
	},

	computed: {

	},

	methods: {
		addTodo: function(e) {
			if(this.newTodo == '' || this.newLimit.year == '' || this.newLimit.month == '' || this.newLimit.day == '') return;

			const limits = new Date(this.newLimit.year, this.newLimit.month -1, this.newLimit.date).toLocaleDateString();

			const nowTime = new Date().toLocaleDateString();

			this.todos.push({
				id: this.id,
				title: this.newTodo,
				text: this.newText,
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
				createTime: nowTime,
				status: this.status,
				isDone: this.isDone,
				isProgress: this.isProgress,
				comments: [],
			});
			this.pushTodo();
			this.sortId();
			this.id++;
			this.newTodo = '';
			this.newText = '';
			this.newLimit.year = '';
			this.newLimit.month = '';
			this.newLimit.date = '';
		},

		pushTodo: function() {
			const that = this;
			that.processTodos.length = 0;
			that.todos.forEach(function(todo) {
				that.processTodos.push(todo);
			});
		},

		editShow: function(index) {
			this.editIndex = index;
			this.editTodo = this.todos[index].title;
			this.editText = this.todos[index].text;
			this.editLimit.year = this.todos[index].limit.year;
			this.editLimit.month = this.todos[index].limit.month;
			this.editLimit.date = this.todos[index].limit.date;
			this.isEdit = true;
		},

		changeTodo: function(index) {
			const editLimits = new Date(this.editLimit.year, this.editLimit.month -1, this.editLimit.date).toLocaleDateString();

			this.todos[index].title = this.editTodo;
			this.todos[index].text = this.editText;
			this.todos[index].limit.year = this.editLimit.year;
			this.todos[index].limit.month = this.editLimit.month;
			this.todos[index].limit.date = this.editLimit.date;
			this.todos[index].limits = editLimits;
			const nowTime = new Date().toLocaleDateString();
			this.todos[index].editTime = nowTime;
			this.pushTodo();

			this.isEdit = false;
		},

		deleteTodo: function(index) {
			this.todos.splice(index, 1);
			this.pushTodo();
			this.isEdit = false;
		},

		radioChange: function(index) { // 完了かどうかの判断用
			if(this.todos[index].status === "完了") {
				this.todos[index].isDone = true;
			} else {
				this.todos[index].isDone = false;
			}
			if(this.todos[index].status === "進行中") {
				this.todos[index].isProgress = true;
			} else {
				this.todos[index].isProgress = false;
			}
			this.pushTodo();
		},

		sortClickId: function() {
			this.isSortId = !this.isSortId;
			this.sortId();
		},

		sortId: function() {
			// 昇順
			if(this.isSortId === true) {
				this.todos.sort(function(a,b){
					return (a.id < b.id ? -1 : 1);
				});
				this.sortIdText = '新しい順に変更';
				this.pushTodo();
			}

			// 降順
			if(this.isSortId === false) {
				this.todos.sort(function(a,b){
					return (a.id > b.id ? -1 : 1);
				});
				this.sortIdText = '古い順に変更';
				this.pushTodo();
			}
		},

		sortClickFastLimit: function() {
			// 昇順
			this.todos.sort(function(a,b){
				return (a.limits < b.limits ? -1 : 1);
			});
			this.pushTodo();
		},

		sortClickLastLimit: function() {
			// 降順
			this.todos.sort(function(a,b){
				return (a.limits > b.limits ? -1 : 1);
			});
			this.pushTodo();
		},

		filterTodo: function() {
			const startPeriod = new Date(this.filterDateStart.year, this.filterDateStart.month -1, this.filterDateStart.date).toLocaleDateString();
			const endPeriod = new Date(this.filterDateEnd.year, this.filterDateEnd.month -1, this.filterDateEnd.date).toLocaleDateString();
			const that = this;

			if(startPeriod >= endPeriod) {
				alert('期間を正しく設定してください');
				return;
			};

			that.processTodos.length = 0;

			that.processTodos = that.todos.filter(function(value) {
				return value.limits >= startPeriod && value.limits <= endPeriod;
			});

			that.processTodos = that.todos.filter(function(value) {
				return that.filterCheck.includes(value.status) === true;
			});
		},

		showComment: function(index) {
			this.commentList = this.todos[index].comments;
			this.postIndex = index;
			document.getElementById('modalBlock').classList.add('show');
		},
	},
	created: function() {
		this.pushTodo();
	}
});