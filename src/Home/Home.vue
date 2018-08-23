<template>
  <div class="home">
    <h1>Hello!</h1>
    <h2>Welcome to my home!</h2>
    <h3>Have fun!</h3>
    <h3>以下为注册名单</h3>
    <Table :columns="column" :data="userData" :loading="loading"></Table>
    <Page :total="total" :current="pageNo" @on-change="change($event)"/>
  </div>
</template>

<script>
  import Utils from '@/utils.js'
  import {Table, Page} from 'iview'

  export default {
    name: 'Home',
    components: {Table, Page},
    data() {
      return {
        loading: true,
        total: '',
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
              return (<div>{Utils.formatDate(row.row.date)}</div>)
            }
          },
          {
            title: '登录时间',
            key: 'login_time',
            align: 'center',
            render: (h, row) => {
            //  console.log(Utils.formatDate(row.row.login_time))
            //  let loginTime = Utils.formatDate(row.row.login_time)
              return (<div>{Utils.formatDate(row.row.login_time)}</div>)
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
          this.total = res.total
          this.loading = false
        //  console.log(res.data)
        })
    },
    methods: {
      change(e) {
        this.pageNo = e
        this.axios.get('/getUserInfo', {params: {pageNo: this.pageNo}})
          .then((res) => {
            console.log(res)
            this.userData = res.data.data
            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>
