import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { fetchPoolList, fetchPool } from '../services/poolService';

export default {
  namespace: 'pools',
  state: {
	promotions: [],
    dataSource: [],
    currentItem: {
      address: '',
      spName: '',
      idle: '',
      latitude: '',
      fixedNumber: 0,
      spAvatar: '',
      arrivedNumber: 0,
      score: '',
      phone: '',
      temperature: '',
      waterQuality: '',
      serviceTypes: [],
      id: '',
      longitude: '',
      albums: [], // 相册列表
      coachs: [], // 教练列表
      lifeguards: [], // 救生员列表
      waterQualityDetail: {}, // 水质详情
      memberCards: [],	// 会员卡列表
      coupons: [],	// 优惠券列表
    },
    hadMore: true,
    pageNo: 0,
    pageSize: 20,
    total: 0,
    totalPage: 0,
    totalCount: 0,
    swimTypeOne: '001', // 泳馆类型
    isSwitch: false, // 是否切换泳馆类型数据
    typeIndex: 0,	// 泳馆类型selectIndex
  },

  subscriptions: {
    homePage({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/pools' || location.pathname === '/home') {
          dispatch({
            type: 'query',
            payload: {
              pageSize: 20,
              swimTypeOne: '001',
              typeIndex: 0,
              pageNo: 0,
              hadMore: true,
              isSwitch: true,
            }
          });
        }
      });
    },

    poolPage({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const match = pathToRegexp('/pools/:poolId').exec(pathname);
        if (match) {
          const poolId = match[1];
          dispatch({
            type: 'fetchPool',
            payload: poolId,
          });
        }
      });
    },

    poolPageToTicket({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const ticket_match = pathToRegexp('/ticket/:poolId').exec(pathname);
        if (ticket_match) {
          const poolId = ticket_match[1];
          dispatch({
            type: 'fetchPool',
            payload: poolId,
          });
        }
      });
    },
  },

  effects: {
    * query({ payload }, { call, put }) {
      payload.disabled = '0';
      const { data } = yield call(fetchPoolList, parse(payload));
      //console.info(data.data);
      yield put({
        type: 'updateQueryKey',
        payload: { pageNo: 1, ...payload }
      });
      //console.info('data.data:',data.data);
      //if (data.data.dataList && data.data.dataList.length > 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.data.dataList,
            totalCount: data.data.totalCount,
            pageNo: data.data.pageNo,
          },
        });
      //}
    },
    * fetchPool({ payload: id }, { call, put }) {
      const { data } = yield call(fetchPool, id);
      if (data.data) {
        yield put({
          type: 'showPool',
          payload: {
            currentItem: data.data,
          },
        });
      }
    },
    * queryByIsCoupon({ payload }, { call, put }) {
      const { data } = yield call(fetchPoolList, parse(payload));
      if (data.data) {
        yield put({
          type: 'showPoolByIsCoupon',
          payload: {
            promotions: data.data,
          },
        });
      }
    },
    
  },
  reducers: {
    querySuccess(state, action) {
      //console.info('state:',state);
      if (action.payload.data.length > 0 && state.hadMore){
        //console.info('action.payload.data.length', action.payload.data.length);
        //const dataSource = state.dataSource.concat(action.payload.data);
    	const dataSource = (state.isSwitch ? action.payload.data : state.dataSource.concat(action.payload.data));
    	//console.info('dataSource:',dataSource);
        //console.info(dataSource.length, action.payload.totalCount);
        const hadMore = ! (dataSource.length >= action.payload.totalCount);
        const pageNo = action.payload.pageNo;
        //console.info('hadMore', hadMore);
        return { ...state, dataSource, pageNo, hadMore };
      }
      else{
        const hadMore = false;
        const dataSource = [];
        return { ...state ,dataSource , hadMore };
      }
    },
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
