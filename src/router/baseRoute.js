const login = {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
}


const home = {
    path: '/',
    name: 'home',
    redirect: '/welcome',
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
    children: []
}

const err404 = {
    path: '*', 
    component: () => import('@/views/page/NotFoundPage.vue')
}

const pageNum = {
    path: '/pageNum',
    name: 'pageNum',
    component: () => import(/* webpackChunkName: "login" */ '@/views/page/pageNum.vue')
}



export {
    login,
    home,
    err404,
    pageNum
}