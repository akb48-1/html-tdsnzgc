import Vue from 'vue'
import { router } from '@/router'
import { home, err404 } from '@/router/baseRoute'

import { queryMyPermissionRouter } from '@/http';

import lazyLoading from '@/libs/lazyLoading.js';

import store from '@/store'


export function getRoutes(routersData) {
    var routes = [];
    function generateRoutes(data) {
        Array.isArray(data) && data.forEach(route => {
            if (route.children && route.children.length) {
                generateRoutes(route.children)
                return;
            }
            if (route.route_url && route.component_path) {
                routes.push({
                    name: route.name,
                    path: route.route_url,
                    component: lazyLoading(route.component_path),
                    meta: {
                        title: route.title,
                        handle: route.handle_list || []
                    }
                })
            }
        })
    }
    generateRoutes(routersData)
    return routes;
}

// 注册页面组件
export function generateComponent(routersData) {

    Array.isArray(routersData) && routersData.forEach(route => {

        if (route.children && route.children.length) {

            generateComponent(route.children)
            return;
        } else {

            route.route_url && Vue.component(route.route_url.replace('/', '').replace(/\//g, '-'), lazyLoading(route.component_path))

        }

    })
}


// 获取授权菜单
export function getMyMenu() {
    console.log(store)

    setTimeout(() => {
        if (store.state.menuList.length > 0) {
            var menuList = store.getters.menuList

            // 注册页面组件
            generateComponent([...menuList])

            // 生成路由
            var resultRoutes = getRoutes([...menuList])
            home.children = [...home.children, ...resultRoutes]
            router.addRoutes([home, err404])

        } else {
            queryMyPermissionRouter().then(res => {
                // 注册页面组件
                generateComponent([...res.data])

                // 生成路由
                var resultRoutes = getRoutes([...res.data])
                home.children = [...home.children, ...resultRoutes]
                router.addRoutes([home, err404])

                // 存儲菜單
                store.commit('setMenuList', res.data)
            })
        }

    }, 200);
    
}


