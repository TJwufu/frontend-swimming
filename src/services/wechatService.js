/**
 * Created by tj on 2017/2/10.
 */
import qs from 'qs';
import request from '../utils/request';
/* eslint no-undef: 0 */
const baseURL = HOST;

export async function fetchTokenByCode(code) {
  return request(`${baseURL}/swim/weixin/userInfo?code=${code}`, {
    method: 'POST',
    headers: {"Content-Type":"application/json"},

  });
}

export async function fetchWXJSConf(params) {
  var tempUrl = `${params['url']}`;
  var deUrl = encodeURIComponent( tempUrl);
  return request(`${baseURL}/swim/weixin/jsconfig?url=`+deUrl);
}
