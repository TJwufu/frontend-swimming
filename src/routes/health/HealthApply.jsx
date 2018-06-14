import React from 'react';
import { createForm } from 'rc-form';
import { List, InputItem, Toast, Flex, Button, NavBar, ImagePicker, Checkbox } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import styles from './HealthApply.less';
import request from '../../utils/request';

const baseURL = HOST
console.log(window)
class HealthApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      phoneErr: false,
      urgentPhoneErr: false,
      phone: '',
      urgentPhone: '',
      agree: true,
      photo: '',
      havePhoto: false,
      insuranceFlag: 1
    };
  }
  onErrorClick = () => {
    if (this.state.phoneErr || this.state.urgentPhoneErr) {
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
        urgentPhoneErr: true,
      });
    } else {
      this.setState({
        urgentPhoneErr: false,
      });
    }
    this.setState({
      urgentPhone: value
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
    if(!this.state.havePhoto) {
      Toast.info('请上传图片');
      return;
    }else{
      if(!this.state.photo) {
        Toast.info('正在上传图片，请稍后',1);
        return;
      }
    }
    let apply = '{"name": "'+this.props.form.getFieldValue('name')+'","idcard":"'+this.props.form.getFieldValue('idcard')+'","phone":"'+this.state.phone+'","urgentPhone":"'+ this.state.urgentPhone+'","photo": "'+this.state.photo+'","insuranceFlag":'+ this.state.insuranceFlag+'}'
    request(`${baseURL}/swim/fitness/cards/wx`,{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 62a06606bfc23bf38ca836764a84e086',
        'Content-Type': 'application/json'
      },
      body: apply
    }).then((res)=>{
      console.log(res)
      if(res.data.success == 'T'){
        window.open('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8dab495537815c1f&redirect_uri='+encodeURIComponent('http://weixin.1yd.me/main.html#/swimPay/wxpaycode?orderNo=' + res.data.data.swimFitnessCardOrder.orderNo + '&insurance=' + this.state.insuranceFlag) + '&response_type=code&scope=snsapi_userinfo&#wechat_redirect')
      }
    });
  }
  onInsurance = (e) => {
    if(e.target.checked){
      this.setState({
        insuranceFlag: 1
      });
    }else{
      this.setState({
        insuranceFlag: 0
      });
    }
  }
  onImgChange = (files, type, index) => {
    this.setState({
      files,
    });
    if(type == 'add') {
      this.setState({
        havePhoto: true
      });
      const fdfsURL = FDFS
      //window.app._models[1].state.userInfo = { "token": "452e770478d037fea2fd4042ad8c864d" }
      //const formData = '{"bucketName":"cmVsZWFzZS0xeWQ=","imageName":"'+files[0].file.name+'","imageBase64Str":"'+files[0].url+'"}';
      let formData = `{"bucketName":"cmVsZWFzZS0xeWQ=", "imageName":"${files[0].file.name}", "imageBase64Str":"${files[0].url}" }`;
      request(`${fdfsURL}/dfs/qiniu/upload/base64`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 62a06606bfc23bf38ca836764a84e086',
          'Content-Type': 'application/json'
        },
        body: formData,
      }).then((response) => {
        if (response.data.success) {
          Toast.success('图片上传成功', 1);
          this.setState({
            photo: response.data.data.imageUrl
          });
        }
      }).then((json) => {  
        
      })
    } else {
      this.setState({
        photo: ''
      });
      this.setState({
        havePhoto: false
      });
      
    }
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { files } = this.state;
    const AgreeItem = Checkbox.AgreeItem;
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
                error={this.state.urgentPhoneErr}
                onErrorClick={this.onErrorClick}
                onChange={this.onChangeEmerg}
                value={this.state.urgentPhone}
                labelNumber={6}
              >
                紧急联系电话
              </InputItem>
              
            </List>
            <List className={styles.bg_fff}>
              <div className={styles.title_34}>图片上传</div>
              <ImagePicker
                files={files}
                onChange={this.onImgChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                multiple={false}
                selectable={true}
                selectable={files.length < 1}
              />
              <div className={styles.title_26}>请上传真实照片</div>
            </List>
            <List className={styles.bg_fff}>
              <div className={styles.dis_flex}>
                <div className={styles.checkbox}>
                  保险费<span className={styles.c_108ee9}>￥3.5</span>
                </div>
                <div>
                  <AgreeItem data-seed="agree" size='xxs' defaultChecked onChange={e => this.onInsurance(e)}></AgreeItem>
                </div>
              </div>
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
          <Button className={styles.pay_btn} type="primary" onClick={this.handleSubmits}>下一步</Button>
        </section>
      </div>
    )
  }
};
const HealthApply = createForm()(HealthApplyForm)
export default HealthApply;