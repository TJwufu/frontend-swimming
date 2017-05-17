/* eslint import/extensions: 0*/
import { Icon } from 'antd-mobile';
import React, { PropTypes } from 'react';
import styles from './FilletImage.less';

const FilletImage = ({ imageUrl, width, height }) => {
	{/* 默认图片 */}
	const defaultImage = "http://img.release.1yd.me/Fmvv-jWcRdRJ77eW-imht6XKfU1S";
	{/* 当传入的图片长宽为空时，set默认长宽 */}
	if(width == null || height == null){
		return (<img className={styles.fillet_image} src={imageUrl == null?defaultImage:imageUrl} width="100px" height="100px" ></img>);
	}
	else{
		return (<img className={styles.fillet_image} src={imageUrl == null?defaultImage:imageUrl} width={width} height={height} ></img>); 
	}
};
export default FilletImage;
