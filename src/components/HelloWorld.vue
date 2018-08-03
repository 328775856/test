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
            <MenuItem name="4" class="flex flex-row" v-if="this.$route.params.name">
              <img class="avator" src="../assets/imgs/avator.jpg" alt="">
              <div>{{this.$route.params.name}}</div>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="Home" theme="light" width="auto" :open-names="['1']" @on-select="show($event)">
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
              <MenuItem name="total">所有人</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                个人信息
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                系统信息
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Admin</BreadcrumbItem>
            <BreadcrumbItem>{{route}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <home v-show="route===''"></home>
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
        route: ''
      }
    },
    created() {
      console.log(this.$route.params.name)
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
  .hello {
    width: 100%;
    height: 100%;
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
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-logo {
    background: url('../assets/imgs/logo.jpg') no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .layout-nav {
    width: 600px;
  }

  li.flex {
    width: 220px;
    justify-content: flex-start;
  }

  .layout-nav img {
    width: 50px;
    height: 50px;
    border-radius: 50% 50%;
  }

  .ivu-breadcrumb {
    width: 150px;
  }
</style>
