// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入mint-ui
import Mint from 'mint-ui'
//引入其css
import 'mint-ui/lib/style.css'
//安装插件-- mint
Vue.use(Mint)

//引入mui样式
import '../static/mui/dist/css/mui.css'


//引入axios
import Axios from 'axios'
//挂载原型
Vue.prototype.$axios = Axios

//拦截器
// 请求拦截器
Axios.interceptors.request.use(function(config) {
  //显示图标
  Mint.Indicator.open({
    text: '加载中...',
    spinnerType: 'snake'
  });
  return config;
})
//响应拦截器
Axios.interceptors.response.use(function(config){
  //隐藏图标
  Mint.Indicator.close();
  return config;
});

//全局css
import '../static/css/global.css'

//全局js
import global from '../src/global/global.js'
Vue.prototype.Global = global;
//使用全局组件
import navBar from'./components/component/navBar.vue'
Vue.component('navBar',navBar)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//全局函数
// Vue.prototype.unicodeToChar = function(str){
//   return eval("'"+str+"'");
// }