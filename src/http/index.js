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