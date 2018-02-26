require('es6-promise').polyfill();
import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import Routers from './routers'
import axiosInstance from '../../assets/ajax/axiosManage'
import Tmsg from '../../components/message/toast.js'

import { getQueryString ,setTit ,trim } from '../../assets/js/util'
import Toast from 'toon-ui/lib/components/toast'
import loading from 'toon-ui/lib/components/loading'



import '../../assets/css/common.css'
import './index.css'


window.code = window.code  || getQueryString("code") || ""  ;


/** 全局对象 */
window.Vue = Vue;
window.$http = axiosInstance;
/** 全局工具类，非常用不放在全局 */
window.$util = { getQueryString:getQueryString,setTitle:setTit,trim:trim }
window.$util.Toast = Toast
window.$util.loading = loading




/** 全局配置 */
Vue.config.debug = false;
Vue.config.devtools = false;
Vue.config.silent = true;

/** 创建vue实例 */
let vueInit = function (){
  Vue.use(VueRouter);
  Vue.use(Tmsg);
  let router = new VueRouter({mode: 'hash',routes: Routers });
  new Vue({router,render: h => h(App)}).$mount('#app');
}
vueInit()

window.$util.Toast = Vue.prototype.$$Message
window.$$Message = Vue.prototype.$$Message

