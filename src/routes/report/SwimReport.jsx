import { WhiteSpace, WingBlank, DatePicker, Button, List, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import styles from './SwimReport.less';

const Item = List.Item;
const Brief = Item.Brief;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}
  
class SwimReport extends Component {
	state = {
    date: now
  }
	render() {
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
				<div className={styles.title}>
					<DatePicker
						mode="date"
						title="选择日期"
						extra="Optional"
						value={this.state.date}
						onChange={date => this.setState({ date })}
					>
						<List.Item arrow="horizontal">上报时间</List.Item>
					</DatePicker>
				</div>
				<div className={styles.title}>
					<span>泳客人次</span>
				</div>
				<div className={styles.btn}>
					<Button  type="primary" size="large">提交</Button>
				</div>
			</div>
		);
	}
}
const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(SwimReport);
  