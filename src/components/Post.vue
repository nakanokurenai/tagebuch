<template>
  <section>
    <h1>{{post.title}}</h1>
    <p>{{post.body}}</p>
  </section>
</template>

<script>
  export default {
    props: ['post']
  }
</script>

<style scoped>
p {
  white-space: pre;
}
</style>
