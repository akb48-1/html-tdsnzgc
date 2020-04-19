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

// 获取角色
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

