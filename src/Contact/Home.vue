<template>
  <div class="home">
    <Button @click="modalShow = true" class="btn" type="primary">添加</Button>
    <Table border :columns="column" :data="tableData"></Table>
    <page :total="total" :current="pageNo" @callback="call"></page>
    <Modal
      v-model="modalShow"
      @on-ok="ok"
      title="添加新联系人"
      @on-cancel="modalShow = false">
      <Input v-model="name" placeholder="名字"/>
      <Input v-model="age" placeholder="年龄"/>
      <Input v-model="address" placeholder="地址"/>
      <Input v-model="tel" placeholder="联系方式"/>
      <Input v-model="nickname" placeholder="备注"/>
    </Modal>
  </div>
</template>

<script>
  import {Table, Button, Modal, Input} from 'iview'
  import Page from '@/Components/Pages.vue';

  export default {
    name: 'Home',
    components: {Table, Page, Button, Modal, Input},
    data() {
      return {
        name: '',
        age: '',
        address: '',
        tel: '',
        nickname: '',
        modalShow: false,
        loading: true,
        total: 10,
        pageNo: 1,
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
            title: '地址',
            key: 'address'
          },
          {
            title: '联系方式',
            key: 'tel'
          },
          {
            title: '备注',
            key: 'nickname'
          }
        ],
        tableData: [
          // {
          //   name: '李四',
          //   age: 18,
          //   address: '1831321321',
          //   date: '2018-7-2',
          //   nickName: 'nick '
          // },
          // {
          //   name: '李四',
          //   age: 18,
          //   address: '1831321321',
          //   date: '2018-7-2',
          //   nickName: 'nick '
          // },
          // {
          //   name: '李四',
          //   age: 18,
          //   address: '1831321321',
          //   date: '2018-7-2',
          //   nickName: 'nick '
          // },
          // {
          //   name: '李四',
          //   age: 18,
          //   address: '1831321321',
          //   date: '2018-7-2',
          //   nickName: 'nick '
          // },
          // {
          //   name: '李四',
          //   age: 18,
          //   address: '1831321321',
          //   date: '2018-7-2',
          //   nickName: 'nick '
          // },
          // {
          //   name: '李四',
          //   age: 18,
          //   address: '1831321321',
          //   date: '2018-7-2',
          //   nickName: 'nick '
          // },
          // {
          //   name: '李四',
          //   age: 18,
          //   address: '1831321321',
          //   date: '2018-7-2',
          //   nickName: 'nick '
          // }
        ]
      }
    },
    created() {
      this.axios.get('/getContact')
        .then((res) => {
          if (res.data.code === '200') {
            this.tableData = res.data.data
            this.total = ~~(res.data.total)
            this.loading = false
            // console.log(res.data.data)
          }
        })
    },
    methods: {
      call(data) {
        this.tableData = data
      },
      ok() {
        this.axios.post('/addContact', {
          name: this.name,
          age: this.age,
          address: this.address,
          tel: this.tel,
          nickname: this.nickname,
        }).then((res) => {
          if (res.code === '200') {
            return true
          }
        }).then(() => {
          this.axios.get('/getContact')
            .then((res) => {
              if (res.data.code === '200') {
                this.tableData = res.data.data
                this.total = ~~(res.data.total)
                this.loading = false
                // console.log(res.data.data)
              }
            })
        })
      }
    }
  }
</script>

<style scoped>
  .home .btn {
    display: block;
    margin-bottom: 10px;
  }
</style>
