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
			hasCard: true
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
        <div>
          <div className={styles.bg_108ee9}>
            <img src="//oiu4ewuqq.qnssl.com/norecord.png" alt="暂无健康卡" />
          </div>
          <div className={styles.pad_3}>
            <div className={styles.card}>
              <div className={styles.dis_row}>
                <div className={styles.flx_l}>
                  <p className={styles.c_108ee9}>卡号：88888888</p>
                  <p className={styles.font_400}>姓名：游泳</p>
                  <div className={styles.font_24}>身份证号<br/>88888888</div>
                  <div className={styles.font_24}>紧急联系电话<br/>18321127878</div>
                </div>
                <div className={styles.flx_r}>
                  <img src="//oiu4ewuqq.qnssl.com/norecord.png" alt="暂无健康卡" />
                </div>
              </div>
              <div>有效期：2018.04.01 ~ 2018.05.01</div>
            </div>
            <div className={styles.font_3}>投诉电话：021-12232341</div>
            <div className={styles.mg_2}>
              <h3>安全须知</h3>
              <div className={styles.dis_flx_row}>
                <div>1、</div>
                <div>严禁患有发热、腹泻、严重心脏病、高血压、急性传染性结膜炎、化脓性皮肤病、渗出性皮肤病及接触性传染性皮肤病、精神病及有癫痫病史者和酗酒者进入游泳池</div>
              </div>
              <div className={styles.dis_flx_row}>
                <div>2、</div>
                <div>
                  泳前饮食过饱或空腹易造成脑缺氧，心脏负荷加大，易引发突发性心脑疾病请谨慎入场。<br/>
                  <span className={styles.mgt_2}>服用了镇静催眠药物者切勿游泳</span>
                </div>
              </div>
              <div className={styles.dis_flx_row}>
                <div>3、</div>
                <div>为确保池水卫生达标，进水池前需淋浴并赤脚通过消毒禁脚池入场，进入泳池后请佩戴泳帽。</div>
              </div>
              <div className={styles.dis_flx_row}>
                <div>4、</div>
                <div>下水前进行适当的准备活动，防止入水后手足抽筋或肌肉损伤。</div>
              </div>
              <div className={styles.dis_flx_row}>
                <div>5、</div>
                <div>如有任何不适，请立即向工作人员示意</div>
              </div>
            </div>
            
          </div>
          
        </div>
      </div>
    )
  }
};

export default HealthCard;