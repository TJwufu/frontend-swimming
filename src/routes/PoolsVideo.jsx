/* eslint import/extensions: 0 */
import { SearchBar, Toast, Carousel, PickerView, Button, Flex } from 'antd-mobile';
import React, { PropTypes } from 'react';
import {connect} from 'dva';
import { NavBar} from 'antd-mobile';
import PoolList from '../components/Pools/PoolList';
import styles from './Pools.less';
import DownMenu from '../components/Pools/DownMenu';

const PoolsVideo = ({ dispatch, pools, loading }) => {
  const { dataSource, pageNo, pageSize, swimTypeOne, orderFlag, areaRegion, spNameOrAddress, hadMore, typeIndex } = pools;
  const onEndReached = (event) => {
    if (!loading && hadMore) {
      dispatch({
        type: 'pools/query',
        payload: { pageNo: pageNo + 1, pageSize, swimTypeOne }
      });
    }
  };

  function showToast(flag, event) {
    dispatch({
      type: 'pools/query',
      payload: {
        pageSize: pageSize,
        swimTypeOne: swimTypeOne,
        areaRegion: areaRegion,
        spNameOrAddress: spNameOrAddress,
        hadMore: true,
        isSwitch: true,
        orderFlag: flag,
      }
    });
  }
  const swimTypeClick = (req_swimType, event) => {
    dispatch({
      type: 'pools/query',
      payload: {
        pageSize: pageSize,
        swimTypeOne: req_swimType,
        areaRegion: areaRegion,
        spNameOrAddress: spNameOrAddress,
        hadMore: true,
        isSwitch: true,
        orderFlag: orderFlag,
      }
    });
  };
  const selectChange = (event) => {
    dispatch({
      type: 'pools/query',
      payload: {
        pageSize: pageSize,
        swimTypeOne: swimTypeOne,
        areaRegion: event.target.value,
        spNameOrAddress: spNameOrAddress,
        hadMore: true,
        isSwitch: true,
        orderFlag: orderFlag,
      }
    });
  };
  var _searchVal = spNameOrAddress;
  const searchBarChange = (_val, event) => {
    _searchVal = _val;
  };
  const searchBarClick = (_val, event) => {
    dispatch({
      type: 'pools/query',
      payload: {
        pageSize: pageSize,
        swimTypeOne: swimTypeOne,
        spNameOrAddress: _searchVal,
        spName: _val,
        areaRegion: areaRegion,
        hadMore: true,
        isSwitch: true,
        orderFlag: orderFlag,
      }
    });
  };
  const poolListProps = { dataSource, onEndReached, loading };
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
	    首页
	  </NavBar>
      <div className={styles.headSearch}>
        <div style={{ width: '75%' }}>
          <SearchBar
            defaultValue={spNameOrAddress}
            placeholder="输入游泳场所名称"
            onSubmit={value => searchBarClick(value)}
            onBlur={value => searchBarClick(value)}
            onChange={value => searchBarChange(value)}
          />
        </div>
        <div style={{ paddingTop: '0.2rem' }}>
          <Button type="primary" inline size="small">搜索</Button>
        </div>
        <div className={styles.headSearchNum}>{dataSource.length}</div>
      </div>
      <DownMenu />
      <div className={styles.headBg}>
        <div className={styles.headNum}>总数：{dataSource.length}</div>
        <div className={styles.head}>
          <div className={swimTypeOne == "001" ? styles.active : ""} onClick={swimTypeClick.bind(this, "001")} ><span>室内游泳馆</span></div>
          <div className={swimTypeOne == "002" ? styles.active : ""} onClick={swimTypeClick.bind(this, "002")} ><span>室外游泳馆</span></div>
          <div className={swimTypeOne == "003" ? styles.active : ""} onClick={swimTypeClick.bind(this, "003")} ><span>水上世界</span></div>
        </div>
      </div>
      <div className={styles.sort}>
        <div>
          <select onChange={selectChange}>
            <option value="">全部区域</option>
            <option value="浦东新区">浦东新区</option>
            <option value="黄浦区">黄浦区</option>
            <option value="徐汇区">徐汇区</option>
            <option value="长宁区">长宁区</option>
            <option value="静安区">静安区</option>
            <option value="普陀区">普陀区</option>
            <option value="虹口区">虹口区</option>
            <option value="杨浦区">杨浦区</option>
            <option value="闵行区">闵行区</option>
            <option value="宝山区">宝山区</option>
            <option value="嘉定区">嘉定区</option>
            <option value="金山区">金山区</option>
            <option value="松江区">松江区</option>
            <option value="青浦区">青浦区</option>
            <option value="奉贤区">奉贤区</option>
            <option value="崇明区">崇明区</option>
          </select>
        </div>
        <div onClick={showToast.bind(this, "1")} className={orderFlag == "1" ? styles.active : styles.triangle}>距离<div className={styles.triangle}></div></div>
        <div onClick={showToast.bind(this, "5")} className={orderFlag == "5" ? styles.active : styles.triangle}>人气<div className={styles.triangle}></div></div>
      </div>
      {/*<div className={styles.select_query}>
      	总数：{dataSource.length}
      </div>
      */}
      <PoolList {...poolListProps} />
    </div>
  );
};

PoolsVideo.propTypes = {
  dispatch: React.PropTypes.func,
  pools: React.PropTypes.object,
  location: React.PropTypes.object
};

const mapStateToProps = (state) => (
  { pools: state.pools,
    global: state.global,
    loading: state.loading.global
  });
export default connect(mapStateToProps)(PoolsVideo);
