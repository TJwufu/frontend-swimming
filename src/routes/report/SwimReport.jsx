/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, DatePicker, InputItem, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './SwimReport.less';
import { Link } from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;

var formatTime = moment(Date.now());
class SwimReport extends React.Component {
	state = {
		date: formatTime
	}
	render(){
		return (
			<div style={{height: 'auto', paddingTop: '0.9rem'}}>
				<NavBar
						style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
						mode="dark"
						onLeftClick={ () => {
							hashHistory.goBack();
						}}
				>
					人次上报
				</NavBar>
				<div className={styles.title}>
					桃浦游泳场馆
				</div>
				<section className={styles.content}>
					<form>
						<DatePicker
							mode="date"
							title="上报时间"
							value={this.state.date}
          					onChange={date => this.setState({ date })}
						>
							<List.Item arrow="horizontal">上报时间</List.Item>
						</DatePicker>
						<List>
							<InputItem placeholder="请输入学会游泳人数">
								学会游泳人数
							</InputItem>
						</List>
					</form>
				</section>
				<div className={styles.login}>
					<button>提交</button>
				</div>
			</div>);
	}
}
export default SwimReport;
