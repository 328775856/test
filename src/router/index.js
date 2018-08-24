import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/Main/HelloWorld'
import Admin from '@/Main/Admin'
import Homepage from '@/Main/Home'
import Test from '@/Main/Test'
import Home from '@/Home/Home'
import Contact from '@/Contact/Home'
import Total from '@/Contact/Total'

import Person from '@/Person/Home'
import Other from '@/Person/Other'

import System from '@/System/Home'
import SystemMsg from '@/System/SystemMsg'
import 'iview/dist/styles/iview.css';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'contact',
          name: 'Contact',
          component: Contact
        },
        {
          path: 'total',
          name: 'Total',
          component: Total
        },
        {
          path: 'person',
          name: 'Person',
          component: Person
        },
        {
          path: 'other',
          name: 'Other',
          component: Other
        },
        {
          path: 'system',
          name: 'System',
          component: System
        },
        {
          path: 'systemMsg',
          name: 'SystemMsg',
          component: SystemMsg
        }
      ]
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('userName')) { // 判断当前的token是否存在
      next();
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});
export default router
