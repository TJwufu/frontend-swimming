/* eslint import/extensions: 0 */
import React, { PropTypes } from 'react';
import { TabBar, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import styles from './LayoutWithTabBar.less';

const getMenuKeyFromUrl = (pathname) => {
  let key = '';
  try {
    /* eslint no-useless-escape:0 */
    key = pathname.match(/\/([^\/]*)/i)[1];
  } catch (e) {
  }
  return key;
};

const LayoutWithTabBar = ({ location, children, title = '', hiddenBackButton = false, hiddenTabBar = false }) => (
  <div className={styles.normal}>
    <NavBar
      iconName={hiddenBackButton ? 'false' : 'left'}
      leftContent={hiddenBackButton ? '' : '返回'}
      style={{ backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
      mode="dark"
      onLeftClick={() => { hashHistory.goBack(); }}
    >
      {title}
    </NavBar>
    <div style={{paddingTop: '.8rem'}}>
      {children}
    </div>
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      hidden={hiddenTabBar}
    >
      <TabBar.Item
        icon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-home.png' }}
        selectedIcon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-home-selected.png' }}
        title="首页"
        key="index"
        data-seed="logId"
        selected={getMenuKeyFromUrl(location.pathname) === 'pools' || getMenuKeyFromUrl(location.pathname) === '/'}
      />
      <TabBar.Item
        icon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-discount.png' }}
        selectedIcon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-discount-selected.png' }}
        title="优惠"
        key="discount"
        data-seed="logId"
        selected={getMenuKeyFromUrl(location.pathname) === 'discount'}
        onPress={() => {
            console.log('1')
          }}
      />
      <TabBar.Item
        icon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-info.png' }}
        selectedIcon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-info-selected.png' }}
        title="咨讯"
        key="info"
        data-seed="logId"
        selected={getMenuKeyFromUrl(location.pathname) === 'info'}
      />
      <TabBar.Item
        icon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-mine.png' }}
        selectedIcon={{ uri: 'http://oiu42aq9j.bkt.clouddn.com/tabbar-mine-selected.png' }}
        title="我的"
        key="mine"
        data-seed="logId"
        selected={getMenuKeyFromUrl(location.pathname) === 'mine'}
      />
    </TabBar>
  </div>
);

LayoutWithTabBar.propTypes = {
  location: PropTypes.object,
};

export default LayoutWithTabBar;
