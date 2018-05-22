<template>
  <span v-if="onInitializing">
    <h1>Das Tagebuch</h1>
    <p>Loading...</p>
  </span>
  <span v-else>
    <h1>Das Tagebuch</h1>
    <h2 v-if="posts.length === 0">There are no posts.</h2>
    <ol v-else>
      <li v-for="post in posts" :key="post.id">
        <post-preview :post="post"></post-preview>
      </li>
    </ol>
  </span>
</template>

<script>
import firebase from '@firebase/app'
import Raven from 'raven-js'

import PostPreview from '~/components/PostPreview.vue'

export default {
  data: () => ({
    posts: [],
    onInitializing: true
  }),
  async beforeMount () {
    this.onInitializing = false
  },
  components: {
    PostPreview
  }
}
</script>

<style scoped>
ol {
  padding: 0;
}
li {
  list-style-type: none;
}
p {
  color: red;
}
</style>
