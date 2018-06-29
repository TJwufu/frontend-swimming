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
const baseURL = HOST

var formatTime = moment(Date.now());
class SwimList extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			isLoading: false,
			hasMore: true,
			pageNo: 1,
			pageSize: 10,
			list: [],
			dataSource: [],
			date: formatTime,
			swimPool: this.props.reports.reqSwimPool,
			swimmingIcon: 'http://img.release.1yd.me/swimmingIcon.png',
			trainingIcon: 'http://img.release.1yd.me/trainingIcon.png',
			completeIcon: 'http://img.release.1yd.me/completeIcon.png'
		};
	}
	componentWillMount(){
		this.handleSubmit();
		this.genData();
	}
	handleSubmit = (e) => {
		if(this.state.swimPool != null){
			return;
		}
		
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
		request(`${baseURL}/swim/day/req/poples/wx/search?${qs.stringify({pageNo:this.state.pageNo, pageSize: 10})}`,{
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
		if (this.state.isLoading && !this.state.hasMore) {
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
					{ this.state.swimPool!=null? this.state.swimPool.spName : ''}
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
					  <div key={ index }>
						<Link to={`swimReport/${ele.reqDate}`} key={index}>
						  <Item
							key={index}
							arrow={ele.id == null ? '' : ''}
							extra={ele.id == null ? <span style={{color:'rgb(16, 142, 233)'}}> 人数补报</span>: <span style={{color:'rgb(16, 142, 233)'}}> 重新上报</span>  }
						  >{ele.reqDateTxt}</Item>
						</Link>
						{ele.id == null ? 
						(<div className={styles.div_no_detail}>暂无上报</div>)
						:
						(<div className={styles.div_detail}>
							<div className={styles.div_detail_inner}><img src={this.state.swimmingIcon} /> 游泳人数：{ele.swimmingNum}人</div>
							<div className={styles.div_detail_inner}><img src={this.state.trainingIcon} /> 培训人数：{ele.trainingNum}人</div>
							<div className={styles.div_detail_inner} style={{width: '37%'}}><img src={this.state.completeIcon} /> 学会游泳人数：{ele.completeNum}人</div>
						</div>)
						}
					  </div>
					))
				}
				</List>
			</section>
		</div>);
	}
}

SwimList.propTypes = {
  type: React.PropTypes.object,
};
const mapStateToProps = ({reports}) => ({reports});
export default connect(mapStateToProps)(SwimList);
