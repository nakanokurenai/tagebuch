<template>
  <div class="init sk-wave" v-if="onInitializing">
    <div class="sk-rect sk-rect1"></div>
    <div class="sk-rect sk-rect2"></div>
    <div class="sk-rect sk-rect3"></div>
    <div class="sk-rect sk-rect4"></div>
    <div class="sk-rect sk-rect5"></div>
  </div>
  <div class="c" v-else>
    <h1>Das Tagebuch</h1>
    <div id=list>
      <ol v-if="posts.length > 0">
        <li v-for="post in posts" :key="post.id">
          <post-preview :post="post"></post-preview>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import firebase from '@firebase/app'
import Raven from 'raven-js'

import 'spinkit/css/spinners/3-wave.css'

import { articlesCollection } from '~/firebase'

import PostPreview from '~/components/PostPreview.vue'

export default {
  data: () => ({
    posts: [],
    onInitializing: true
  }),
  async beforeMount() {
    await this.$bind('posts', articlesCollection().orderBy('updated_at', 'desc'))
    this.onInitializing = false
  },
  components: {
    PostPreview
  }
}
</script>

<style scoped>
.init {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
/* disable lit */
.init * {
  margin: 0;
  box-sizing: content-box;
}

ol {
  list-style: none;
}
</style>

