<template>
  <loading v-if="onInitializing" />
  <div class="c" v-else>
    <h1>Das Tagebuch</h1>
    <div id=list>
      <ol v-if="posts.length > 0">
        <li>
          <post-preview :post="post" v-for="post in posts" :key="post.id"></post-preview>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import { articlesCollection } from '~/firebase'

import PostPreview from '~/components/PostPreview.vue'
import Loading from '~/components/Loading.vue'

export default {
  data: () => ({
    posts: [],
    onInitializing: true
  }),
  async beforeMount () {
    await this.$bind('posts', articlesCollection().orderBy('updated_at', 'desc'))
    this.onInitializing = false
  },
  components: {
    PostPreview,
    Loading
  }
}
</script>

<style scoped>
ol {
  list-style: none;
  padding: 0;
}
</style>
