import React, { PropTypes } from 'react';
import { Table, List, InputItem, Toast, Switch, Flex, Stepper, Slider, Button, NavBar, ImagePicker, Checkbox } from 'antd-mobile';
import { hashHistory } from 'dva/router';
import { connect } from 'dva';
import FilletImage from '../../components/Common/FilletImage';
import styles from './HealthApply.less';
class HealthApply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imges: [],
      phoneErr: false,
      phone: ''
		};
  }
  onErrorClick = () => {
    if (this.state.phoneErr) {
      Toast.info('请输入11位手机号');
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
  render() {
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
              <InputItem placeholder="请输入姓名" type="text" clear labelNumber={6}>
                姓名
              </InputItem>
              <InputItem placeholder="请输入身份证号" type="text" clear labelNumber={6}>
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
                紧急联系电话
              </InputItem>
              <div className={styles.title_34}>图片上传</div>
              <ImagePicker
                onImageClick={(index, fs) => console.log(index, fs)}
              />
              <div className={styles.title_26}>请上传真实照片</div>
            </List>
            <div className={styles.bg_fff}>
              <div className={styles.flex2}>办卡金额<span className={styles.title_24}>（包含保险费3.5元）</span></div>
              <div className={styles.flex1}>￥6.0</div>
            </div>
            <Flex>
              <Flex.Item>
                <AgreeItem data-seed="logId" size='xxs' onChange={e => console.log('checkbox', e)}>
                  为确保游泳安全，本人承诺无严重心脏病、严重高血压、严重皮肤病等游泳禁忌疾病。
                  <span className={styles.title_24} onClick={e => hashHistory.push('/notice')}>&nbsp;&nbsp;查看完整办卡须知&nbsp;>></span>
                </AgreeItem>
              </Flex.Item>
            </Flex>
          </form>
          <div className={styles.pay_btn}>立即支付</div>
        </section>
      </div>
    )
  }
};

export default HealthApply;