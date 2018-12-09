<template>
  <loading v-if="onInitializing" />
  <div class="c fadein" v-else>
    <header-component />
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

import { firestore } from 'firebase'

import PostPreview from '~/components/PostPreview.vue'
import Loading from '~/components/Loading.vue'
import HeaderComponent from '~/components/Header.vue'

export default {
  data: () => ({
    posts: [],
    onInitializing: true
  }),
  async beforeMount () {
    this.posts = (await articlesCollection().where('published_at', '<', firestore.FieldValue.serverTimestamp()).orderBy('published_at', 'desc').get()).docs.map(v => ({id: v.id, ...v.data()}))
    this.onInitializing = false
  },
  components: {
    PostPreview,
    Loading,
    HeaderComponent
  }
}
</script>

<style scoped>
ol {
  list-style: none;
  padding: 0;
}
</style>
