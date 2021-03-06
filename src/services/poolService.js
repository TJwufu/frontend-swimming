import qs from 'qs';
import request from '../utils/request';
/* eslint no-undef: 0 */
const baseURL = HOST;

export async function query(params) {
  return request(`${baseURL}/swim/pools/public?${qs.stringify(params)}`);
}

export async function fetchPoolList(params) {
  let isAdminToken = (sessionStorage.getItem('adminToken') != null);
  if(!isAdminToken){
	  return request(`${baseURL}/swim/pools/public?${qs.stringify(params)}`);
  }
  params.t = sessionStorage.getItem('adminToken');
  return request(`${baseURL}/swim/pools/public/token?${qs.stringify(params)}`);
}

export async function fetchPool(id) {
  return request(`${baseURL}/swim/pools/public/${id}`);
}

export async function fetchInfo(id) {
  return request(`${baseURL}/swim/info?id=1`);
}

export async function create(params) {
  return request('/api/pools', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function fetchUserCommentSubmit(params) {
	
//  return request(`${baseURL}/swim/wxComments/newb`, {
//    method: 'post',
//    headers: {
//	      //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//	      'Content-Type': 'application/json;charset=utf-8',
//	},
//    body: params,
//  });
  return request(`${baseURL}/swim/wxComments/new?${qs.stringify(params)}`);
}