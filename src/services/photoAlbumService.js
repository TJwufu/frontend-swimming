import qs from 'qs';
import request from '../utils/request';
/* eslint no-undef: 0 */
const baseURL = HOST;

export async function fetchPhotoAlbum(poolId) {
  return request(`${baseURL}/swim/albums/public/${poolId}`);
}
