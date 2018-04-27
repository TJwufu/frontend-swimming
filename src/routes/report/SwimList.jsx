/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './SwimList.less';
import { Link } from 'dva/router';
import request from '../../utils/request';
import qs from 'qs';
import moment from 'moment';

const Item = List.Item;
const Brief = Item.Brief;
const baseURL = 'http://swim.yudingnet.com'

var formatTime = moment(Date.now());
class SwimList extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			isLoading: false,
			hasMore: true,
			pageNo: 1,
			pageSize: 20,
			list: [],
			dataSource: [],
			date: formatTime,
			swimPool: {}
		};
	}
	componentWillMount(){
		this.handleSubmit();
		this.genData();
	}
	handleSubmit = (e) => {
		request(`${baseURL}/swim/userRelations/get`,{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			}
        }).then((res)=>{
			this.setState({swimPool: res.data.data})
        });
	}
	genData = (pageNo = 1) => {
		request(`${baseURL}/swim/day/req/poples/wx/search?${qs.stringify({pageNo:this.state.pageNo, pageSize: 20})}`,{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			}
        }).then((res)=>{
			this.setState({list: res.data.data.dataList})
			this.setState({
				isLoading: false
			});
			if(res.data.data.pageNo < res.data.data.totalCount){
				this.setState({
					hasMore: true
				});
			}else{
				this.setState({
					hasMore: false
				});
			}
		});
	}
	onEndReached = (event) => {
		console.log('01')
		if (this.state.isLoading && !this.state.hasMore) {
			console.log('0')
		  return;
		}
		this.setState({ isLoading: true });
		setTimeout(() => {
		  genData(this.state.pageNo++);
		}, 1000);
	  }
	render() {
		return (
			<div style={{height: 'auto', paddingTop: '0.9rem'}}>
				<NavBar
					style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
					mode="dark"
					rightContent={<Link style={{ color: '#fff' }} to={`swimReport/${this.state.date}`}>上报</Link>}
					onLeftClick={ () => {
						hashHistory.goBack();
					}}
				>
					上报记录
				</NavBar>
				<div className={styles.title} onClick={this.handleSubmit}>
					{this.state.swimPool.spName}
				</div>
			<section className={styles.content}>
				<List 
					onEndReachedThreshold={50}
					scrollEventThrottle={20}
					scrollRenderAheadDistance={500}
					onEndReached={this.onEndReached}
					renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
						{this.state.isLoading ? '加载中...' : '已经到底啦'}
						</div>)}
				>
				{
					this.state.list.map((ele, index) => (
						<Link to={`swimReport/${ele.reqDate}`} key={index}>
						<Item
							key={index}
							arrow={ele.popleNum == '0' ? '' : 'horizontal'}
							extra={ele.popleNum == '0' ? <span style={{color:'rgb(16, 142, 233)'}}>人次补报</span> : ele.popleNum}
						>{ele.reqDateTxt}</Item>
					</Link>
					))
				}
				</List>
			</section>
		</div>);
	}
}
export default SwimList;
