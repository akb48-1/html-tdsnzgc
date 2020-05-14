import Vue from 'vue'

const login = {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
}

const goodsDetail = {
    meta: {
        title: '商品信息',
    },
    path: '/goods-detail',
    name: 'goods-detail',
    component: () => import(/* webpackChunkName: "login" */ '@/views/goods-manage/goods-detail/index.vue')
}
Vue.component(goodsDetail.path.replace('/', '').replace(/\//g, '-'), goodsDetail.component)



const err404 = {
    path: '*', 
    component: () => import('@/views/page/NotFoundPage.vue')
}

const pageNum = {
    path: '/pageNum',
    name: 'pageNum',
    component: () => import(/* webpackChunkName: "login" */ '@/views/page/pageNum.vue')
}

const home = {
    path: '/',
    name: 'home',
    redirect: '/welcome',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
    children: [
        goodsDetail,
    ]
}



export {
    login,
    home,
    err404,
    pageNum,
    goodsDetail
}