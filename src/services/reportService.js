import qs from 'qs';
import request from '../utils/request';
/* eslint no-undef: 0 */
const baseURL = HOST;

export async function getRoleLevel(params) {
  let isAdminToken = (sessionStorage.getItem('adminToken') != null);
  params.t = sessionStorage.getItem('adminToken');
  return request(`${baseURL}/swim/userRelations/get/roleLevel?${qs.stringify(params)}`);
}

export async function getCurrentPool(params) {
  let isAdminToken = (sessionStorage.getItem('adminToken') != null);
  params.t = sessionStorage.getItem('adminToken');
  return request(`${baseURL}/swim/userRelations/get?${qs.stringify(params)}`);
}