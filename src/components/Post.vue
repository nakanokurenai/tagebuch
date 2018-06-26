<template>
  <article v-html="renderedBody">
  </article>
</template>

<script>
import marked from 'marked'

export default {
  props: ['post'],
  computed: {
    renderedBody: function () {
      return marked(this.post.body)
    }
  }
}
</script>

<style scoped>
article:first-child {
  margin-top: 0;
}
</style>
