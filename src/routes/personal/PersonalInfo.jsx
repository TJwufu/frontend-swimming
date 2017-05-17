import React from 'react';
import { Table, List, InputItem, Switch, Stepper, Slider, Button, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import FilletImage from '../../components/Common/FilletImage';
import styles from './PersonalInfo.less';

const Item = List.Item;
const Brief = Item.Brief;

const PersonalInfo = () => {
  {/* get请求数据 */}
  const personalObj = {
  	name:"",
  	phone:"",
  	//imageUrl: "http://img.release.1yd.me/Fnq3JmmOan-yAHtJHk-n9-o3Qqbr"
  	imageUrl: "http://oiu42aq9j.bkt.clouddn.com/my_digital.png"
  };

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
        <Item extra={<div className={styles.div_top}><FilletImage width="100px" height="100px" imageUrl={personalObj.imageUrl} /></div>}>头像</Item>
        <Item extra={<div>{personalObj.name}</div>}>昵称</Item>
        <Item extra={<div>{personalObj.phone}</div>}>手机号</Item>
        <Item extra={<div>修改</div>}>登录密码</Item>
      </List>
   	</div>
)};

export default PersonalInfo;
