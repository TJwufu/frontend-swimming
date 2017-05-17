import React from 'react';
import {connect} from 'dva';
import {NavBar} from 'antd-mobile';
import {hashHistory} from 'dva/router';
import styles from './LifeSaver.less';
import {CoachTop} from '../components/Coach'
import  LayoutWithTabBar from '../components/Layout/LayoutWithTabBar';

const LifeSaver = ({dispatch, pools}) => {
  return (
	  <div className={styles.page_container}>
	    <LayoutWithTabBar location={location} title="救生员" hiddenTabBar="true">
	      <CoachTop dataList={pools.currentItem.lifeguards} isLifeSaver={true} />
	    </LayoutWithTabBar>
	
	  </div>
  );
};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(LifeSaver);
