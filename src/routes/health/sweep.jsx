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
          <div>
            <img src="//oiu4ewuqq.qnssl.com/swimSweep.png" alt="扫码入场" />
            <Button type="primary" className={styles.btn} onClick={this.goApply}>去申请</Button>
          </div>
        </div>
      </div>
    )
  }
};

export default Sweep;