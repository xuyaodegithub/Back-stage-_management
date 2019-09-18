// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/**
 * Created by Yan on 19/5/15.
 */
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import $ from 'jquery';
import store from './store';
import './assets/public.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import filters from './filters/filters'
Object.keys(filters).map((val,index)=>{
  Vue.filter(val,filters[val])
  // console.log(val,filters[val])
})
Vue.prototype.$http=axios;
Vue.config.productionTip = false;
Vue.use(ElementUI)

/* eslint-disable no-new */
const vm=new Vue({
  el: '#app',
  router,
  $,
  store,
  data: {//事件派发调用$emit 方法 this.$root.eventHub.$emit('eventfunction', yourData)，this.$root.eventHub.$on('eventfunction', fun)
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
})
export default vm
