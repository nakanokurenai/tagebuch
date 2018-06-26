<template>
  <div class="c">
    <header-component :title="'Not found'" />
    <p>SORRY</p>
  </div>
</template>

<script>
  import HeaderComponent from '~/components/Header.vue'

  export default {
    components: {
      HeaderComponent
    }
  }
</script>
