<template>
  <div class="admin flex flex-col">
    <div class="username">
      <Input type="text" style="width: auto" prefix="ios-contact" size="small" clearable v-model="userName"
             id="userName" placeholder="用户名"/>
    </div>
    <div class="pwd">
      <Input type="text" style="width: auto" size="small" clearable v-model="userPwd" id="userPwd" placeholder="密码"/>
    </div>
    <div class="button">
      <Button @click="ok" type="primary">注册</Button>
      <Button @click="login">登录</Button>
    </div>
  </div>
</template>
<script>
  import {Modal, Button, Input, Icon} from 'iview'
  import Utils from '@/utils.js'
  // let axios;
  export default {
    name: 'Admin',
    components: {
      Modal, Button, Input, Icon
    },
    data() {
      return {
        userName: '',
        userPwd: ''
      }
    },
    created() {
      // config.get('/getUserInfo').then((res) => {
      //   console.log(res)
      // })
      // axios = this.axios.create({
      //   baseURL: 'http://nicksun666.club:3000',
      //   headers: {
      //     'Content-Type': 'text/plain'
      //   }
      // });
      // axios.get('/getUserInfo')
      //   .then((res) => {
      //     if (res.data === 'ok') {
      //       console.log(res)
      //     }
      //     this.$Message.info(res.data);
      //   })
      //   let userName = sessionStorage.getItem('userName');
      //   let userPwd = sessionStorage.getItem('userPwd');
      //   this.userName = userName;
      //   this.userPwd = userPwd;
      sessionStorage.clear()
      //   // console.log(userName)
      //   // console.log(userPwd)
    },
    methods: {
      ok() {
        if (this.userName === '' || this.userPwd === '') {
          this.$Message.info('请输入用户名或密码')
          return
        }
        // this.$Modal.confirm({
        //   title: 'asd',
        //   content: '请选择头像',
        //   render: function (h, param) {
        //     console.log(param)
        //     return (<div>123</div>)
        //   }
        // })
        this.axios.post('/register', {user_name: this.userName, user_password: this.userPwd})
          .then((res) => {
            if (res.data === 'ok') {
              //  console.log(res)
            }
            this.$Message.info(res.data);
          })
        // sessionStorage.setItem('userName', this.userName);
        // sessionStorage.setItem('userPwd', this.userPwd);
        // this.$Message.info('注册成功，请登录');
        // this.userName = ''
        // this.userPwd = ''
      },
      login() {
        if (this.userName === '' && this.userPwd === '') {
          this.$Message.info('请输入用户名或密码');
          return
        }
        this.axios.post('/login', {user_name: this.userName, user_password: this.userPwd, login_time: Utils.formatDate(Date.now())})
          .then((res) => {
            console.log(res.data.code)
            if (res.data.code === '200') {
              sessionStorage.setItem('userName', this.userName);
              sessionStorage.setItem('userPwd', this.userPwd);
              this.$router.push({path: '/main'})
            }
            this.$Message.info(res.data.msg ? res.data.msg : res.data);
          })
        // let userName = sessionStorage.getItem('userName');
        // let userPwd = sessionStorage.getItem('userPwd');
        // sessionStorage.clear()
        // console.log(userName)
        // console.log(userPwd)

        // if (userName !== null) {
        //   if (userName !== this.userName) {
        //     this.$Message.info('用户名有误')
        //   } else if (userPwd !== this.userPwd) {
        //     this.$Message.info('密码有误')
        //   } else {
        //     if (userName === this.userName && userPwd === this.userPwd) {
        //       this.$router.push({name: 'HelloWorld', params: {name: this.userName}})
        //     }
        //   }
        // } else {
        //   this.$Message.info('请先注册')
        // }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "./index.less";
</style>
