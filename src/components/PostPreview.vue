<template>
  <article>
    <router-link :to="'/posts/' + post.id">
      <h2>
        {{post.title}}
      </h2>
      <footer class="information">
        <p class="right">
          {{createdAt}}
        </p>
      </footer>
    </router-link>
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

  .right {
    text-align: right;
  }
</style>
