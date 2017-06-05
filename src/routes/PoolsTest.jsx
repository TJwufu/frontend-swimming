/* eslint import/extensions: 0 */
import { SearchBar ,Toast, Carousel, PickerView} from 'antd-mobile';
import React, { PropTypes } from 'react';
import PoolList from '../components/Pools/PoolList';
import styles from './Pools.less';

const Pools = ({ dispatch, pools, loading }) => {
  const { dataSource, pageNo, pageSize, swimTypeOne,orderFlag, areaRegion, hadMore, typeIndex } = pools;
  const onEndReached = (event) => {
    if (!loading && hadMore) {
      dispatch({
        type: 'pools/query',
        payload: { pageNo: pageNo + 1, pageSize , swimTypeOne}
      });
    }
  };

  function showToast(flag,event){
  	dispatch({
          type: 'pools/query',
          payload: {
            pageSize: pageSize,
            swimTypeOne: swimTypeOne,
            areaRegion: areaRegion,
            hadMore: true,
            isSwitch: true,
            orderFlag: flag,
          }
      });
  }
  const swimTypeClick = (req_swimType,event) => {
    dispatch({
        type: 'pools/query',
        payload: {
          pageSize: pageSize,
          swimTypeOne: req_swimType,
          areaRegion: areaRegion,
          hadMore: true,
          isSwitch: true,
          orderFlag: orderFlag,
        }
    });
  };
  const selectChange= (event) => {
    console.info("selectChange:",event.target.value);
    dispatch({
        type: 'pools/query',
        payload: {
          pageSize: pageSize,
          swimTypeOne: swimTypeOne,
          areaRegion: event.target.value,
          hadMore: true,
          isSwitch: true,
          orderFlag: orderFlag,
        }
    });
  };
  const poolListProps = { dataSource, onEndReached, loading };
  return (
    <div className={styles.normal}>
      <SearchBar placeholder="搜索"/>
      <div  className={styles.headBg}>
      	  <div className={styles.headNum}>总数：{dataSource.length}</div>
	      <div className={styles.head}>
	        <div className={swimTypeOne == "001"?styles.active:""}  onClick={swimTypeClick.bind(this,"001")} ><span>室内游泳馆</span></div>
	        <div className={swimTypeOne == "002"?styles.active:""}  onClick={swimTypeClick.bind(this,"002")} ><span>室外游泳馆</span></div>
	        <div className={swimTypeOne == "003"?styles.active:""}  onClick={swimTypeClick.bind(this,"003")} ><span>水上世界</span></div>
	      </div>
      </div>
{/*
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
*/}
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
        <div onClick = {showToast.bind(this,"1")} className={orderFlag == "1"?styles.active:styles.triangle}>距离<div className={styles.triangle}></div></div>
        <div onClick = {showToast.bind(this,"5")} className={orderFlag == "5"?styles.active:styles.triangle}>人气<div className={styles.triangle}></div></div>
      </div>
      {/*<div className={styles.select_query}>
      	总数：{dataSource.length}
      </div>
      */}
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
