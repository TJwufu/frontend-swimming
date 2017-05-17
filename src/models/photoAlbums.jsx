import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { fetchPhotoAlbum } from '../services/photoAlbumService';

export default {
  namespace: 'photoAlbums',
  state: {
  },

  subscriptions: {
    photoAlbumPage({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/photoAlbum/:poolId').exec(pathname);
        if (match) {
          const poolId = match[1];
          dispatch({
            type: 'fetchPhotoAlbum',
            payload: poolId,
          });
        }
      });
    },
  },

  effects: {
    * fetchPhotoAlbum({ payload: id }, { call, put }) {
      const { data } = yield call(fetchPhotoAlbum, id);
      if (data.data) {
        yield put({
          type: 'showPhotoAlbum',
          payload: {
            data: data.data
          },
        });
      }
    },
  },
  reducers: {
    showPhotoAlbum(state, action) {
      return { ...state, ...action.payload };
    }
  }
}
