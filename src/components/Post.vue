<template>
  <section>
    <h1>{{post.title}}</h1>
    <p v-html="renderedBody"></p>
  </section>
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
p >>> img {
  max-width: 100%
}
</style>
