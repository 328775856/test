<template>
  <div class="home">
    <div class="control flex flex-row">
      <Button @click="modalShow = true" class="btn" type="primary">添加</Button>
      <Button @click="deleteConfirm" class="btn" type="warning">删除</Button>
    </div>
    <Table border ref="selection" :columns="column" :data="tableData"
           @on-select-all="selectAll" @on-selection-change="change"></Table>
    <div class="control flex flex-row">
      <Button type="primary" class="btn" @click="handleSelectAll(true)">全选</Button>
      <Button class="btn" @click="handleSelectAll(false)">取消全选</Button>
    </div>
    <page :total="total" :pageNo="pageNo" @callback="call" @callbackNum="callbackNum"></page>
    <Modal
      v-model="modalShow"
      @on-ok="ok"
      title="添加新联系人"
      @on-cancel="modalShow = false">
      <Input class="inp" v-model="name" placeholder="名字"/>
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
        selectionList: [],
        column: [
          {
            type: 'selection',
            width: 60,
          },
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
      this.axios.get('/getContactInfo', {params: {pageNo: this.pageNo}})
        .then((res) => {
          if (res.data.code === '200') {
            this.tableData = res.data.data
            this.total = ~~(res.data.total)
            this.loading = false
            console.log(this.total)
          }
        })
    },
    methods: {
      call(data) {
        this.tableData = data
      },
      callbackNum(data) {
        this.pageNo = data
      },
      ok() {
        this.axios.post('/addContact', {
          name: this.name,
          age: this.age,
          address: this.address,
          tel: this.tel,
          nickname: this.nickname,
        }).then((res) => {
          if (res.data.code === '200') {
            this.pageNo = Math.ceil(res.data.total / 10)
            return true
          }
        }).then(() => {
          this.loading = true
          this.axios.get('/getContactInfo', {params: {pageNo: this.pageNo}})
            .then((res) => {
              if (res.data.code === '200') {
                this.tableData = res.data.data
                this.total = ~~(res.data.total)
                this.loading = false
                // console.log(res.data.data)
              }
            })
        })
      },
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status);
      },
      selectAll(selection) {
      },
      deleteConfirm() {
        let that = this
        let arr = []
        for (let i of that.selectionList) {
          arr.push(i.id)
        }
        if (arr.length === 0) {
          this.$Message.info('请选择')
        } else {
          this.$Modal.confirm({
            title: '确定删除？',
            onOk: function () {
              for (let i of that.selectionList) {
                arr.push(i.id)
              }
              this.axios.post('/deleteContact', {selectionList: arr})
                .then((res) => {
                  if (res.data.code === '200') {
                    if (res.data.total > 20) {
                      that.total = that.total - 11
                      console.log(that.total)
                      that.pageNo = Math.ceil(res.data.total / 10)
                    } else if (res.data.total < 20 && res.data.total > 11) {
                      that.total = 19
                      that.pageNo = 2
                    } else {
                      that.total = 9
                      that.pageNo = 1
                    }
                    return true
                  }
                })
                .then(() => {
                  this.axios.get('/getContactInfo', {params: {pageNo: that.pageNo}})
                    .then((res) => {
                      if (res.data.code === '200') {
                        that.tableData = res.data.data
                        that.loading = false
                      }
                    })
                })
            }
          })
        }
      },
      change(e) {
        this.selectionList = e
      }
    }
  }
</script>

<style scoped lang="less">
  .home {
    .control {
      justify-content: flex-start;
    }
    .btn {
      display: block;
      margin: 10px 10px 10px 0;
    }
  }

  .ivu-modal-body > div {
    margin-bottom: 20px;
  }
</style>
