/* eslint import/extensions: 0 */
import { SearchBar ,Toast, Carousel} from 'antd-mobile';
import React, { PropTypes } from 'react';
import PoolList from '../components/Pools/PoolList';
import styles from './Pools.less';
const showToast = () => {
  Toast.info('暂时没有哦:)');
}

const Pools = ({ dispatch, pools, loading }) => {
  const { dataSource, pageNo, pageSize, swimTypeOne, hadMore, typeIndex } = pools;
  const onEndReached = (event) => {
    if (!loading && hadMore) {
      dispatch({
        type: 'pools/query',
        payload: { pageNo: pageNo + 1, pageSize , swimTypeOne}
      });
    }
  };
  const poolListProps = { dataSource, onEndReached, loading };
  return (
    <div className={styles.normal}>
      <SearchBar placeholder="搜索"/>

	  <Carousel
        className="my-carousel" autoplay={false} infinite={false} dots={false} 
        selectedIndex={typeIndex}
        beforeChange={(from, to) => {
          var req_swimType = "001";
          if(to == 1){
        	 req_swimType = "002";
          }else if(to == 2){
        	 req_swimType = "003";
          }
          // set state，重新渲染PoolList组件
          dispatch({
              type: 'pools/query',
              payload: {
                pageSize: pageSize,
                swimTypeOne: req_swimType,
                hadMore: true,
                isSwitch: true,
                typeIndex: to
              }
          });
        }}
      >
	      <div className={styles.head} key='001'>
	        <div className={styles.active}><span>室内游泳馆</span></div>
	        <div><span>室外游泳馆</span></div>
	        <div><span>水上世界</span></div>
	      </div>
	      <div className={styles.head} key='002'>
	        <div><span>室内游泳馆</span></div>
	        <div className={styles.active}><span>室外游泳馆</span></div>
	        <div><span>水上世界</span></div>
	      </div>
	      <div className={styles.head} key='003'>
	        <div><span>室内游泳馆</span></div>
	        <div><span>室外游泳馆</span></div>
	        <div className={styles.active}><span>水上世界</span></div>
	      </div>
      </Carousel>
      <div className={styles.sort}>
        <div onClick = {showToast}>水质<div className={styles.triangle}></div></div>
        <div onClick = {showToast}>距离<div className={styles.triangle}></div></div>
        <div onClick = {showToast} className={styles.active}>人气<div className={styles.triangle}></div></div>
      </div>
      <PoolList {...poolListProps} />
    </div>
  );
};

Pools.propTypes = {
  dispatch: React.PropTypes.func,
  pools: React.PropTypes.object,
  location: React.PropTypes.object
};

export default Pools;
