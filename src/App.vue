<template>
  <div>
    <ol>
      <li v-for="post in posts" :key="post.id">
        <post :post="post"></post>
      </li>
    </ol>
  </div>
</template>

<script>
import Post from './Post.vue'

export default {
  data: () => ({
    posts: [
      {
        'id': 1,
        'title': 'ほげ',
        'body': 'ふが'
      },
      {
        id: 2,
        title: 'hoge',
        body: 'huga'
      }
    ]
  }),
  components: {
    Post
  }
}
</script>

<style scoped>
ol {
  padding: 0;
}
li {
  list-style-type: none;
}
p {
  color: red;
}
</style>
