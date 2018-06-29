/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './DateReport.less';
import { Link } from 'dva/router';
import request from '../../utils/request';

const Item = List.Item;
const Brief = Item.Brief;
const baseURL = HOST

const DateReport = ({ reports}) => {
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
			{ (reports.roleLevel == '03') ? 
			(<List className={styles.list}>
				<Link to={'swimList'}>
					<Item
						thumb="http://img.release.1yd.me/dataReq.png"
						arrow="horizontal"
						onClick={() => {}}
					><span className={styles.nameList}>数据上报</span></Item>
				</Link>
			</List>) : null 
			}
			{ (reports.roleLevel == 'XXX') ? 
			(<List className={styles.list}>
				<Link to={'dataTotal'}>
					<Item
					thumb="http://img.release.1yd.me/dataTotal.png"
					arrow="horizontal"
					onClick={() => {}}
					><span className={styles.nameList}>数据统计</span></Item>
				</Link>
			</List>) : null 
			}
			
			{ (reports.roleLevel == '01') ? 
			(<List className={styles.list}>
				<Link to={'poolVideos'}>
					<Item
						thumb="http://img.release.1yd.me/dataView.png"
						arrow="horizontal"
						onClick={() => {}}
					><span className={styles.nameList}>监控查看</span></Item>
				</Link>
			</List>) : null  
			}
		</section>
	</div>);
};

DateReport.propTypes = {
};
const mapStateToProps = ({reports}) => ({reports});
export default connect(mapStateToProps)(DateReport);
