<template>
  <div>
    <li>
      <ul v-for="post in posts" :key="post.id">
        <section>
          <h1>{{post.title}}</h1>
          <p>{{post.body}}</p>
        </section>
      </ul>
    </li>
  </div>
</template>

<script>
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
  })
}
</script>

<style scoped>
p {
  color: red;
}
</style>
