import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'
import reg from '@/views/reg'
import Commodityadd from '@/views/Commodityadd'
import Commoditylist from '@/views/Commoditylist'
import indexmain from '@/views/indexmain'
import Commodityupdata from '@/views/Commodityupdata'
import Userlist from '@/views/Userlist'
import Userupdate from '@/views/Userupdate'
import users from '@/views/users'
import orderlist from '@/views/orderlist'
import orderupdate from '@/views/orderupdate'
import Useradd from '@/views/Useradd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        needLogin: true
      },
      children: [
        {
          path: '/index/',
          name: 'indexmain',
          component: indexmain,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'Commodityadd',
          name: 'Commodityadd',
          component: Commodityadd,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'Commoditylist',
          name: 'Commoditylist',
          component: Commoditylist,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'Commodityupdata',
          name: 'Commodityupdata',
          component: Commodityupdata,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'Userlist',
          name: 'Userlist',
          component: Userlist,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'Userupdate',
          name: 'Userupdate',
          component: Userupdate,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'users',
          name: 'users',
          component: users,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'Useradd',
          name: 'Useradd',
          component: Useradd,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: orderlist,
          meta: {
            needLogin: true
          }
        },
        {
          path: 'orderupdate',
          name: 'orderupdate',
          component: orderupdate,
          meta: {
            needLogin: true
          }
        }
      ]
    }
  ]
})
