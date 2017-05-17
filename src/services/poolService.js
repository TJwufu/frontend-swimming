import qs from 'qs';
import request from '../utils/request';
/* eslint no-undef: 0 */
const baseURL = HOST;

export async function query(params) {
  return request(`${baseURL}/swim/pools/public?${qs.stringify(params)}`);
}

export async function fetchPoolList(params) {
  return request(`${baseURL}/swim/pools/public?${qs.stringify(params)}`);
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
