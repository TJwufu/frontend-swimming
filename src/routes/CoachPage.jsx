/**
 * Created by ryan on 2017/1/9.
 */
import React from 'react';
import {connect} from 'dva';
import {CoachTop, CoachTrain} from '../components/Coach'
import {NavBar} from 'antd-mobile';
import {hashHistory} from 'dva/router';

const CoachPage = ({dispatch, pools}) => {

  return (
    <div>
      {/*导航栏*/}
      <NavBar
        iconName="left"
        leftContent=''
        style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9}}
        mode="dark"
        onLeftClick={() => {
          hashHistory.goBack();
        }}
      >教练</NavBar>

      {/* content */}
      <div style={{paddingTop: '.8rem'}}>
      	
        <CoachTop dataList={pools.currentItem.coachs} isLifeSaver={false} />
        {/*  <CoachTrain dispatch={dispatch} trainData={pools.currentItem.coachs}/>*/}
      </div>
    </div>
  );
};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(CoachPage);
