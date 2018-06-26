<template>
  <loading v-if="onInitializing" />
  <div class="c fadein" v-else>
    <h1>Das Tagebuch</h1>
    <div id=list v-if="posts.length > 0">
      <ol v-if="posts.length > 0">
        <li>
          <post-preview :post="post" v-for="post in posts" :key="post.id"></post-preview>
        </li>
      </ol>
    </div>
    <h3 v-else>There are no articles</h3>
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
