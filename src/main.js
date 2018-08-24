// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import host from './Host'
// import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@/assets/css/global.css'
// Vue.use(iView)
import {Message, Modal} from 'iview'
import api from './api'
// import axios from 'axios'
// // Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.prototype.api = api
let baseHost = host.prod
Vue.prototype.axios = axios.create({
  baseURL: baseHost,
  headers: {
    'Content-Type': 'text/plain'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
