/* eslint import/extensions: 0 */
import { SearchBar } from 'antd-mobile';
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
	    <LayoutWithTabBar title="票券预定" style={{display: 'flex', flexDirection: 'column'}} location={location} hiddenTabBar="false" hiddenBackButton="false">
	      <div className={styles.card}>
            <img className={styles.card_img} src='http://oiu42aq9j.bkt.clouddn.com/my_advice.png'/>
            <span className={styles.card_word}>优惠票</span>
          </div>
	      <TicketList coupons={pools.currentItem.coupons}/>
	      <div className={styles.card}>
	        <img className={styles.card_img} src='http://oiu42aq9j.bkt.clouddn.com/my_advice.png'/>
	        <span className={styles.card_word}>优惠卡</span>
	      </div>
	      <MemberCardList memberCards={pools.currentItem.memberCards}/>
	      <CommentList/>
	    </ LayoutWithTabBar >
	  </div>
  );
};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(Tickets);
