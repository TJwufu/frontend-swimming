import React, { PropTypes } from 'react';
import { NavBar} from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './Notice.less';
class Notice extends React.Component {
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
          注意事项
        </NavBar>
        <section className={styles.content}>
          <div>
            <h3>泳客须知</h3>
            <p>本证件实行实名制，便于掌握泳客基本健康信息和处理突发事件。填写后可在本市许可开放的游泳场所使用，购买保险者最高可获得30万元理赔。</p>
          </div>
          <div>
            <h3>保险须知</h3>
            <p className={styles.notice}>天安人寿保险股份有限公司保险提示：</p>
            <p className={styles.mgt_2}>感谢你购买《天安人寿游泳者意外伤害险》，请你详细阅读安全理解该产品保险说明，也可致电天安人寿客服热线：4000-555-800或登录：<span className={styles.c_5F91F3}>www.tianan-life.com</span>查询详细保险责任及责任免除，本保险费3.5元整。<span className={styles.c_414141}>（未成年保额不得超过10万。保险自愿）</span></p>
            </div>
            <div>
            <h3>安全须知</h3>
            <div className={styles.dis_flx}>
              <div>1、</div>
              <div>严禁患有发热、腹泻、严重心脏病、高血压、急性传染性结膜炎、化脓性皮肤病、渗出性皮肤病及接触性传染性皮肤病、精神病及有癫痫病史者和酗酒者进入游泳池</div>
            </div>
            <div className={styles.dis_flx}>
              <div>2、</div>
              <div>
                泳前饮食过饱或空腹易造成脑缺氧，心脏负荷加大，易引发突发性心脑疾病请谨慎入场。<br/>
                <span className={styles.mgt_2}>服用了镇静催眠药物者切勿游泳</span>
              </div>
            </div>
            <div className={styles.dis_flx}>
              <div>3、</div>
              <div>为确保池水卫生达标，进水池前需淋浴并赤脚通过消毒禁脚池入场，进入泳池后请佩戴泳帽。</div>
            </div>
            <div className={styles.dis_flx}>
              <div>4、</div>
              <div>下水前进行适当的准备活动，防止入水后手足抽筋或肌肉损伤。</div>
            </div>
            <div className={styles.dis_flx}>
              <div>5、</div>
              <div>如有任何不适，请立即向工作人员示意</div>
            </div>
          </div>
        </section>
      </div>
    )
  }
};

export default Notice;
