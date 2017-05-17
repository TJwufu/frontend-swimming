import React, {PropTypes} from 'react';
import PoolList from '../../components/Pools/PoolList';
import PoolsTest from '../PoolsTest';
import Preferential from '../Preferential';
import Info from '../Info';
import Profile from '../Profile';

const TabBarContent = ({ dispatch, pools, loading, global, infos } ) => {
  let result;
  let values;
  const index = global.currentTabBarIndex;
  switch (index) {
    case 1:
      values = { dispatch, pools, loading, global };
      result = <PoolsTest {...values} />
      break;
    case 2:
      values = { dispatch, pools, loading, global };
      result = <Preferential {...values} />
      break;
    case 3:
      values = { dispatch, infos, loading, global };
      result = <Info {...values} />
      break;
    case 4:
      result = <Profile />
      break;

    default : result = <div style={{paddingTop: '.8rem'}}>default</div> ;
  }
  return result;
}

export default TabBarContent;
