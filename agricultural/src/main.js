// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import "babel-polyfill";
import '../node_modules/bootstrap3/dist/css/bootstrap.min.css';

// window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// Vue.prototype.$http = window.axios
Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
Vue.directive('theme',{
  bind(el,binding,vnode){
    if(binding.value=='wide'){
      el.style.maxWidth="1260px";
    } else if(binding.value=='narrow'){
      el.style.maxWidth="560px";
    }
    if(binding.arg=="column"){
      el.style.background="#"+Math.random().toString(16).slice(2,8);
      el.style.padding='20px';
    }
}})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
