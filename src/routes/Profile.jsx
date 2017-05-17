/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './Profile.less';
import { Link } from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;

const Profile = React.createClass({
  render() {
    return (
      <div style={{height: 'auto', paddingTop: '0.8rem'}}>
        <section className={styles.item}>
          <header>
          	<Link to={'personalInfo'}>
          		<img src="http://oiu42aq9j.bkt.clouddn.com/my_digital.png" alt="" />
          	</Link>
          </header>
          <div className={styles.my_name}></div>
          <nav className={styles.navList}>
            <ul>
              <li>
                <span>0</span>
                <span>泳券</span>
              </li>
              <li>
                <span>0</span>
                <span>收藏</span>
              </li>
              <li className={styles.nb}>
                <span>0</span>
                <span>关注</span>
              </li>
            </ul>
          </nav>
        </section>
        <section>
          <List>
          	<Link to={'personalInfo'}>
	            <Item
	              thumb="http://oiu42aq9j.bkt.clouddn.com/my_info.png"
	              arrow="horizontal"
	              onClick={() => {}}
	            ><span className={styles.nameList}>我的资料</span></Item>
            </Link>
          </List>
          <List>
            <Item
              thumb="http://oiu42aq9j.bkt.clouddn.com/my_activity.png"
              arrow="horizontal"
              onClick={() => {}}
            ><span className={styles.nameList}>我的活动</span></Item>
          </List>
          <List>
            <Item
              thumb="http://oiu42aq9j.bkt.clouddn.com/my_order.png"
              arrow="horizontal"
              onClick={() => {}}
            ><span className={styles.nameList}>我的订单</span></Item>
          </List>
          <List>
            <Item
              thumb="http://oiu42aq9j.bkt.clouddn.com/my_card.png"
              arrow="horizontal"
              onClick={() => {}}
            ><span className={styles.nameList}>我的健康卡</span></Item>
          </List>
        </section>
        <section className={styles.contact}>
          <List>
            <Item
              thumb="http://oiu42aq9j.bkt.clouddn.com/my_treaty.png"
              onClick={() => {}}
            ><span className={styles.nameList}>服务条款</span></Item>
          </List>
          <List>
            <Link to='fb'>
            <Item
              thumb="http://oiu42aq9j.bkt.clouddn.com/my_advice.png"
              arrow="horizontal"
            ><span className={styles.nameList}>意见建议</span></Item>
            </Link>
          </List>
          <List>
            <Item className={styles.phone}
              extra=""
              thumb="http://oiu42aq9j.bkt.clouddn.com/my_tel.png"
              arrow="horizontal"
              onClick={() => {}}
            ><span className={styles.nameList}>咨询电话</span></Item>
          </List>
        </section>
      </div>);
  },
});

Profile.propTypes = {

};

export default Profile;
