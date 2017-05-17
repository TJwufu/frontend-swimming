import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import PoiMarkerMap from '../components/Pools/PoiMarkerMap'
import styles from './Map.less'

const Map = ({location, dispatch, pools}) => {

  const {currentItem} = pools;
  if(currentItem == null){
	  return (<div>未查找到地理位置</div>);
  }
  var poiObj = new Object();
  poiObj.lat = currentItem.latitude;
  poiObj.lan = currentItem.longitude;
  poiObj.title = currentItem.spName;
  poiObj.addr = currentItem.address;

  return (<div  className={styles.J_map}>
    <PoiMarkerMap poiMarker={poiObj}></PoiMarkerMap>
  </div>);
}

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(Map);