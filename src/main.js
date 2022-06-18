import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'
import http from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

// 导航守卫
router.beforeEach((to, from, next) => {
  // 调用store中的token，目的防止页面刷新之后丢失我们的token信息
  store.commit('getToken')
  // 拿到store中的token
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  }else if (token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  // 为了解决页面刷新出现白屏
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
