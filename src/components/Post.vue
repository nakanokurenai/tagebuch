<template>
  <article v-html="body">
  </article>
</template>

<script>
import marked from 'marked'

export default {
  props: ['post'],
  computed: {
    body: function () {
      return marked(this.post.body, {
        gfm: true,
        breaks: true
      })
    }
  }
}
</script>

<style scoped>
article >>> table {
  width: 100%;
}
</style>
