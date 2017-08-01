import React, { PropTypes } from 'react';
import styles from './PoiMarkerMap.less';

const PoiMarkerMap = ({ poiMarker }) => {
  var mapUrl = convertUrl(poiMarker);
  document.location = mapUrl;
  return "";
//  return <div className={styles.map_container}>
//    <iframe src={mapUrl} className={styles.map_container} scrolling="auto" />
//  </div>;

};

function convertUrl(obj) {
  var tempStr = "https://3gimg.qq.com/lightmap/v1/marker/index.html?marker=";
  var lat = obj.lat;
  var lan = obj.lan;
  var title = obj.title;
  var addr = obj.addr;

  tempStr += "coord:" + lat + "," + lan
    + ";title:" + title
    + ";addr:" + addr + "&radius=1000&hideDownload=1&hideStreet=1&referer=dianping";
//  var u = navigator.userAgent, app = navigator.appVersion;
//  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//  if(isiOS || true){
//	  tempStr ="http://uri.amap.com/marker?position="+obj.lan+","+obj.lat+"&name="+obj.title+"&src=mypage&coordinate=gaode&callnative=0";  
//  }
  tempStr ="http://uri.amap.com/marker?position="+obj.lan+","+obj.lat+"&name="+obj.title+"&src=mypage&coordinate=gaode&callnative=0";
  return tempStr;
}

PoiMarkerMap.propTypes = {
  poiMarker: PropTypes.object.isRequired,
};

export default PoiMarkerMap;
