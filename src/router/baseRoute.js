import Vue from 'vue'

const login = {
    path: '/login',
    name: 'login',
    component: () =>
        import ( /* webpackChunkName: "login" */ '../views/login')
}

const goodsDetail = {
    meta: {
        title: '商品信息',
    },
    path: '/goods-detail',
    name: 'goods-detail',
    component: () =>
        import ( /* webpackChunkName: "login" */ '@/views/store-manage/goods-detail/index.vue')
}
const bannerDetail = {
    meta: {
        title: '轮播图信息',
    },
    path: '/banner-detail',
    name: 'banner-detail',
    component: () =>
        import ( /* webpackChunkName: "login" */ '@/views/store-manage/banner-detail/index.vue')
}
Vue.component(goodsDetail.path.replace('/', '').replace(/\//g, '-'), goodsDetail.component)
Vue.component(bannerDetail.path.replace('/', '').replace(/\//g, '-'), bannerDetail.component)



const err404 = {
    path: '*',
    component: () =>
        import ('@/views/page/NotFoundPage.vue')
}

const pageNum = {
    path: '/pageNum',
    name: 'pageNum',
    component: () =>
        import ( /* webpackChunkName: "login" */ '@/views/page/pageNum.vue')
}

const home = {
    path: '/',
    name: 'home',
    redirect: '/welcome',
    component: () =>
        import ( /* webpackChunkName: "home" */ '../views/home.vue'),
    children: [
        goodsDetail,
        bannerDetail,
    ]
}



export {
    login,
    home,
    err404,
    pageNum,
    goodsDetail,
    bannerDetail,
}