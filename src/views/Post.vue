<template>
  <span v-if="!post">
    <p>Loading...</p>
  </span>
  <post v-else :post="post"></post>
</template>

<script>
import Raven from 'raven-js'
import { articlesCollection } from '~/firebase'

import Post from '~/components/Post.vue'

export default {
  data: () => ({
    post: null,
    isThereNoPost: false
  }),
  async beforeMount() {
    try {
      const doc = await articlesCollection().doc(this.$route.params.id).get()
      if (!doc.exists) {
        this.isThereNoPost = true
        return
      }
      this.post = doc.data()
    } catch (e) {
      Raven.captureException(e)
      this.isThereNoPost = true
      return
    }
  },
  components: {
    Post
  }
}
</script>
