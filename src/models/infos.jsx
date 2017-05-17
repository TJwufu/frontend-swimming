import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { fetchInfo,fetchNewsDetail } from '../services/infoService';

export default {
  namespace: 'infos',
  state: {
	dataSource: [],
	currentItem: {},
    uid: "all",
    loading: false,
    hadMore: true,
    pageNo: 1,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    totalCount: 0
  },
  subscriptions: {
    infoPage({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/info').exec(pathname);
        if (match) {
          dispatch({
            type: 'fetchInfo',
            payload: 1
          });
        }
      });
    },

    newsDetailPage({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/news/:newsId').exec(pathname);
        if (match) {
          const newsId = match[1];
          dispatch({
            type: 'fetchNewsDetail',
            reqId: newsId,
          });
        }
      });
    },
  },
  effects: {
    * fetchInfo({ infoType: infoType }, { call, put }) {
      const showLoading = yield put({ type: 'showLoading' });
      const { data } = yield call(fetchInfo, infoType);
      if (data.data) {
        yield put({
          type: 'showInfo',
          payload: {
        	dataSource: data.data,
            infoType: infoType
          },
        });
      }
    },
    
    * fetchNewsDetail({ reqId: newsId }, { call, put }) {
	    const { data } = yield call(fetchNewsDetail, newsId);
	    if (data.data) {
	      yield put({
	        type: 'showNewsDetail',
	        payload: {
	          currentItem: data.data
	        },
	      });
	    }
	    console.info(data);
	  }
    
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    showInfo(state, action) {
        return { ...state, ...action.payload };
    },
    showNewsDetail(state, action) {
        return { ...state, ...action.payload };
    }
  }
}
