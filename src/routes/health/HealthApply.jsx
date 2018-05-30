import React, { PropTypes } from 'react';
import { createForm } from 'rc-form';
import { Table, List, InputItem, Toast, Switch, Flex, Stepper, Slider, Button, NavBar, ImagePicker, Checkbox } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './HealthApply.less';
import request from '../../utils/request';
import qs from 'qs';

const baseURL = HOST

class HealthApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesList: [],
      phoneErr: false,
      EmergPhoneErr: false,
      phone: '',
      EmergPhone: '',
      agree: true
		};
  }
  onErrorClick = () => {
    if (this.state.phoneErr || this.state.EmergPhoneErr) {
      Toast.fail('请输入11位手机号');
    }
  }
  onChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        phoneErr: true,
      });
    } else {
      this.setState({
        phoneErr: false,
      });
    }
    this.setState({
      phone: value
    });
  }
  onChangeEmerg = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        EmergPhoneErr: true,
      });
    } else {
      this.setState({
        EmergPhoneErr: false,
      });
    }
    this.setState({
      EmergPhone: value
    });
  }
  onChangeAgree = (e) => {
    if(e.target.checked){
      this.setState({
        agree: true
      });
    }else{
      this.setState({
        agree: false
      });
    }
  }
  handleSubmits = () => {
    if (!this.state.agree) {
      Toast.info('请同意游泳须知');
      return;
    }
    let apply = {
      name: this.props.form.getFieldValue('name'),
			idcard: this.props.form.getFieldValue('idcard'),
			phone: this.state.phone,
			phone: this.state.EmergPhone,
			photo: '',
    }
    request(`${baseURL}/swim/day/req/poples/wx/new?${qs.stringify(apply)}`,{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer c716ccb83c413ffd8229743331810c3d',
      }
    }).then((res)=>{
      if(res.data.success == 'T'){
        Toast.info('申请成功');
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;

    const AgreeItem = Checkbox.AgreeItem;
    const listForImage = (imagesList) => {
      let images = [];
      for(let i = 0; i < imagesList.length; i++) {
          let m  = {url : AUTH_URL + 'images/' + imagesList[i].imageName,id : imagesList[i].id};
          images.push( m )
      }
      return images;
    }
   
    const files = listForImage(this.state.imagesList);

    return (
      <div className={styles.container}>
        <NavBar
          style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
          mode="dark"
          onLeftClick={ () => {
            hashHistory.goBack();
          }}
        >
          办卡信息
        </NavBar>
        <section className={styles.content}>
          <form>
            <List>
              <InputItem placeholder="请输入姓名" type="text" clear {...getFieldProps('name')} labelNumber={6}>
                姓名
              </InputItem>
              <InputItem placeholder="请输入身份证号" type="text" clear {...getFieldProps('idcard')} labelNumber={6}>
                身份证号
              </InputItem>
              <InputItem
                placeholder="请输入手机号"
                type="phone"
                clear
                error={this.state.phoneErr}
                onErrorClick={this.onErrorClick}
                onChange={this.onChange}
                value={this.state.phone}
                labelNumber={6}
              >
                联系电话
              </InputItem>
              <InputItem
                placeholder="请输入手机号"
                type="phone"
                clear
                error={this.state.EmergPhoneErr}
                onErrorClick={this.onErrorClick}
                onChange={this.onChangeEmerg}
                value={this.state.EmergPhone}
                labelNumber={6}
              >
                紧急联系电话
              </InputItem>
              
            </List>
            <List className={styles.bg_fff}>
              <div className={styles.title_34}>图片上传</div>
              <ImagePicker
                files={files}
                onImageClick={(index, fs) => console.log(index, fs)}
                multiple={false}
                selectable={true}
              />
              <div className={styles.title_26}>请上传真实照片</div>
            </List>
            <Flex>
              <Flex.Item>
                <AgreeItem data-seed="agree" size='xxs' defaultChecked onChange={e => this.onChangeAgree(e)}>
                  为确保游泳安全，本人承诺无严重心脏病、严重高血压、严重皮肤病等游泳禁忌疾病。
                  <span className={styles.title_24} onClick={e => hashHistory.push('/notice')}>&nbsp;&nbsp;查看完整办卡须知&nbsp;>></span>
                </AgreeItem>
              </Flex.Item>
            </Flex>
          </form>
          <div className={styles.pay_btn} onClick={this.handleSubmits}>下一步</div>
        </section>
      </div>
    )
  }
};
const HealthApply = createForm()(HealthApplyForm)
export default HealthApply;