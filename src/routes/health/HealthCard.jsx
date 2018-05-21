import React, { PropTypes } from 'react';
import { Table, List, InputItem, Switch, Flex, Stepper, Slider, Button, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './HealthCard.less';
class HealthCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			hasCard: null
		};
  }
  goApply = () => {
    hashHistory.push('/healthApply')
  }
  render() {
    const hasCard = this.state.hasCard;
    let contHtml = null;
    if (!hasCard) {
      contHtml = <div className={styles.dis_flx}>
                  <div>
                    <img src="//oiu4ewuqq.qnssl.com/norecord.png" alt="暂无健康卡" />
                    <div className={styles.font_30}>你还没有健康卡哦~~</div>
                    <Button type="ghost" className={styles.btn} onClick={this.goApply}>去申请</Button>
                  </div>
                </div>
    } else {
      contHtml = <div className={styles.dis_flx}>
                  <div>
                    <img src="//oiu4ewuqq.qnssl.com/norecord.png" alt="暂无健康卡" />
                    <div className={styles.font_30}>健康卡哦~~</div>
                    <Button type="ghost" className={styles.btn}>去申请</Button>
                  </div>
                </div>
    }
    return (
      <div className={styles.container}>
        <NavBar
          style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
          mode="dark"
          onLeftClick={ () => {
            hashHistory.goBack();
          }}
        >
          我的健康卡
        </NavBar>
        {contHtml}
      </div>
    )
  }
};

export default HealthCard;