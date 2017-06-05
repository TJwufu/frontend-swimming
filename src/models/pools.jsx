import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { fetchPoolList, fetchPool } from '../services/poolService';
import {fetchTokenByCode,fetchWXJSConf} from '../services/wechatService';

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
    pageSize: 900,
    total: 0,
    totalPage: 0,
    totalCount: 0,
    swimTypeOne: '001', // 泳馆类型
    areaRegion: '',	// 区域
    isSwitch: false, // 是否切换泳馆类型数据
    typeIndex: 0,	// 泳馆类型selectIndex
    code: '',	// 微信code
    longitude: '',	// 用户当前位置：经度
    latitude: '',	// 用户当前位置：纬度
    userInfo:{	// 微信用户信息
    	city: '',
    	country: '',
    	groupid: '',
    	headimgurl: '',	//头像
    	language: '',
    	nickname: '',	//昵称
    	openid: '',
    	privilege: [],
    	province: '',
    	remark: '',
    	sex: '',
    	subscribe: '',
    	subscribe_time: '',
    	unionid: '',
    },
    orderFlag: '',	// 排序标识
  },

  subscriptions: {
    homePage({ dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/pools' || location.pathname === '/home') {
          //console.info("latitude:",window.app._models[1].state.latitude,"longitude:",window.app._models[1].state.longitude);
          dispatch({
            type: 'query',
            payload: {
              pageSize: 900,
              swimTypeOne: '001',
              areaRegion: '',
              typeIndex: 0,
              pageNo: 0,
              hadMore: true,
              isSwitch: true,
            }
          });
        }else if(pathToRegexp('/wx').exec(location.pathname)){
        	//alert("pool wx...:"+window.location.href);
        	//当前全路径
            const location1 = window.location.href;
            //触发  fetchWXJSConf
            dispatch({
              type: 'fetchWXJSConf',
              payload: {'url':location1},
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
	* fetchTokenByCode({ payload }, { call, put }) {
		const { data } = yield call(fetchTokenByCode, payload.code);
		payload.userInfo = data.data;
		console.info("fetchTokenByCode:",payload.userInfo);
		yield put({
		  type: 'updateQueryKey',
		  payload: { pageNo: 1, ...payload }
		});
	},
    * query({ payload }, { call, put }) {
      payload.disabled = '0';
      payload.longitude = window.app._models[1].state.longitude;
      payload.latitude = window.app._models[1].state.latitude;
      if(payload.longitude == '' || payload.latitude == ''){
	      payload.longitude = "121.5137";
	      payload.latitude = "31.30293";  
      }
      //alert(payload.longitude +","+ payload.latitude);
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
      //console.log("queryByIsCoupon data:",data);
      if (data.data) {
        yield put({
          type: 'showPoolByIsCoupon',
          payload: {
            promotions: data.data,
          },
        });
      }
    },
    

    //获取 微信 jssdk 配置
    * fetchWXJSConf({payload: payload}, {call, put}) {
      const {err, data} = yield call(fetchWXJSConf, payload);
      console.log('data  '+ data);
      if (err) {
        console.log('data  '+ err);

      } else if (data && data.data) {
        let jssdkConfig = {
          debug: false,
          appId: data.data.app_id,
          timestamp: data.data.timestamp,
          nonceStr: data.data.nonceStr,
          signature: data.data.signature,
          jsApiList: [
            'getLocation',
          ]
        };
        
        //config接口注入权限验证配置
        window.wx.config(jssdkConfig);
        var aa = '';
        var bb = '';
        //jssdk调用成功的返回,回调函数里面就可以调用各个api了
        window.wx.ready(() => {
          window.wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度

              // set state
              window.app._models[1].state.latitude = latitude;
              window.app._models[1].state.longitude = longitude;
              //缓存经纬度
              //console.info(latitude + ' ' + longitude);
              window.app._store.dispatch(routerRedux.push({
                pathname: '/pools',
                query: {  },
              }));
            },
            fail: function(res){
                window.app._store.dispatch(routerRedux.push({
                  pathname: '/pools',
                  query: {  },
                }));
            },
          });

        });
      } else {
        console.inifo("失败，系统异常.");
      }
    }
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
