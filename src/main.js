import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from 'components/common/toast'

Vue.config.productionTip = false;

// 事件总线 跨组件之间进行通信
Vue.prototype.$bus = new Vue();

Vue.use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
