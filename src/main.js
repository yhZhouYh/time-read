// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Toast from 'vux/src/plugins/toast'
import ZHeader from './components/common/ZHeader'
import Icon from './components/common/Icon.vue'
import VueLazyload from 'vue-lazyload'
import Navigation from './assets/lib/navigator'
import './assets/font/iconfont'
import homeIcon from './components/home/homeIcon.vue'
import searchIcon from './components/home/searchIcon.vue'
require('vue-touch-ripple/component.css')
import VueTouchRipple from 'vue-touch-ripple'
// import VConsole from 'VConsole'
// new VConsole()

Vue.use(VueTouchRipple)
Vue.use(Toast)
Vue.use(VueLazyload)
Vue.use(Navigation, { router, store })
Vue.component('ZHeader', ZHeader)
Vue.component('Icon', Icon)
Vue.component('homeIcon', homeIcon)
Vue.component('searchIcon', searchIcon)

import FastClick from 'fastclick'

// FastClick.attach(document.body)
Vue.config.productionTip = false


Vue.prototype.$toast = (msg) => {
  Vue.$vux.toast.show({
    text: msg,
    position: 'bottom',
    width: 'auto',
    type: 'text'
  })
}

function is_weixn(){  
  var ua = navigator.userAgent.toLowerCase();  
  if(ua.match(/MicroMessenger/i)=="micromessenger") {  
      return true;  
  } else {  
      return false;  
  }  
}  

Vue.prototype.$login = false
Vue.prototype.$isWechat = is_weixn()

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
//拦截路由before操作


router.beforeEach((to, from, next) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.dispatch('changeDirection', 'forward')
    } else {
      store.dispatch('changeDirection', 'back')
    }
  } else {
    store.dispatc
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.dispatch('changeDirection', 'forward')
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.account.uid) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

