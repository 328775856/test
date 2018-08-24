<template>
  <div class="person">
    <Table :columns="column" :data="userData" :loading="loading"></Table>
    <page :total="total" :current="pageNo" @callback="call"></page>
  </div>
</template>

<script>
  import Utils from '@/utils.js'
  import {Table} from 'iview'
  import Page from '@/Components/Pages.vue';

  export default {
    name: 'Home',
    components: {Table, Page},
    data() {
      return {
        loading: true,
        total: 10,
        pageNo: 1,
        column: [
          {
            title: '编号',
            key: 'user_id'
          },
          {
            title: '用户名',
            key: 'user_name'
          },
          {
            title: '用户密码',
            key: 'user_password'
          },
          {
            title: '注册时间',
            key: 'date',
            align: 'center',
            render: (h, row) => {
              //  console.log(Utils.formatDate(row.row.login_time))
              //  let loginTime = Utils.formatDate(row.row.login_time)
              return (<div>{Utils.formatDate(row.row.date)
            }<
              /div>)
            }
          },
          {
            title: '登录时间',
            key: 'login_time',
            align: 'center',
            render: (h, row) => {
              //  console.log(Utils.formatDate(row.row.login_time))
              //  let loginTime = Utils.formatDate(row.row.login_time)
              return (<div>{Utils.formatDate(row.row.login_time)
            }<
              /div>)
            }
          }
        ],
        userData: []
      }
    },
    created() {
      this.axios.get('/getUserInfo', {params: {pageNo: this.pageNo}})
        .then((res) => {
          this.userData = res.data.data
          this.total = ~~(res.data.total)
          this.loading = false
          //  console.log(res.data)
        })
    },
    methods: {
      call(data) {
        this.userData = data
      }
    }
  }
</script>

<style scoped>
</style>
