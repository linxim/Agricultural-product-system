/* eslint-disable eqeqeq */
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'
import VueRouter from 'vue-router'
import 'default-passive-events'
/* eslint-disable no-new */

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Vuex)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin && window.sessionStorage.length == 0) {
    next({path: '/login'})
    ElementUI.Message({
      message: '请登录',
      type: 'warning'
    })
  } else {
    next()
  }
})
