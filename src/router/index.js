import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import Test from '@/components/Test'
import Home from '@/Home/Home'
import Contact from '@/Contact/Home'
import 'iview/dist/styles/iview.css';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
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
        }
      ]
    },
    {
      path: '/',
      name: 'admin',
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
      console.log(sessionStorage.getItem('userName'))
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
