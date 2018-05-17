<template>
  <post>
    <section>
      <h1>{{post.title}}</h1>
      <p>{{post.body}}</p>
    </section>
  </post>
</template>

<script>
  export default {
    props: ["post"]
  }
</script>
