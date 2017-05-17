import React, { PropTypes } from 'react';
import styles from './PoiMarkerMap.less';

const PoiMarkerMap = ({ poiMarker }) => {

  var mapUrl = convertUrl(poiMarker);

  return <div className={styles.map_container}>
    <iframe src={mapUrl} className={styles.map_container} scrolling="auto" />
  </div>;

};

function convertUrl(obj) {

  var tempStr = "https://3gimg.qq.com/lightmap/v1/marker/index.html?marker=";
  // var tempStr = "http://apis.map.qq.com/tools/poimarker?type=0&marker=";
  var lat = obj.lat;
  var lan = obj.lan;
  var title = obj.title;
  var addr = obj.addr;

  tempStr += "coord:" + lat + "," + lan
    + ";title:" + title
    + ";addr:" + addr + "&radius=1000&hideDownload=1&hideStreet=1&referer=dianping";

  return tempStr;
}

PoiMarkerMap.propTypes = {
  poiMarker: PropTypes.object.isRequired,
};

export default PoiMarkerMap;
