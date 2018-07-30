<template>
  <div class="admin">
    用户名: <Input type="text" style="width: auto" prefix="ios-contact" size="small" clearable v-model="userName"
                id="userName"/>
    <br>
    <br>
    密码: <Input type="text" style="width: auto" size="small" clearable v-model="userPwd" id="userPwd"/>
    <br>
    <br>
    <Button @click="ok">注册</Button>
    <Button @click="login">登录</Button>
  </div>
</template>
<script>
  import {Modal, Button, Input, Icon} from 'iview'

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
          return
        }
        sessionStorage.setItem('userName', this.userName);
        sessionStorage.setItem('userPwd', this.userPwd);
      },
      login() {
        let userName = sessionStorage.getItem('userName');
        let userPwd = sessionStorage.getItem('userPwd');
        // sessionStorage.clear()
        // console.log(userName)
        // console.log(userPwd)
        if (this.userName === '' && this.userPwd === '') {
          this.$Message.info('请输入用户名或密码');
          return
        }
        if (userName !== null) {
          if (userName !== this.userName) {
            this.$Message.info('用户名有误')
          } else if (userPwd !== this.userPwd) {
            this.$Message.info('密码有误')
          } else {
            if (userName === this.userName && userPwd === this.userPwd) {
               this.$router.push({path: '/'})
            }
          }
        } else {
          this.$Message.info('请先注册')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
