/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import styles from './SwimList.less';
import { Link } from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;

const SwimList = ({ pools}) => {
	return (
		<div style={{height: 'auto', paddingTop: '0.9rem'}}>
			<NavBar
					style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
					mode="dark"
					rightContent="上报"
					onLeftClick={ () => {
							hashHistory.goBack();
					}}
			>
				上报记录
			</NavBar>
			<div className={styles.title}>
				桃浦游泳场馆
			</div>
		<section className={styles.content}>
			<List className={styles.list}>
				<Link to={'swimReport'}>
					<Item
						arrow="horizontal"
						extra="人次补报"
						onClick={() => {}}
					>2018-04-13</Item>
				</Link>
			</List>
			<List className={styles.list1}>
				<Link to={'personalInfo'}>
					<Item
						extra="上报人次：23人"
						onClick={() => {}}
					>2018-04-14</Item>
				</Link>
			</List>
		</section>
	</div>);
};

SwimList.propTypes = {

};
const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(SwimList);
