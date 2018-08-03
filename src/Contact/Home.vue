<template>
  <div class="home">
    asdasda
    <Table :column="column" :data="tableData"></Table>
  </div>
</template>

<script>
  import {Table} from 'iview'

  export default {
    name: 'Home',
    components: {Table},
    data() {
      return {
        column: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '联系方式',
            key: 'phoneNum'
          },
          {
            title: '备注',
            key: 'nickName'
          }
        ],
        tableData: [
          {
            name: 'lisi',
            age: 18,
            address: 'asdas',
            date: 'asd'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
