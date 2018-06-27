<template>
  <article>
    <router-link :to="'/posts/' + post.id">
      <h2>
        {{post.title || 'No title'}}
      </h2>
    </router-link>
    <footer class="information">
      <p>
        {{createdAt}}
      </p>
    </footer>
  </article>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    createdAt () {
      return new Date(this.post.created_at).toString()
    }
  }
}
</script>

<style scoped>
  h2 {
    margin: 0;
  }

  .information {
    width: 100%;
  }
</style>
