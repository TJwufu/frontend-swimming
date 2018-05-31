import React, { PropTypes } from 'react';
import { Table, List, InputItem, Switch, Stepper, Slider, Button, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './PersonalInfo.less';

const Item = List.Item;
const Brief = Item.Brief;

const PersonalInfo = ({ pools}) => {
  const {userInfo} = pools;
  return (
	<div className={styles.div_body}>
			
	  <NavBar
	      style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
	      mode="dark"
	      onLeftClick={ () => {
	        hashHistory.goBack();
	      }}
	    >
      我的
    </NavBar>
      <List style={{paddingTop: '.8rem'}}>
        <Item extra={<div className={styles.div_top}><FilletImage width="100px" height="100px" imageUrl={userInfo.headimgurl == ''?"http://oiu42aq9j.bkt.clouddn.com/my_digital.png": userInfo.headimgurl} /></div>}>头像</Item>
        <Item extra={<div>{userInfo.nickname}</div>}>昵称</Item>
        <Item extra={<div></div>}>手机号</Item>
      </List>
   	</div>
)};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(PersonalInfo);
