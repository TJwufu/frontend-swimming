import React, { PropTypes } from 'react';
import { Table, List, InputItem, Switch, Flex, Stepper, Slider, Button, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './Sweep.less';
import request from '../../utils/request';

const baseURL = HOST

class Sweep extends React.Component {
  goApply = () => {
    hashHistory.push('/healthApply')
  }
  showScanQRCode = () => {
    // 微信扫码
    wx.scanQRCode({
      desc: "scanQRCode desc",
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function(res) {
        alert(res)
        // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        // hashHistory.push('/healthCard?'+ result);
      },
      error: function(res) {
        if (res.errMsg.indexOf("function_not_exist") > 0) {
          alert("版本过低请升级");
        }
        console.log(res);
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
          <div className={styles.img}>
            <img src="//oiu4ewuqq.qnssl.com/swimSweep.png" alt="扫码入场" />
          </div>
          <div className={styles.butt}>
            <Button type="primary" className={styles.btn} onClick={this.showScanQRCode}>开始扫描</Button>
          </div>
        </div>
      </div>
    )
  }
};

export default Sweep;