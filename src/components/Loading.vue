<template>
  <div class="container">
    <div class="loading sk-wave">
      <div class="sk-rect sk-rect1"></div>
      <div class="sk-rect sk-rect2"></div>
      <div class="sk-rect sk-rect3"></div>
      <div class="sk-rect sk-rect4"></div>
      <div class="sk-rect sk-rect5"></div>
    </div>
  </div>
</template>

<style scoped>
  @import url(~spinkit/css/spinners/3-wave.css);

  .container {
    position: absolute;
    margin: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 2147483647; /* max priority */
  }

  .loading {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  /* disable lit */
  .loading * {
    margin: 0;
    box-sizing: content-box;
  }
</style>
