<template>
    <div class="system flex flex-col">
      <h2>v-1.0<i>@Beta</i></h2>
    </div>
</template>

<script>
    export default {
        name: 'Home'
    }
</script>

<style scoped>
  h2{
    color: black;
    font-size: 30px;
  }
  .flex-col{
    height: 100%;
    justify-content: flex-end;
  }
  i{
    color: aqua;
    font-style: normal;
  }
</style>
