<template>
  <div>
    <ol>
      <li v-for="post in posts" :key="post.id">
        <section>
          <h1>{{post.title}}</h1>
          <p>{{post.body}}</p>
        </section>
      </li>
    </ol>
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
li {
  list-style-type: none;
}
p {
  color: red;
}
</style>
