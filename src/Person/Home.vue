<template>
  <div class="person">
    <Table border :columns="column" :data="tableData"></Table>
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
            title: '编号',
            key: 'id'
          },
          {
            title: '用户',
            key: 'userName',
          },
          {
            title: '创建时间',
            key: 'startTime'
          },
          {
            title: '信息',
            key: 'msg'
          }
        ],
        tableData: [
          {
            id: 1,
            userName: 'lisi',
            startTime: '2018-7-2',
            msg: '人才'
          },
          {
            id: 1,
            userName: 'lisi',
            startTime: '2018-7-2',
            msg: '人才'
          },
          {
            id: 1,
            userName: 'lisi',
            startTime: '2018-7-2',
            msg: '人才'
          },
          {
            id: 1,
            userName: 'lisi',
            startTime: '2018-7-2',
            msg: '人才'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
