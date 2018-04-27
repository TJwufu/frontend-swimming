/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, InputItem, Switch, Stepper, Range, Icon, Flex, Tag, NavBar } from 'antd-mobile';
import { createForm } from 'rc-form';
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './TrainReport.less';
import { Link } from 'dva/router';

const Item = List.Item;
const Brief = Item.Brief;

const TrainReport = ({ pools}) => {
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
                <Item>桃浦游泳场馆</Item>
                <Item>上报日期区间</Item>
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
                <button>提交</button>
            </div>
	    </div>);
};

TrainReport.propTypes = {

};
const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(TrainReport);
