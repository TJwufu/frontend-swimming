import React, { Component, PropTypes } from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import initReactFastclick from 'react-fastclick';
import styles from './WxImage.less';
initReactFastclick()
class WxImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleChange(e) {
    console.log(this)
    e.stopPropagation();
    document.body.style.paddingRight = '0';
    // alert(111)
    // this.setState({ visible: false })
    // this.setState({ visible: true });
  }
  render() {
    return (
      <span className={styles.describe_container}>
        <a src="#" style={{ color: 'blue' }} onClick={() => { this.setState({ visible: !this.state.visible }); }}>查看</a>
        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }) }}
          onMaskClick={this.handleChange.bind(this)}
          images={[{ src: this.props.dataSrc, alt: '' }]}
          rotatable={false}
          scalable={false}
          attribute={false}
          changeable={false}

        />
      </span>
    );
  }
}
WxImage.propTypes = {

};
export default WxImage;