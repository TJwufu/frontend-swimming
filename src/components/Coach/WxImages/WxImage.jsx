import React, { Component, PropTypes } from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
class WxImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <span>
        <a src="#" style={{ color: 'blue' }} onClick={() => { this.setState({ visible: !this.state.visible }); }}>查看</a>
        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }) }}
          onMaskClick={() => { this.setState({ visible: false }) }}
          images={[{ src: this.props.dataSrc, alt: '' }]}
          rotatable={false}
          scalable={false}
          attribute={false}
        />
      </span>
    );
  }
}
WxImage.propTypes = {

};
export default WxImage;