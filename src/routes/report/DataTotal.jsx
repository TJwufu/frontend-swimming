/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './DataTotal.less';
import { Link } from 'dva/router';
import request from '../../utils/request';

const Item = List.Item;
const Brief = Item.Brief;
const baseURL = HOST

class DataTotal extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    		roleLevel: this.props.reports.roleLevel,
				nickName: this.props.reports.nickName,
				totalData: {},
		}
	}
	componentWillMount(){
		this.getTotalDataByRoleLevel();
    }
	getTotalDataByRoleLevel = (e) => {
		request(`${baseURL}/swim/day/req/poples/totalByRoleLevel?roleLevel=`+this.state.roleLevel,{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			}
		}).then((res)=>{
			if(res.data.success == 'T'){
				this.setState({totalData: res.data.data})	
			}else{
				this.setState({totalData: {}})
			}
		});
	}
	render() {
	  return (
		<div style={{height: 'auto', paddingTop: '0.9rem'}}>
			<NavBar
				style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
				mode="dark"
				onLeftClick={ () => {
					hashHistory.goBack();
				}}
			>
				数据统计
			</NavBar>
		<div className={styles.div_head}>
			“{ this.state.nickName }”最新数据统计<span >（此数据为自7月1日起至今的累计数据）</span>
		</div>
			<List className={styles.list}>
				<div className={styles.div_detail}>
					<div className={styles.div_detail_inner_img}><img src="http://img.release.1yd.me/swimmingReportIcon.png" /></div>
					<div className={styles.div_detail_inner_title}>游泳总人数</div>
					<div className={styles.div_detail_inner_number}>{this.state.totalData.swimmingNum}人</div>
				</div>
				<div className={styles.div_detail}>
					<div className={styles.div_detail_inner_img}><img src="http://img.release.1yd.me/trainingReportIcon.png" /></div>
					<div className={styles.div_detail_inner_title}>培训总人数</div>
					<div className={styles.div_detail_inner_number}>{this.state.totalData.trainingNum}人</div>
				</div>
				<div className={styles.div_detail}>
					<div className={styles.div_detail_inner_img}><img src="http://img.release.1yd.me/completeReportIcon.png" /></div>
					<div className={styles.div_detail_inner_title}>学会游泳总人数</div>
					<div className={styles.div_detail_inner_number}>{this.state.totalData.completeNum}人</div>
				</div>
			</List>
	</div>);
  }
};

DataTotal.propTypes = {
  type: React.PropTypes.object,
};
const mapStateToProps = ({reports}) => ({reports});
export default connect(mapStateToProps)(DataTotal);
