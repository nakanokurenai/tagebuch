<template>
  <section>
    <h1>{{post.title}}</h1>
    <p>{{post.summary}}</p>
  </section>
</template>

<script>
  export default {
    props: ['post']
  }
</script>
