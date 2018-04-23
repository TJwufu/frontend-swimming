/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './DateReport.less';
import { Link } from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;

const DateReport = ({ pools}) => {
	return (
		<div style={{height: 'auto', paddingTop: '0.9rem'}}>
			<NavBar
					style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
					mode="dark"
					onLeftClick={ () => {
							hashHistory.goBack();
					}}
			>
					数据上报
			</NavBar>
		<section>
			<List className={styles.list}>
				<Link to={'swimList'}>
					<Item
						thumb="http://img.release.1yd.me/swimNum.png"
						arrow="horizontal"
						onClick={() => {}}
					><span className={styles.nameList}>游泳人次上报</span></Item>
				</Link>
			</List>
			<List className={styles.list}>
				<Link to={'personalInfo'}>
					<Item
					thumb="http://img.release.1yd.me/trainNum.png"
					arrow="horizontal"
					onClick={() => {}}
					><span className={styles.nameList}>培训人数上报</span></Item>
				</Link>
			</List>
			<List className={styles.list}>
				<Item
					thumb="http://img.release.1yd.me/people.png"
					onClick={() => {}}
					extra="暂无数据"
				><span className={styles.nameList}>学生游泳人次上报</span></Item>
			</List>
		</section>
	</div>);
};

DateReport.propTypes = {

};
const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(DateReport);
