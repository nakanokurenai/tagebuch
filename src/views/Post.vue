<template>
  <div v-if="post" class="c fadein">
    <header-component />
    <post class="post" :post="post" />
  </div>
  <not-found v-else-if="isThereNoPost" />
  <loading v-else/>
</template>

<style scoped>
.post :first-child {
  margin-top: 0;
}
</style>

<script>
import Raven from 'raven-js'
import { articlesCollection } from '~/firebase'

import Post from '~/components/Post.vue'
import Loading from '~/components/Loading.vue'
import HeaderComponent from '~/components/Header.vue'
import NotFound from '~/views/NotFound.vue'

export default {
  data: () => ({
    post: null,
    isThereNoPost: false
  }),
  async beforeMount () {
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
    }
  },
  components: {
    Post,
    NotFound,
    Loading,
    HeaderComponent
  }
}
</script>
