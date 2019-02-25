import { parse } from 'qs';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { fetchPoolList, fetchPool, fetchUserCommentSubmit } from '../services/poolService';
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
      waterAcreage: '',
      serviceTypes: [],
      id: '',
      longitude: '',
      albums: [], // 相册列表
      coachs: [], // 教练列表
      lifeguards: [], // 救生员列表
      waterQualityDetail: {}, // 水质详情
      memberCards: [],	// 会员卡列表
      coupons: [],	// 优惠券列表
      ponds: [], // 泳池列表
      comments: [], // 用户评论列表
    },
    hadMore: true,
    pageNo: 0,
    pageSize: 9000,
    total: 0,
    totalPage: 0,
    totalCount: 0,
    swimTypeOne: '', // 泳馆类型
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
    orderFlag: '1',	// 排序标识
    sereviceTypeStr: '', //提供服务类型
    spNameOrAddress: '',
    spNameOrAddressB: '',
    queryParam:{
    	qSwimTypeOne:'',
    	qAreaRegion:'',
    	qOrderFlag:'',
    },
    reqDataParam:{
    	token: '',		// token
    	roleLevel: '',   // 角色级别
    	nickName: '',	// 登录用户昵称
    	reqSwimPool: null,	 // 游泳场所对象
    },

  },

  subscriptions: {
    homePage({ dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/pools' || location.pathname === '/home') {
          //console.info("latitude:",window.app._models[1].state.latitude,"longitude:",window.app._models[1].state.longitude);
          //console.info("pools page window.app._models[1].state.qParam",window.app._models[1].state.qParam);
          var qParam = window.app._models[1].state.qParam;
          dispatch({
            type: 'query',
            payload: qParam != null? qParam: {
              pageSize: 9000,
              swimTypeOne: '',
              areaRegion: '',
              spNameOrAddress: '',
              orderFlag: '',
              typeIndex: 0,
              pageNo: 0,
              hadMore: true,
              isSwitch: true,
            }
          });
        }else if(pathToRegexp('/wx').exec(location.pathname) || pathToRegexp('/loginToSweep').exec(location.pathname)){
        	//alert("pool wx...:"+window.location.href);
        	//当前全路径
            const location1 = window.location.href;
            //触发  fetchWXJSConf
            dispatch({
              type: 'fetchWXJSConf',
              payload: {'url':location1, 'locationPathname':  location.pathname},
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
		window.app._models[1].state.userInfo = data.data;
		if(window.sessionStorage){
		    sessionStorage.setItem('userInfo', JSON.stringify(data.data));
		    sessionStorage.setItem('userToken', data.data.token);
		    sessionStorage.setItem('reloadFlag', "0");
			sessionStorage.removeItem('adminToken');
		}
		//alert(window.app._models[1].state.userInfo);
		//console.info("fetchTokenByCode:",payload.userInfo);
		yield put({
		  type: 'updateQueryKey',
		  payload: { pageNo: 1, ...payload }
		});
	},
    * query({ payload }, { call, put }) {
      payload.disabled = '0';
//      payload.longitude = window.app._models[1].state.longitude;
//      payload.latitude = window.app._models[1].state.latitude;
      if(window.sessionStorage){
    	payload.longitude = sessionStorage.getItem('longitude');
        payload.latitude = sessionStorage.getItem('latitude');
      }
      if(payload.longitude == '' || payload.latitude == ''){
	      payload.longitude = "121.5137";
	      payload.latitude = "31.30293";  
      }
      // 记录全局变量：检索条件
      window.app._models[1].state.qParam = payload;
      //console.info("window.app._models[1].state.qParam",payload);
      const { data } = yield call(fetchPoolList, parse(payload));
      //console.info(data.data);
      //console.info("updateQueryKey:",payload);
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
      //console.log("queryByIsCoupon data:",data);
      yield put({
	      type: 'updateQueryKey',
	      payload: { pageNo: 1, ...payload }
	    });

      payload.spNameOrAddress = payload.spNameOrAddressB;
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
    

    //获取 微信 jssdk 配置
    * fetchWXJSConf({payload: payload}, {call, put}) {
      let locationPathname = payload.locationPathname
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
            'getLocation', 'scanQRCode',
            'chooseImage',//拍照或从手机相册中选图接口
            'previewImage',//预览图片接口
            'uploadImage',//上传图片接口
            'downloadImage'//下载图片接口
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
              if(window.sessionStorage){
                sessionStorage.setItem('latitude', latitude);
                sessionStorage.setItem('longitude', longitude);
              }
              //缓存经纬度
              //console.info(latitude + ' ' + longitude);
              let toPathname = '/pools';
              if(pathToRegexp('/loginToSweep').exec(locationPathname)){
            	  toPathname = '/login?toPage=sweep';
              }
              window.app._store.dispatch(routerRedux.push({
                pathname: toPathname,
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
    },

    * userCommentSubmit({ payload }, { call, put }) {
      const { data } = yield call(fetchUserCommentSubmit, parse(payload));
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
