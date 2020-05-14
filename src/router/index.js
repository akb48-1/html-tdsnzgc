import Vue from 'vue'
import VueRouter from 'vue-router'
import { cachePage, addCachePage, removeCachePage } from '@/libs/cachePage';
import { getMyMenu } from '@/libs/generateRoutes';
import { deepClone } from '@/util';
import {
  login,
  home,
  pageNum,
  goodsDetail,
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
  // console.log(to)
  if (to.meta.title == null && to.path !== '/login') {
    getMyMenu();
  }

  var filterPath = ['/login', '/home']

  if(filterPath.includes(to.path)) {

    next();

    return;
  }
  
  var pathList = cachePage.map(page => page.path);

  if (!pathList.includes(to.path)) {
      // 添加展示页
      if (to.meta.title) {

        addCachePage(to);
      }
      
  } else {
    var currentPage = cachePage.find(item => 
      item.fullPath === to.fullPath &&
      item.path === to.path &&
      JSON.stringify(item.params) === JSON.stringify(to.params) &&
      JSON.stringify(item.query) === JSON.stringify(to.query)
    )

    if (!currentPage) {
      var index = cachePage.findIndex(item => 
        item.path === to.path
      )
      removeCachePage([cachePage[index].path])
      setTimeout(() => {
        addCachePage(to)
      }, 10);
    }
  }

  // var pathList = cachePage.map(page => ({
  //   fullPath: page.fullPath,
  //   query: page.query,
  //   params: page.params,
  // }));
  // var toPage = pathList.find(item => JSON.stringify(item) === JSON.stringify({
  //   fullPath: to.fullPath,
  //   query: to.query,
  //   params: to.params
  // }))
  // if (!toPage && to.meta.title) {
  //   addCachePage(to);
  // }

    next()

})


export {router};

