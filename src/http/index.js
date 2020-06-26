import axios from './axios';
import qs from 'qs';

/* 登录 */
export function toLogin(params = {}) {
    return axios({
        method: 'post',
        url: '/toLogin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(params)
    });
}

export function readCommon(params = {}) {
    return axios({
        method: 'get',
        url: '/readCommon'
    });
}

// 获取路由列表
export function queryMyPermissionRouter() {
    return axios({
        method: 'post',
        url: '/menu/queryMyPermissionRouter'
    });
}

// 获取权限列表
export function queryAllPermissionMenu() {
    return axios({
        method: 'post',
        url: '/menu/queryAllPermissionMenu'
    });
}

// 角色分页
export function queryRoleByPage(params = {}) {
    return axios({
        method: 'post',
        url: '/role/queryByPage',
        data: params
    });
}

// 角色详情
export function queryRoleById(role_id) {
    return axios({
        method: 'post',
        url: `/role/queryById/${role_id}`
    });
}

// 添加角色
export function addRole(params = {}) {
    return axios({
        method: 'post',
        url: '/role/addRole',
        data: params
    });
}

// 删除角色
export function deleteRole(id) {
    return axios({
        method: 'post',
        url: `/role/deleteRole/${id}`
    });
}

// 修改角色
export function updateRole(params = {}) {
    return axios({
        method: 'post',
        url: '/role/updateRole',
        data: params
    });
}

// 通过角色查已用权限
export function queryUsingPermissionByRoleId(role_id, params = {}) {
    return axios({
        method: 'post',
        url: `/permission/queryUsingPermissionByRoleId/${role_id}`,
        data: params
    });
}

// 通过角色查未用权限
export function queryUnUsingPermissionByRoleId(role_id, params = {}) {
    return axios({
        method: 'post',
        url: `/permission/queryUnUsingPermissionByRoleId/${role_id}`,
        data: params
    });
}

// 角色移除权限
export function removePermissionByRoleId(role_id, permission_id) {
    return axios({
        method: 'post',
        url: `/role/removePermission/${role_id}/${permission_id}`
    });
}

// 角色添加权限
export function addPermissionByRoleId(role_id, permission_id) {
    return axios({
        method: 'post',
        url: `/role/addPermission/${role_id}/${permission_id}`
    });
}


// 机构分页
export function queryOrganByPage(params = {}) {
    return axios({
        method: 'post',
        url: '/organ/queryByPage',
        data: params
    });
}

// 机构详情
export function queryOrganById(organ_id) {
    return axios({
        method: 'post',
        url: `/organ/queryById/${organ_id}`
    });
}

// 添加机构
export function addOrgan(params = {}) {
    return axios({
        method: 'post',
        url: '/organ/addOrgan',
        data: params
    });
}


// 修改机构
export function updateOrgan(params = {}) {
    return axios({
        method: 'post',
        url: '/organ/updateOrgan',
        data: params
    });
}

// 我的机构信息
export function queryMyOrgan() {
    return axios({
        method: 'post',
        url: '/organ/queryMyOrgan',
    });
}


// 所有单位信息
export function queryAllUnit() {
    return axios({
        method: 'post',
        url: '/unit/queryAll',
    });
}

// 单位分页
export function queryUnitByPage(params = {}) {
    return axios({
        method: 'post',
        url: '/unit/queryByPage',
        data: params
    });
}

// 新增单位
export function addUnit(params = {}) {
    return axios({
        method: 'post',
        url: '/unit/addUnit',
        data: params
    });
}


// 所有分类信息
export function queryAllClassify() {
    return axios({
        method: 'post',
        url: '/classify/queryAll',
    });
}

// 单位分页
export function queryClassifyByPage(params = {}) {
    return axios({
        method: 'post',
        url: '/classify/queryByPage',
        data: params
    });
}

// 新增分类
export function addClassify(params = {}) {
    return axios({
        method: 'post',
        url: '/classify/addClassify',
        data: params
    });
}

// 修改分类
export function updateClassify(params = {}) {
    return axios({
        method: 'post',
        url: '/classify/updateClassify',
        data: params
    });
}



// 查商品详情
export function queryGoods(goods_id) {
    return axios({
        method: 'post',
        url: `/goods/queryById/${goods_id}`
    });
}

// 商品分页
export function queryGoodsByPage(params = {}) {
    return axios({
        method: 'post',
        url: '/goods/queryByPage',
        data: params
    });
}

// 新增商品
export function addGoods(params = {}) {
    return axios({
        method: 'post',
        url: '/goods/addGoods',
        data: params
    });
}


// 更新商品详情
export function updateGoods(params = {}) {
    return axios({
        method: 'post',
        url: '/goods/updateGoods',
        data: params
    });
}

// 文件上传
export function fileUpload(params = {}) {
    return axios({
        method: 'post',
        url: '/fileUpload',
        data: params
    });
}


// 查轮播图详情
export function queryBanner(banner_id) {
    return axios({
        method: 'post',
        url: `/banner/queryById/${banner_id}`
    });
}

// 轮播图分页
export function queryBannerByPage(params = {}) {
    return axios({
        method: 'post',
        url: '/banner/queryByPage',
        data: params
    });
}

// 新增轮播图
export function addBanner(params = {}) {
    return axios({
        method: 'post',
        url: '/banner/addBanner',
        data: params
    });
}


// 更新轮播图详情
export function updateBanner(params = {}) {
    return axios({
        method: 'post',
        url: '/banner/updateBanner',
        data: params
    });
}

// 删除轮播图
export function deleteBanner(banner_id) {
    return axios({
        method: 'post',
        url: `/banner/deleteBanner/${banner_id}`
    });
}

// 订单报表
export function queryOrderReport(params = {}) {
    return axios({
        method: 'post',
        url: '/report/queryOrderReport',
        data: params
    });
}