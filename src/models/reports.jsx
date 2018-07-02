import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { getRoleLevel, getCurrentPool } from '../services/reportService';

export default {
  namespace: 'reports',
  state: {
  	token: '',		// token
	roleLevel: '',   // 角色级别
	nickName: '',	// 登录用户昵称
  	reqSwimPool: null,	 // 游泳场所对象
  },

  subscriptions: {
    homePage({ dispatch, history}) {
      history.listen((location) => {
    	  if (location.pathname === '/dateReport') {
	          dispatch({
	            type: 'fetchGetRoleLevel',
	            payload: {},
	          });
	        }
      });
    },
  },

  effects: {
	* fetchGetRoleLevel({ payload }, { call, put }) {
		const { data } = yield call(getRoleLevel, payload);
		if(data.data.roleLevel == '03'){
			const reqSwimPool = yield call(getCurrentPool, payload);
			data.data.reqSwimPool = reqSwimPool.data.data;
		}
		yield put({
		  type: 'updateQueryKey',
		  payload: { ...data.data }
		});
		
	},
  },
  reducers: {
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
    showPool(state, action) {
      return { ...state, ...action.payload };
    },
    showPoolByIsCoupon(state, action) {
      return { ...state, ...action.payload };
    }
  }
}
