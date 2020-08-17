<template>
  <!-- ★ここから追記 -->
  <form :class="classList" @submit.prevent="addCardToList">
		<input v-model="body"
			type="text"
			class="text-input"
			placeholder="Add new card"
			@focusin="startEditing"
			@focusout="finishEditing"
		>
    <button type="submit"
			class="add-button"
			v-if="isEditing || bodyExists"
		>
      Add
    </button>
  </form>
  <!-- ★ここまで追記 -->
</template>

<script>
export default {
  // ★ここから追記
  props: {
    listIndex: {
      type: Number,
      required: true,
    }
  },
  // ★ここまで追記
  data: function() {
    return {
			body: '',
			// ★ここに追加
			isEditing: false,
    }
	},
	// ★ここから追記
	computed: {
		classList() {
			const classList = ['addcard']
			if (this.isEditing) {
				classList.push('active')
			}
			// ★ここから追記
			if (this.bodyExists) {
				classList.push('addable')
			}
			// ★ここまで追記
			return classList
		},
		// ★追記
		bodyExists() {
			return this.body.length > 0
		}
	},
  methods: {
		startEditing: function() {
			this.isEditing = true
		},
		finishEditing: function() {
			this.isEditing = false
		},
		// ★ここまで追加
    addCardToList: function() {
      this.$store.dispatch('addCardToList', { body: this.body, listIndex: this.listIndex })
      this.body = ''
    }
  }
	// ★ここまで追記
}
</script>