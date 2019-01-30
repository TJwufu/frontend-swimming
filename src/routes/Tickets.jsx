/* eslint import/extensions: 0 */
import { SearchBar, NavBar } from 'antd-mobile';
import React, { PropTypes } from 'react';
import {connect} from 'dva';
import {hashHistory} from 'dva/router';
import TicketList from '../components/Ticket/TicketList';
import MemberCardList from '../components/Ticket/MemberCardList';
import CommentList from '../components/Ticket/CommentList';
import styles from './Tickets.less';
import LayoutWithTabBar from '../components/Layout/LayoutWithTabBar';

const Tickets = ({dispatch, pools}) => {
  return (
	  <div>
		  <NavBar
		      style={{backgroundColor: '#108ee9',  width: '100%', top: '0px', zIndex: 9 }}
		      mode="dark"
		      onLeftClick={ () => {
		        hashHistory.goBack();
		      }}
		    >
		  票券信息
		  </NavBar>
	    
	      <div className={styles.card}>
            <img className={styles.card_img} src='http://swimming-1yd.1yd.me/my_advice.png'/>
            <span className={styles.card_word}>优惠票</span>
          </div>
	      <TicketList coupons={pools.currentItem.coupons}/>
	      <div className={styles.card}>
	        <img className={styles.card_img} src='http://swimming-1yd.1yd.me/my_advice.png'/>
	        <span className={styles.card_word}>优惠卡</span>
	      </div>
	      <MemberCardList memberCards={pools.currentItem.memberCards}/>
	      <CommentList/>
	  </div>
  );
};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(Tickets);
