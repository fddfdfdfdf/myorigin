import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from './components/Index/Index'
// import vueTap from 'v-tap'
//import fastclick from 'fastclick'
import routers from "./router/index"
// import pdSelect from 'pd-select'
import {alertError} from './common/js/commonAler'
import axios from 'axios'

// 默认设置axios请求
axios.default.baseUrl = procreateStatus.url; //设置默认请求的前缀
axios.defaults.withCredentials = true //允许跨域
axios.default.method =  'post';
global.axios = axios //设置为全局引用
// Vue.prototype.$http = axios //在vue的原型链上添加axios
Vue.config.productionTip = false
//Vue.use(vueTap)
//Vue.use(pdSelect)
Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        alertDiv:alertError,
        isLogin:procreateStatus["aeb929f2e0"],
        isChannel:1,
        picterObj:(obj,status)=> {
        if(!procreateStatus.pinkers){
                procreateStatus.pinkers = {};
                procreateStatus.pinkers[status] = new myPicker(obj);
            }else if (procreateStatus.pinkers && !procreateStatus.pinkers[status]) {
               procreateStatus.pinkers[status] = new myPicker(obj);
          }
       },
        menuDt:null,
        error:procreateStatus["error"],
        status:procreateStatus["status"]
    },
    actions:{
        isLogin ({commit}, value) {
            commit("isLogin", value)
        },
        isChannel ({commit}, value) {
            commit("isChannel", value)
        },
        menuDt({commit}, value) {
            commit("menuDt", value)
        },
        whichObj({commit}, value) {
          commit("whichObj", value)
            }
    },
    mutations:{
         isLogin (state, value) {
            state.isLogin = value
         },
         isChannel (state,value) {
             state.isChannel = value
        },
        menuDt(state,value) {
            state.menuDt = value
        },
        whichObj(state,value) {
            state.whichObj = value
        }
    }
})
const router = new VueRouter({
    routes:routers ,
    linkActiveClass: 'active'
})

new Vue({
    router,
    store,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')


