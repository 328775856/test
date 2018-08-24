<template>
  <div class="hello">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
          </div>
          <div class="layout-nav">
            <!--<MenuItem name="1">-->
            <!--<Icon type="ios-navigate"></Icon>-->
            <!--主页-->
            <!--</MenuItem>-->
            <!--<MenuItem name="2">-->
            <!--<Icon type="ios-keypad"></Icon>-->
            <!--通讯录-->
            <!--</MenuItem>-->
            <!--<MenuItem name="3">-->
            <!--<Icon type="ios-analytics"></Icon>-->
            <!--个人信息-->
            <!--</MenuItem>-->
            <MenuItem name="4" class="flex flex-row" v-if="userName">
              <img class="avator" src="../assets/imgs/avator.jpg" alt="">
              <div class="name">{{userName}}</div>
              <div class="loginTime">登录时间:{{loginTime}}</div>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu theme="light" width="auto" :open-names="['1']" @on-select="show($event)">
            <MenuItem name="Home">
              <Icon type="ios-navigate"></Icon>
              主页
            </MenuItem>
            <Submenu name="addressList">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                通讯录
              </template>
              <MenuItem name="Contact">常用联系人</MenuItem>
              <!--<MenuItem name="Total">所有人</MenuItem>-->
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                用户信息
              </template>
              <MenuItem name="Person">个人信息</MenuItem>
              <!--<MenuItem name="Other">其他人信息</MenuItem>-->
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                系统信息
              </template>
              <MenuItem name="System">系统版本</MenuItem>
              <MenuItem name="SystemMsg">系统信息</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Admin</BreadcrumbItem>
            <BreadcrumbItem>{{route}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <div v-if="this.route === ''&& $route.path.length<=7" class="bg">
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="shape"></div>
              <div class="text">Miracle</div>
              <a class="click" href="https://github.com/nicksun666/drag-demo">click see more!</a>
            </div>
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import {Layout, Header, Sider, Content, Menu, MenuItem, Submenu, Breadcrumb, BreadcrumbItem, Icon} from 'iview'
  import Home from '@/Home/Home.vue'
  import Utils from '@/utils.js'

  export default {
    name: 'HelloWorld',
    components: {
      Layout,
      Header,
      Sider,
      Content,
      Menu,
      MenuItem,
      Submenu,
      Breadcrumb,
      BreadcrumbItem,
      Icon,
      Home
    },
    data() {
      return {
        route: '',
        userName: '',
        loginTime: ''
      }
    },
    created() {
      this.axios.get('/getUserInfo')
        .then((res) => {
          for (let i of res.data.data) {
            if (i.user_name === this.userName) {
              this.loginTime = Utils.formatDate(i.login_time)
            }
          }
        })
      // this.loginTime = Utils.formatDate(this.$route.query.loginTime)
      console.log(sessionStorage.getItem('userName'))
      this.userName = sessionStorage.getItem('userName')
    },
    methods: {
      show(e) {
        this.$router.push({name: e})
        this.route = e
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (min-width: 280px) and (max-width: 414px) {
    .ivu-layout-header {
      padding: 0;
    }

    .layout-nav li.flex {
      width: 120px;
    }

    .ivu-layout-sider {
      width: auto !important;
      min-width: auto !important;
      max-width: none !important;
      flex: 0 0 150px !important;
    }

    li.flex > div:last-child {
      display: none;
    }
  }

  .hello {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .layout {
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
  }

  .layout-logo {
    background: url('../assets/imgs/logo.jpg') no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  li.flex {
    width: 350px;
    justify-content: space-between;
  }

  li.flex > div {
    padding-left: 10px;
  }

  .layout-nav img {
    width: 50px;
    height: 50px;
    border-radius: 50% 50%;
  }

  .ivu-breadcrumb {
    width: 200px;
  }

  .layout-nav {
    display: flex;
    justify-content: flex-end;
  }

  .bg {
    width: 100%;
    height: 100%;
    background: #57c5f7;
    position: relative;
    overflow: hidden;
  }

  .ivu-layout-content {
    height: 100%;
  }

  .shape:nth-child(1) {
    width: 10%;
    height: 60%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    bottom: -100%;
    -webkit-animation: my 7s infinite;
    -o-animation: my 7s infinite;
    animation: my 7s infinite;
  }

  .shape:nth-child(2) {
    width: 5%;
    height: 30%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 10%;
    bottom: -100%;
    -webkit-animation: my2 3s 1.5s linear infinite;
    -o-animation: my2 3s 1.5s linear infinite;
    animation: my2 3s 1.5s linear infinite;
  }

  .shape:nth-child(3) {
    width: 6%;
    height: 40%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 20%;
    bottom: -100%;
    -webkit-animation: my 4s 1.5s infinite;
    -o-animation: my 4s 1.5s infinite;
    animation: my 4s 1.5s infinite;
  }

  .shape:nth-child(4) {
    width: 14%;
    height: 90%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 30%;
    bottom: -100%;
    -webkit-animation: my 5s 3s infinite;
    -o-animation: my 5s 3s infinite;
    animation: my 5s 3s infinite;
  }

  .shape:nth-child(5) {
    width: 3%;
    height: 20%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 40%;
    bottom: -100%;
    -webkit-animation: my 7s 3.5s infinite;
    -o-animation: my 7s 3.5s infinite;
    animation: my 7s 3.5s infinite;
  }

  .shape:nth-child(6) {
    width: 7%;
    height: 40%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 50%;
    bottom: -100%;
    -webkit-animation: my2 3s 3s infinite;
    -o-animation: my2 3s 3s infinite;
    animation: my2 3s 3s infinite;
  }

  .shape:nth-child(7) {
    width: 10%;
    height: 60%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 60%;
    bottom: -100%;
    -webkit-animation: my 7s 1.5s infinite;
    -o-animation: my 7s 1.5s infinite;
    animation: my 7s 1.5s infinite;
  }

  .shape:nth-child(8) {
    width: 13%;
    height: 80%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 70%;
    bottom: -100%;
    -webkit-animation: my 9s 2s infinite;
    -o-animation: my 9s 2s infinite;
    animation: my 9s 2s infinite;
  }

  .shape:nth-child(9) {
    width: 3%;
    height: 20%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 80%;
    bottom: -100%;
    -webkit-animation: my2 7s 3s infinite;
    -o-animation: my2 7s 3s infinite;
    animation: my2 7s 3s infinite;
  }

  .shape:nth-child(10) {
    width: 10%;
    height: 60%;
    border-radius: 100% 100%;
    background: rgba(255, 255, 255, .7);
    position: absolute;
    left: 90%;
    bottom: -100%;
    -webkit-animation: my 4s 1.5s infinite;
    -o-animation: my 4s 1.5s infinite;
    animation: my 4s 1.5s infinite;
  }

  @keyframes my {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 80%
    }
  }

  @keyframes my2 {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 100%
    }
  }

  .text {
    position: absolute;
    top: 20%;
    width: 100%;
    height: 100%;
    color: transparent;
    -webkit-text-stroke: 6px rgba(255, 0, 255, .2);
    font-size: 100px;
    letter-spacing: 60px;
  }

  .click {
    display: inline-block;
    height: 100px;
    line-height: 50px;
    font-size: 26px;
  }
</style>
<style>
  .ivu-table-border td, .ivu-table-border th {
    text-align: center;
  }
</style>
