<template>
  <section>
    <h1>
      <router-link :to="'/posts/' + post.id">
        {{post.title}}
      </router-link>
    </h1>
    <p>{{post.summary || post.body.split('/n')[0].substr(0, 100)}}</p>
  </section>
</template>

<script>
  export default {
    props: ['post']
  }
</script>
