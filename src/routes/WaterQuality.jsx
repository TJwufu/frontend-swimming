import { List, TextareaItem, NavBar, Icon, Button, WhiteSpace, Flex } from 'antd-mobile';
import React  from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './WaterQuality.less';

const WaterQuality = ({dispatch, pools}) => {
  const {currentItem} = pools;
  if(currentItem == null){
	  return (<div>未查找到数据</div>);
  }
  const {waterQualityDetail} = currentItem;
  return (
    <div className={styles.normal}>
    {/*导航栏*/}
    <NavBar
      iconName="left"
      leftContent=''
      style={{ backgroundColor: '#108ee9' }}
      mode="dark"
      onLeftClick={() => {
        hashHistory.goBack();
      }}
      rightContent={[<Icon type="export" key={currentItem.id} />]}
    >水质详情</NavBar>

      {/*场馆信息*/}
      <div className={styles.stadium}>
        <img src={currentItem.spAvatar} alt="游泳场所照片"/>

        <div className={styles.sta_text}>

          <div className={styles.sta_name}>
            <span>{currentItem.spName}</span>
          </div>

          <div className={styles.sta_other_info}>
            <span>地址：</span>
            <span>{currentItem.address}</span>
          </div>

          <div className={styles.sta_text_wq}>
            <div>水质</div>
            {/*<img className={styles.sta_text_img} src='http://img.release.1yd.me/Fnq3JmmOan-yAHtJHk-n9-o3Qqbr'/>*/}
            <div className={styles.sta_text_img}>{currentItem.waterQuality}</div>
          </div>
        </div>

      </div>


      <WhiteSpace size="lg" />

      {/*水质信息*/}
      <ul className={styles.water_quality}>
        <strong className={styles.wq_title}>数据详情</strong>

        <div className={styles.line1} />

        <li className={styles.wq_text}>浑浊度：
          <span>{waterQualityDetail.turbidity}</span>
        </li>

        <li className={styles.wq_text}>PH值：
          <span>{waterQualityDetail.ph}</span>
        </li>

        <li className={styles.wq_text}>尿素：
          <span>{waterQualityDetail.urea}</span>
        </li>

        <li className={styles.wq_text}>菌落总数：
          <span>{waterQualityDetail.totalBcterial}</span>
        </li>

        <li className={styles.wq_text}>总大肠菌群：
          <span>{waterQualityDetail.totalDcBcterial}</span>
        </li>

        <li className={styles.wq_text}>游离性余氯：
          <span>{waterQualityDetail.freeCI}</span>
        </li>

        <li className={styles.wq_text}>化合性余氯：
          <span>{waterQualityDetail.combinationCI}</span>
        </li>

        <li className={styles.wq_text}>臭氧：
          <span>{waterQualityDetail.ozone}</span>
        </li>

        <li className={styles.wq_text}>水温：
          <span>{waterQualityDetail.temperature} &#8451;</span>
        </li>
      </ul>

    </div>
  )
};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(WaterQuality);

