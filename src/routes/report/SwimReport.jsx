/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Modal, Button, List, DatePicker, InputItem, Icon, Flex, Tag, NavBar, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './SwimReport.less';
import { Link } from 'dva/router';
import request from '../../utils/request';
import qs from 'qs';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
const baseURL = HOST

var formatTime = moment(Date.now());
class SwimReport extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
			da: props.params,
			loading: false,
			maxDate: formatTime,
			date: moment(parseInt(props.params.date)),
			swimPool: this.props.reports.reqSwimPool,
			modal: false,
			isLoading: true
		};
	}
	componentWillMount(){
		this.handleSubmit();
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
	handleSubmits = (e) => {
		const year = moment(this.state.date).year()
		var month = moment(this.state.date).month()+1
		var date = moment(this.state.date).date()
		const alert = Modal.alert;
		if(month < 10){
			month = '0' + month
		}
		if(date < 10){
			date = '0' + date
		}
		var loginMes = {
			reqDateTxt: year + '-' + month + '-' + date,
			swimPoolId: this.state.swimPool.id,
			swimmingNum: this.props.form.getFieldValue('swimmingNum'),
			trainingNum: this.props.form.getFieldValue('trainingNum'),
			completeNum: this.props.form.getFieldValue('completeNum')
		}
		var check = {
			swimPoolId: this.state.swimPool.id,
      reqDateTxt: year + '-' + month + '-' + date
		}
		request(`${baseURL}/swim/day/req/poples/wx/check?${qs.stringify(check)}`,{
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			}
        }).then((res)=>{
			if(res.data.data.flag == '0'){
				request(`${baseURL}/swim/day/req/poples/wx/new?${qs.stringify(loginMes)}`,{
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
					}
				}).then((res)=>{
					if(res.data.success == 'T'){
						Toast.success('上报成功!', 1);
						hashHistory.push('/swimList');
					}else if(res.data.success == 'F'){
						Toast.fail('提交失败：'+ res.data.message, 3);
					}
				});
			}else{
				const alertInstance = alert('温馨提示', '数据已报过，要重新上报吗？', [
					{ text: '取消', onPress: () => console.log('cancel') },
					{ text: '确定', onPress: () => {
						request(`${baseURL}/swim/day/req/poples/wx/new?${qs.stringify(loginMes)}`,{
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
							}
						}).then((res)=>{
							if(res.data.success == 'T'){
								Toast.success('上报成功!', 1);
								hashHistory.push('/swimList');
							}else if(res.data.success == 'F'){
								Toast.fail('提交失败：'+ res.data.message, 3);
							}
						});
					}},
				])
				
			}
			
        });
	}
	
	render(){
		const { getFieldProps } = this.props.form;
		const { type } = this.state;
		return (
			<div style={{height: 'auto', paddingTop: '0.9rem'}}>
				<NavBar
						style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
						mode="dark"
						onLeftClick={ () => {
							hashHistory.goBack();
						}}
				>
					人数上报
				</NavBar>
				<div className={styles.title} onClick={this.handleSubmit}>
					{ this.state.swimPool!=null? this.state.swimPool.spName : ''}
				</div>
				<section className={styles.content}>
					<form>
						<DatePicker
							mode="date"
							title="上报时间"
							value={this.state.date}
							onChange={date => this.setState({ date })}
							maxDate={this.state.maxDate}
						>
							<List.Item arrow="horizontal">上报时间</List.Item>
						</DatePicker>
						<List>
							<InputItem placeholder="请输入游泳人数" type="number" labelNumber={6} clear onChange={this.onChangeSwimmingNum} {...getFieldProps('swimmingNum')} >
								游泳人数
							</InputItem>
							<InputItem placeholder="请输入培训人数" type="number" labelNumber={6} clear  {...getFieldProps('trainingNum')}>
								培训人数
							</InputItem>
							<InputItem placeholder="请输入学会游泳人数" type="number" labelNumber={6} clear onChange={this.onChangeCompleteNum} {...getFieldProps('completeNum')}>
								学会游泳人数
							</InputItem>
						</List>
					</form>
				</section>

				<div className={styles.login}>
					<button onClick={this.handleSubmits}>提交</button>
				</div>
			</div>);
	}
}
const SwimReports = createForm()(SwimReport)
//export default SwimReports;

SwimReports.propTypes = {
  type: React.PropTypes.object,
};
const mapStateToProps = ({reports}) => ({reports});
export default connect(mapStateToProps)(SwimReports);
