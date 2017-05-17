import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import InfoItem from '../components/info/InfoItem';
import styles from './NewsDetails.less';

const NewsDetails = ({ location, dispatch, infos }) => {
  const {currentItem} = infos;
  return (
	  <div className={styles.page_contral}>
	    <NavBar
	      iconName="left"
	      leftContent=""
	      style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 10 }}
	      mode="dark"
	      onLeftClick={() => { hashHistory.goBack(); }}
	    >
	      资讯详情
	    </NavBar>
	    <div className={styles.secondDiv} style={{paddingTop:'.9rem'}}>
	      <div className={styles.title}>{currentItem.title}</div>
	      <div className={styles.timeText}>{currentItem.issuingTime}</div>
	      <div className={styles.picDiv}><img className={styles.pic} src={currentItem.topImageUrl} alt="" /></div>
	      <div className={styles.content} dangerouslySetInnerHTML={{__html: currentItem.content}} />
	    </div>
	  </div>
  )
};

const mapStateToProps = ({ infos }) => ({ infos });
export default connect(mapStateToProps)(NewsDetails);