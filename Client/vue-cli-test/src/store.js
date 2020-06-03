import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: {},
    orderlist: {},
    headerimg: '../static/img/05a6270811c89f96726bc4f25c3db0f8.jpeg',
    iphone: '',
    userlist: {},
    userheaderimg: '../static/img/05a6270811c89f96726bc4f25c3db0f8.jpeg'
  },
  mutations: {
    setlist (state, payload) {
      state.list = payload
    },
    setheaderimg (state, payload) {
      state.headerimg = payload
    },
    setorderlist (state, payload) {
      state.orderlist = payload
    },
    setiphone (state, payload) {
      state.iphone = payload
    },
    setuserlist (state, payload) {
      state.userlist = payload
    }
  }
})
