<template>
  <div class="test">
    <!--<div class="btn"-->
         <!--v-for="(btn, index) in testData"-->
         <!--:type="btn.type"-->
         <!--:text="btn.text"-->
         <!--:key="index">{{btn.text}}-->
    <!--</div>-->
    <div class="parent">5
      <div class="child">4
        <div>3
          <ul>2
            <li>1</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import {Layout, Header, Sider, Content, Menu, MenuItem, Submenu, Breadcrumb, BreadcrumbItem, Icon} from 'iview'

  export default {
    data() {
      return {
      }
    },
    render(h) {
      return h('div', {
        'class': {
          btn: true,
          success: this.type === 'success',
          error: this.type === 'error',
          warm: this.type === 'warm',
          default: this.type === 'default'
        },
        domProps: {
          innerHTML: this.$slots.default[0].text
        },
        on: {
          click: this.clickHandle
        }
      })
    },
    methods: {
      clickHandle() {
        // dosomething
      }
    },
    props: {
      type: {
        type: String,
        default: 'default'
      },
      text: {
        type: String,
        default: 'default'
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @border:1px solid #000;
.parent{
  width: 100px;
  height: 100px;
  border: @border;
  .child{
    width: 50px;
    height: 50px;
    background: rebeccapurple;
    border: @border
  }
    div{
      width: 20px;
      height: 20px;
      background: red;
    }
}
</style>
