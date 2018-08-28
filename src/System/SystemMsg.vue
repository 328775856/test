<template>
  <div class="system">
    <h1>This is a demo!</h1>
    <img class="bg" src="@/assets/imgs/bibibg.png" alt="">
    <img class="logo" src="@/assets/imgs/bili.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'SystemMsg'
  }
</script>

<style scoped>
  .system {
    position: relative;
  }

  .bg {
    width: 180%;
  }

  img.logo {
    position: absolute;
    width: 20%;
    bottom: 0;
    left: 10%;
  }
</style>
