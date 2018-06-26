<template>
  <header>
    <router-link :to="to">
      <h1>{{h1}}</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  props: ['title', 'path'],
  computed: {
    to () {
      return this.path || '/'
    },
    h1 () {
      return this.title || 'Das Tagebuch'
    }
  }
}
</script>

<style scoped>
header {
  box-sizing: border-box;
}

header > * {
  margin: 0;
  right: 0;
  color: #000;
  text-align: center;
}
</style>
