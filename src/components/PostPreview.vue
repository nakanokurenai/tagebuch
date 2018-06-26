<template>
  <section>
    <router-link :to="'/posts/' + post.id">
      <h2>
        {{post.title}}
      </h2>
      <p class="id">
        /posts/{{post.id}}
      </p>
    </router-link>
    <p>{{post.summary || post.body.split('/n')[0].substr(0, 100)}}</p>
  </section>
</template>

<script>
  export default {
    props: ['post']
  }
</script>

<style scoped>
  h2 {
    margin: 0;
  }

  a {
    color: mediumpurple;
  }

  .id {
    text-align: right;
  }
</style>
