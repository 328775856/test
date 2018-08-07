<template>
  <div class="total">
    <Table border :columns="column" :data="tableData"></Table>
  </div>
</template>

<script>
  import {Table} from 'iview'

  export default {
    name: 'Total',
    components: {Table},
    data() {
      return {
        column: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '联系方式',
            key: 'address'
          },
          {
            title: '时间',
            key: 'date'
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
            address: '1831321321',
            date: '2018-7-2',
            nickName: 'nick '
          },
          {
            name: 'lisi',
            age: 18,
            address: '1831321321',
            date: '2018-7-2',
            nickName: 'nick '
          },
          {
            name: 'lisi',
            age: 18,
            address: '1831321321',
            date: '2018-7-2',
            nickName: 'nick '
          },
          {
            name: 'lisi',
            age: 18,
            address: '1831321321',
            date: '2018-7-2',
            nickName: 'nick '
          },
          {
            name: 'lisi',
            age: 18,
            address: '1831321321',
            date: '2018-7-2',
            nickName: 'nick '
          },
          {
            name: 'lisi',
            age: 18,
            address: '1831321321',
            date: '2018-7-2',
            nickName: 'nick '
          },
          {
            name: 'lisi',
            age: 18,
            address: '1831321321',
            date: '2018-7-2',
            nickName: 'nick '
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
