import React, { PropTypes } from 'react';
import { Toast, Table, List, InputItem, Switch, Flex, Stepper, Slider, Button, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './HealthCard.less';
import request from '../../utils/request';

const baseURL = HOST

class SweepCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.params.id,
      cardInfo: {}
		};
  }
  componentWillMount(){
		this.getCard()
  }
  getCard() {
    request(`${baseURL}/swim/fitness/cards/${this.state.id}`,{
      method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			}
		}).then((res)=>{
      if(res.data.data.id) {
        this.setState({cardInfo: res.data.data})
      }
		});
  }
  goIn = () => {
    request(`${baseURL}/swim/fitness/cards/signin/sancode/${this.state.id}`,{
      method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			}
		}).then((res)=>{
      Toast.info('确认入场');
      hashHistory.push('/sweep');
		});
  }
  check = () => {
    request(`${baseURL}/swim/fitness/cards/authentication/${this.state.id}`,{
      method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
			}
		}).then((res)=>{
      Toast.info('认证成功');
      hashHistory.push('/sweep');
		});
  }
  render() {
    return (
      <div className={styles.container}>
        <NavBar
          style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
          mode="dark"
          onLeftClick={ () => {
            hashHistory.goBack();
          }}
        >
          我的健康卡
        </NavBar>
        <div className={styles.bg_108ee9}>
          <img src="//oiu4ewuqq.qnssl.com/norecord.png" alt="暂无健康卡" />
        </div>
        <div className={styles.pad_3}>
          <div className={styles.card}>
            <div className={styles.dis_row}>
              <p><strong>姓名：{this.state.cardInfo.name}</strong></p>
              <p className={styles.c_108ee9}>卡号：{this.state.cardInfo.cardNo}</p>
            </div>
            <div className={styles.dis_row}>
              <div className={styles.flx_l}>
                <div className={styles.font_24}>身份证号：{this.state.cardInfo.idcard}</div>
                <div className={styles.font_24}>联系电话：{this.state.cardInfo.phone}</div>
                <div className={styles.font_24}>紧急联系电话：{this.state.cardInfo.urgentPhone}</div>
                {this.state.cardInfo.cardStatus == '0' ? <div>&nbsp;</div> : <div className={styles.line_2}>认证场馆：{this.state.cardInfo.swimPoolId}</div>}
              </div>
              <div className={styles.flx_r}>
                <img src={this.state.cardInfo.qrcodeUrl} />
              </div>
            </div>
            <div className={styles.dis_row}>
              <div className={styles.flx_l}>
                <div className={styles.font_24}><img className={styles.calender} src="//oiu4ewuqq.qnssl.com/calender.png" />有效期：{this.state.cardInfo.validityDateBeginTxt} ~ {this.state.cardInfo.validityDateEndTxt}</div>
              </div>
              <div className={styles.flx_r}>
                <div className={styles.width_50}>
                  {this.state.cardInfo.cardStatus == '0' ? <img src="https://oiu4ewuqq.qnssl.com/nocertification.png" /> : <img src="https://oiu4ewuqq.qnssl.com/certification.png" />}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.butt}>
            {this.state.cardInfo.cardStatus == '0' ? <Button type="primary" className={styles.btn} onClick={this.check}>认证</Button>: <Button type="primary" className={styles.btn} onClick={this.goIn}>确认入场</Button>}
            
          </div>
        </div>
        
      </div>
    )
  }
};

export default SweepCard;