/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, InputItem, Switch, Stepper, Range, Icon, Flex, Tag, NavBar, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './TrainReport.less';
import { Link } from 'dva/router';
import request from '../../utils/request';
import qs from 'qs';

const Item = List.Item;
const Brief = Item.Brief;
const baseURL = HOST

class TrainReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			loading: false,
			swimPool: {}
		};
    }
    componentWillMount(){
		this.handleSubmit();
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
    handleSubmits = (e) => {
		Toast.info('未到上报时间！');
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
				培训人数上报
            </NavBar>
            <List className={styles.mylist}>
                <Item  onClick={this.handleSubmit}>{this.state.swimPool.spName}</Item>
                <Item>上报日期区间 2018-07-01至2018-08-30</Item>
            </List>
            <section className={styles.content}>
                <form>
                    <List>
                        <InputItem placeholder="请输入培训人数">
                            培训人数
                        </InputItem>
                        <InputItem placeholder="请输入学会游泳人数">
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
export default TrainReport;
