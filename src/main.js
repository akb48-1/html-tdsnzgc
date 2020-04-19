import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'small'});
import { getMyMenu } from '@/libs/generateRoutes'

Vue.component('page', () => import('@/components/page.vue'))
Vue.component('auto-flex', () => import('@/components/auto-flex.vue'))
Vue.component('new-dialog', () => import('@/components/new-dialog.vue'))
Vue.component('new-pagination', () => import('@/components/new-pagination.vue'))


new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // getMyMenu()
  }
}).$mount('#app')
