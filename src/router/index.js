import Vue from 'vue'
import VueRouter from 'vue-router'
import { cachePage, addCachePage } from '@/libs/cachePage';
import { getMyMenu } from '@/libs/generateRoutes';
import {
  login,
  home,
  pageNum
} from './baseRoute'

Vue.use(VueRouter)



const routes = [login, home, pageNum]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 路由鈎子
router.beforeEach((to, form, next) => {

  // 刷新頁面重新獲取菜單
  if (to.meta.title == null) {
    getMyMenu();
  }

  var filterPath = ['/login', '/home']

  if(filterPath.includes(to.path)) {

    next();

    return;
  }

  var pathList = cachePage.map(page => page.path);

  if(!pathList.includes(to.path)) {
      // 添加展示页
      if (to.meta.title) {

        addCachePage(to);

      }
      
  }

  next()

})


export {router};

