import {parse} from 'qs';
import {fetchTokenByCode,fetchWXJSConf} from '../services/wechatService';
import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';



export default {
  namespace: 'wechatInfo',
  state: {

  },
  subscriptions: {

    urlChange({ dispatch, history }) {

      //监听路径变化
      return history.listen(location => {

        var pathname = location.pathname;
        //匹配特定的路径 可替换需要调用 JSSDK
        const ticket_match = pathToRegexp('/wxxx').exec(pathname);
        if (ticket_match) {
          //当前全路径
          const location1 = window.location.href;

          //触发  fetchWXJSConf
          dispatch({
            type: 'fetchWXJSConf',
            payload: {'url':location1},
          });
        }
        }
      );
    },

  },
  effects: {

    * fetchTokenByCode({payload: payload}, {call, put}) {

      const {err, data} = yield call(fetchTokenByCode, payload);

      if (err) {

      } else if (data && data.openid) {
        console.log('data  |||| '+ data.openid);
        yield put({
          type: 'saveToken',
          payload: data
        });
      } else {
          console.inifo("失败，系统异常.");
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
            'scanQRCode'
          ]
        };




        //config接口注入权限验证配置
        window.wx.config(jssdkConfig);

        //jssdk调用成功的返回,回调函数里面就可以调用各个api了
        window.wx.ready(() => {

          //微信配置鉴定失败也会走此方法

          //alert("配置准备成功");

          //调用定位

          window.wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度

              //缓存经纬度
              //alert(latitude + ' ' + longitude);

              //alert("跳转");
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



  }
}
