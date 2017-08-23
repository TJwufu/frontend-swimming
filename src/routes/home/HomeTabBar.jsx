/* eslint import/extensions: 0 */
import React, {PropTypes} from 'react';
import {TabBar, NavBar} from 'antd-mobile';
import {hashHistory} from 'dva/router';
import {connect} from 'dva';
import styles from './HomeTabBar.less';
import TabBarContent from './TabBarContent';

const HomeTabBar = ({ dispatch, global, pools, infos, loading, title = '首页', hiddenTabBar = false}) => {
  return (
    <div className={styles.normal}>
      <NavBar
        iconName='false'
        leftContent=''
        style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
        mode="dark"
        onLeftClick={() => {
          hashHistory.goBack();
        }}
      >
        {global.navTitle}
      </NavBar>
      {<TabBarContent dispatch={dispatch} pools={pools} loading={loading} global={global} infos={infos}/>}
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hiddenTabBar}
      >
        <TabBar.Item
          icon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-home.png'}}
          selectedIcon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-home-selected.png'}}
          title="首页"
          key="index"
          data-seed="logId"
          selected={global.currentTabBarIndex === 1}
          onPress={() => {
            dispatch({
              type: 'global/changeTabBarIndex',
              payload: {
                currentTabBarIndex: 1,
                navTitle: '首页'
              }
            });
            dispatch({
            type: 'pools/query',
            payload: { pageSize: 9000,
                swimTypeOne: '',
                areaRegion: '',
                orderFlag: '',
                spNameOrAddress: '',
                typeIndex: 0,
                pageNo: 0,
                hadMore: true,
                isSwitch: true, }
          });
          }
          }
        >
        </TabBar.Item>
        <TabBar.Item
          icon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-discount.png'}}
          selectedIcon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-discount-selected.png'}}
          title="优惠"
          key="discount"
          data-seed="logId"
          selected={global.currentTabBarIndex === 2}
          onPress={() => {
            dispatch({
              type: 'global/changeTabBarIndex',
              payload: {
                currentTabBarIndex: 2,
                navTitle: '优惠'
              }
            });
            dispatch({
              type: 'pools/queryByIsCoupon',
              payload: { pageSize: 9000, isCoupon: "Y", spNameOrAddressB: "", areaRegion: "", swimTypeOne: "" }
            });
          }
          }
        />
        {/*
        <TabBar.Item
          icon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-info.png'}}
          selectedIcon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-info-selected.png'}}
          title="咨讯"
          key="info"
          data-seed="logId"
          selected={global.currentTabBarIndex === 3}
          onPress={() => {
            dispatch({
              type: 'global/changeTabBarIndex',
              payload: {
                currentTabBarIndex: 3,
                navTitle: '资讯'
              }
            });
            dispatch({
              type: 'infos/fetchInfo',
              infoType: "all"
            });
          }
          }
        />
        */}
        <TabBar.Item
          icon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-mine.png'}}
          selectedIcon={{uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-mine-selected.png'}}
          title="我的"
          key="mine"
          data-seed="logId"
          selected={global.currentTabBarIndex === 4}
          onPress={() => {
            dispatch({
              type: 'global/changeTabBarIndex',
              payload: {
                currentTabBarIndex: 4,
                navTitle: '我的'
              }
            });
          }
          }
        />
      </TabBar>
    </div>
  );
}

HomeTabBar.propTypes = {
  //children: PropTypes.arrayOf(PropTypes.element).isRequired,
  location: PropTypes.object,
  global: PropTypes.object,
};

const mapStateToProps = (state) => (
  { pools: state.pools,
    infos: state.infos,
    global: state.global,
    loading: state.loading.global
  });
export default connect(mapStateToProps)(HomeTabBar);
