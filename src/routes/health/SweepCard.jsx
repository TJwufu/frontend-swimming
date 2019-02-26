import React, { PropTypes } from 'react';
import { Toast, Table, List, InputItem, Switch, Flex, Stepper, Slider, Button, NavBar } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './SweepCard.less';
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
	    if(res.data.success == 'T') {
        this.setState({cardInfo: res.data.data})
        if(this.state.cardInfo.facePhoto == ''){
        	this.state.cardInfo.facePhoto = "//swimming-1yd.1yd.me/norecord.png"
        }
        if(this.state.cardInfo.expired){
        	Toast.info('健康卡已失效，请知晓！');
        }
      }
		});
  }
  goIn = () => {
    request(`${baseURL}/swim/fitness/cards/signin/sancode/${this.state.id}`,{
      method: 'POST',
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
      method: 'POST',
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
          <img src={ this.state.cardInfo.facePhoto } alt="暂无健康卡" />
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
                <img className={styles.qrcode_img} src={this.state.cardInfo.qrcodeUrl} />
              </div>
            </div>
            <div className={styles.dis_row}>
              <div className={styles.flx_l}>
                <div className={styles.font_25}><img className={styles.calender} src="//swimming-1yd.1yd.me/calender.png" />有效期：{this.state.cardInfo.validityDateBeginTxt}~{this.state.cardInfo.validityDateEndTxt}</div>
              </div>
              <div className={styles.flx_r}>
                <div className={styles.width_50}>
                  {this.state.cardInfo.cardStatus == '0' ? <img src="//swimming-1yd.1yd.me/nocertification.png" /> : <img src="//swimming-1yd.1yd.me/certification.png" />}
                </div>
              </div>
            </div>
          </div>
          { this.state.cardInfo.expired ? "" : 
          <div className={styles.butt}>
            {this.state.cardInfo.cardStatus == '0' ? <Button type="primary" className={styles.btn} onClick={this.check}>认证</Button>: <Button type="primary" className={styles.btn} onClick={this.goIn}>确认入场</Button>}
          </div>}
        </div>
        
      </div>
    )
  }
};

export default SweepCard;