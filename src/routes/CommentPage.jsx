/* eslint import/extensions: 0 */
import { SearchBar, NavBar, WhiteSpace,Flex  } from 'antd-mobile';
import React, { PropTypes } from 'react';
import {connect} from 'dva';
import {hashHistory} from 'dva/router';
import CommentList from '../components/Pools/CommentList';
import styles from './Tickets.less';
import LayoutWithTabBar from '../components/Layout/LayoutWithTabBar';

const CommentPage = ({dispatch, pools}) => {
  const {currentItem} = pools;
  return (
	  <div>
		  <NavBar
	      style={{backgroundColor: '#108ee9', width: '100%', top: '0px', zIndex: 9 }}
	      mode="dark"
	      onLeftClick={ () => {
	        //hashHistory.replace('/pools');
	        hashHistory.goBack();
	      }}
	    >
	      评论详情
	    </NavBar>
	  	<CommentList dataList={currentItem.comments} swimPoolId={currentItem.id}/>
	  </div>
  );
};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(CommentPage);
