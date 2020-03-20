import Vue from 'vue'
import VueRouter from 'vue-router'
import { cachePage } from '@/libs/cachePage';
import { regGlobalComponet } from '@/libs/globalComponets';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  },
  {
    path: '/',
    name: 'home',
    redirect:'/wecome',
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
    children: [
      {
        name: 'wecome',
        path: '/wecome',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/wecome.vue'),
        meta: {
          title: '欢迎',
        }
      },
      {
        path: '/page1',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/page1.vue'),
        meta: {
          title: '页面1',
        }
      },
      {
        path: '/page2',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/page2.vue'),
        meta: {
          title: '页面2',
        }
      },
      {
        path: '/page3',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/page3.vue'),
        meta: {
          title: '页面3',
        }
      },
      {
        path: '/page4',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/page4.vue'),
        meta: {
          title: '页面4',
        }
      },
      {
        path: '/page5',
        component: () => import(/* webpackChunkName: "about" */ '../views/page/page5.vue'),
        meta: {
          title: '页面5',
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, form, next) => {
  var filterPath = ['/login', '/home']
  if(filterPath.includes(to.path)) {
    next();
    return;
  }
  var pathList = cachePage.map(page => page.path);

  if(!pathList.includes(to.path)) {

    // 全局注测组件
    regGlobalComponet(to.path, to.matched[1].components.default);

    // 添加展示页
    cachePage.push(to);
  }
  next()
})
export default router
