import { List, TextareaItem, NavBar, Icon, Button, WhiteSpace, Toast } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import React, { PropTypes } from 'react';
import styles from './Feedback.less';

const Feedback = () => {
  return (
    <div className={styles.normal}>
      <NavBar
        leftContent=""
        style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 10 }}
        mode="dark"
        onLeftClick={() => { hashHistory.goBack(); }}
        rightContent={<Button className={styles.nav_right_item}  activeStyle={false} onClick={()=>{Toast.info("提交成功")}} >提交</Button>}
      >
        意见反馈
      </NavBar>

      <div className={styles.input_frame} style={{paddingTop: '.8rem'}}>
        <TextareaItem
          placeholder="留下你宝贵的小意见吧"
          rows={7}
        />
      </div>
    </div>
  )
};

Feedback.propTypes = {

};

export default Feedback;

