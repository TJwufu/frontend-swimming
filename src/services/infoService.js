import qs from 'qs';
import request from '../utils/request';
/* eslint no-undef: 0 */
const baseURL = HOST;

export async function fetchInfo(type) {
  return request(`${baseURL}/swim/informationes/public/type/${type}`);
}

export async function fetchNewsDetail(id) {
  return request(`${baseURL}/swim/informationes/public/${id}`);
}

