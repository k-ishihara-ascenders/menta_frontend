<template>
	<!-- ここから追加 -->
  <div>
    <header>
      my Trello
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <!-- ★ここから追記 -->
      <div class="list-index">
				<draggable :list="lists"
            @end="movingList"
            class="list-index">
					<list v-for="(item, index) in lists"
								:key="item.id"
								:title="item.title"
								:cards="item.cards"
								:listIndex="index"
					/>
					<list-add/>
				</draggable>
      </div>
      <!-- ★ここまで追記 -->
    </main>
  </div>
  <!-- ここまで追加 -->
</template>

<script>
	// ★ここに追記
	import draggable from 'vuedraggable'
	import ListAdd from './ListAdd.vue'
	// ★ここから追記
	import List from './List'
	import { mapState } from 'vuex'
	// ★ここまで追記

	export default {
		// ★ここから追記
		components: {
			// ★ここに追記
			draggable,
			ListAdd,
			// ★追記
			List,
		},
		// ★追記
		computed: {
			...mapState([
				'lists'
			]),
			// ★ここに追記
			totalCardCount() {
				return this.$store.getters.totalCardCount
			}
		},
		// ★ここに追記
		methods: {
			movingCard: function() {
				this.$store.dispatch('updateList', { lists: this.lists })
			},
			// ★ここに追記
			movingList: function() {
				this.$store.dispatch('updateList', { lists: this.lists })
			}
		}
	}
</script>