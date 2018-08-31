<template>
  <div class="home">
    <div class="control flex flex-row">
      <Button @click="modalShow = true" class="btn" type="primary">添加</Button>
      <Button @click="deleteConfirm" class="btn" type="warning">删除</Button>
      查找：<Input v-model="searchValue" style="width: 200px;"/>
      <Button @click="searchE($event)" class="btn" type="default">查询</Button>
      <Button @click="searchAll($event)" class="btn" type="primary">全部</Button>
    </div>
    <Table border ref="selection" :columns="column" :data="tableData"
           @on-select-all="selectAll" @on-selection-change="change"></Table>
    <div class="control flex flex-row">
      <Button type="primary" class="btn" @click="handleSelectAll(true)">全选</Button>
      <Button class="btn" @click="handleSelectAll(false)">取消全选</Button>
    </div>
    <page v-if="search" :searchValue="searchValue" :search="search" :total="total" :pageNo="pageNo" @callback="call"
          @callbackNum="callbackNum"></page>
    <page v-else :search="search" :total="total" :pageNo="pageNo" @callback="call" @callbackNum="callbackNum"></page>
    <Modal
      :loading="modalLoadingShow"
      v-model="modalShow"
      @on-ok="ok"
      title="添加新联系人"
      @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem label="名字" prop="name">
          <Input class="inp" v-model="formValidate.name" placeholder="名字"/>
        </FormItem>
        <FormItem label="年龄" prop="age">
          <Input v-model="formValidate.age" placeholder="年龄"/>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" placeholder="地址"/>
        </FormItem>
        <FormItem label="联系方式" prop="tel">
          <Input v-model="formValidate.tel" placeholder="联系方式"/>
        </FormItem>
        <FormItem label="备注" prop="nickname">
          <Input v-model="formValidate.nickname" placeholder="备注"/>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import {Table, Button, Modal, Input, Form, FormItem} from 'iview'
  import Page from '@/Components/Pages.vue';

  export default {
    name: 'Home',
    components: {Table, Page, Button, Modal, Input, Form, FormItem},
    data() {
      return {
        formValidate: {
          name: '',
          age: '',
          address: '',
          tel: '',
          nickname: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '名字不能为空', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '年龄不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'}
          ],
          tel: [
            {required: true, message: '电话不能为空', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '昵称不能为空', trigger: 'blur'},
          ],
        },
        search: '',
        searchValue: '',
        modalShow: false,
        modalLoadingShow: true,
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
        setTimeout(() => {
          this.modalLoadingShow = false;
          this.$nextTick(() => {
            this.$refs['formValidate'].validate((valid) => {
              if (valid) {
                this.axios.post('/addContact', {
                  name: this.formValidate.name,
                  age: this.formValidate.age,
                  address: this.formValidate.address,
                  tel: this.formValidate.tel,
                  nickname: this.formValidate.nickname,
                }).then((res) => {
                  this.$Message.info(res.data.msg)
                  console.log(res.data.code)
                  if (res.data.code === '200') {
                    this.pageNo = Math.ceil(res.data.total / 10)
                  } else {
                    this.modalShow = true;
                    return new Promise(() => {
                    });
                  }
                }).then(() => {
                  this.loading = true
                  this.axios.get('/getContactInfo', {params: {pageNo: this.pageNo}})
                    .then((res) => {
                      if (res.data.code === '200') {
                        this.tableData = res.data.data
                        this.total = ~~(res.data.total)
                        this.loading = false
                        this.$refs['formValidate'].resetFields();
                        this.modalShow = false;
                        // console.log(res.data.data)
                      }
                    })
                })
              } else {
                this.$Message.error('验证失败，请重新输入！');
              }
              this.modalLoadingShow = false;
            });
            this.modalLoadingShow = true;
          });
        }, 1000);
        // setTimeout(() => {
        //   this.$nextTick(() => {
        //     this.$refs['formValidate'].validate((valid) => {
        //       if (valid) {
        //         this.$Message.success('Success!');
        //       } else {
        //         this.$Message.error('Fail!');
        //       }
        //       this.modalLoadingShow = false;
        //     });
        //   });
        // }, 1000);
      },
      cancel() {
        this.modalShow = false;
        this.$refs['formValidate'].resetFields();
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
                    if ((res.data.total % 10) === 0 && res.data.total >= 20) {
                      that.total = res.data.total - 1
                      // console.log(that.total)
                      that.pageNo = res.data.total / 10
                    } else if (~~(res.data.total) === 10) {
                      that.total = res.data.total - 1
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
                        that.total = ~~(res.data.total)
                        that.loading = false
                        that.$options.methods.searchE.bind(this)()
                      }
                    })
                })
            }
          })
        }
      },
      change(e) {
        this.selectionList = e
      },
      searchE() {
        if (this.searchValue === '') {
          this.$Message.info('无查询关键字')
          this.search = false
          return
        }
        this.search = true
        this.pageNo = 1
        this.axios.post('/searchContact', {value: this.searchValue, pageNo: this.pageNo})
          .then((res) => {
            if (res.data.code === '200') {
              this.tableData = res.data.data
              this.total = ~~(res.data.total)
              this.loading = false
            }
          })
      },
      searchAll() {
        if (this.search) {
          this.search = false
          this.pageNo = 1
          this.searchValue = ''
          this.axios.get('/getContactInfo', {params: {pageNo: this.pageNo}})
            .then((res) => {
              if (res.data.code === '200') {
                this.tableData = res.data.data
                this.total = ~~(res.data.total)
                this.loading = false
              }
            })
        }
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
