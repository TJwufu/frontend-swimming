import React, { PropTypes } from 'react';
import { Table, List, InputItem, Switch, Flex, Stepper, Slider, Button, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './Sweep.less';
import request from '../../utils/request';

const baseURL = HOST
const faceURL = FACE

class Sweep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      sourseUrl: '//swimming-1yd.1yd.me/swimSweep.png'
	};
  }
  goApply = () => {
    hashHistory.push('/healthApply')
  }
  showCamera = () => {
	  let that = this
	  wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            var localIds = res.localIds || []; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//            if(localIds.length >= 1){
//              that.setState({sourseUrl: localIds[0]})
//            } 
            console.log('sourseUrl: localIds'+ localIds)
            wx.uploadImage({
                localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success: function (res) {
                	console.log('uploadImage: res'+ res)
                    var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
                    let uploadReq = '{"mediaId": "'+mediaId+'"}'
                    //将获取到的 mediaId 传入后台 方法savePicture
                    request(`${baseURL}/swim/weixin/upload/media`,{
	                    method: 'POST',
	                    headers: {
	                      'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
	                      'Content-Type': 'application/json'
	                    },
	                    body: uploadReq
	                  }).then((res)=>{
	                    console.log(res)
	                    if(res.data.success == 'T'){
//		                  Toast.loading('正在匹配人脸识别信息...')
	                      that.setState({sourseUrl: res.data.data.imageUrl})
	                      let faceReq = '{"images": "'+res.data.data.imageUrl+'", "imageType":"URL", "groupIdList":"0cdef1d98d6311e78ebc0242ac110045"}'
	                      request(`${faceURL}/faces/api/search/0cdef1d98d6311e78ebc0242ac110045`,{
		                    method: 'POST',
		                    headers: {
		                      'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
		                      'Content-Type': 'application/json'
		                    },
		                    body: faceReq
		                  }).then((res)=>{
		                	  if(res.data.success == 'T' && res.data.data.result && res.data.data.result.user_list){
		                		  if(res.data.data.result.user_list.length > 0){
			                		  let cardId = res.data.data.result.user_list[0].user_id
			                		  hashHistory.push('/sweepCard/'+ cardId);
			                		  return;
		                		  }
		                	  }
		                	  Toast.fail('人脸识别未通过，请重试')
		                  });
	                    }else {
	                    	that.setState({sourseUrl: '//swimming-1yd.1yd.me/swimSweep.png'})
	                    }
	                  });
                },
                fail: function (res) {
                	Toast.fail('上传图片失败，请重试')
                    that.setState({sourseUrl: '//swimming-1yd.1yd.me/swimSweep.png'})
                }
            }); 
        }
    });
  }
  showScanQRCode = () => {
    // 微信扫码
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function(res) {
        if (res.resultStr.split(':')[0] == 'SWFC') {
          hashHistory.push('/sweepCard/'+ res.resultStr.split(':')[1]);
        } else {
          Toast.fail('您扫描的二维码有误');
          return;
        }
      },
      error: function(res) {
        if (res.errMsg.indexOf("function_not_exist") > 0) {
          alert("版本过低请升级");
        }
      }
    });
  }
  render() {
    return (
      <div className={styles.container}>
        <NavBar
          style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
          mode="dark"
          onLeftClick={ () => {
            hashHistory.goBack();
          }}
        >
          扫码入场
        </NavBar>
        <div className={styles.dis_flx}>
          <div className={styles.pad_108}>
            <img src={this.state.sourseUrl} alt="扫码入场" />
          </div>
          <div className={styles.butt}>
            <Button type="primary" className={styles.btn} onClick={this.showScanQRCode}>开始扫描</Button>
          </div>
          <div className={styles.butt}>
	        <Button type="primary" className={styles.btn} onClick={this.showCamera}>人脸识别</Button>
	      </div>
        </div>
      </div>
    )
  }
};

export default Sweep;