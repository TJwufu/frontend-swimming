import React, { Component, PropTypes } from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import initReactFastclick from 'react-fastclick';
initReactFastclick()
class WxImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleChange(e) {
    e.stopPropagation();
    let viewerMask = document.getElementsByClassName('react-viewer-mask')[0]
    viewerMask.style.background = '#333'
    document.getElementById('root').style.overflow = 'hidden'
    document.body.style.paddingRight = '0';
    viewerMask.style.height = '100%'
    let addClass = document.getElementsByClassName('react-viewer-close')[0]
    let addIconClass = document.getElementsByClassName('react-viewer-icon')[0]
    addClass.style.width = '.6rem'
    addClass.style.height = '.6rem'
    addClass.style.top = '.5rem'
    addClass.style.right = '.5rem'
    addClass.style.background = 'none'
    addIconClass.style.fontSize = '.35rem'
  }
  render() {
    return (
      <span>
        <a src="#" style={{ color: 'blue' }} onClick={() => { this.setState({ visible: !this.state.visible }); }}>查看</a>
        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); document.getElementById('root').style.overflow = 'auto' }}
          onMaskClick={this.handleChange.bind(this)}
          images={[{ src: this.props.dataSrc, alt: '' }]}
          rotatable={false}
          scalable={false}
          attribute={false}
          changeable={false}
          noNavbar={true}
          drag={false}
        />
      </span>
    );
  }
}
WxImage.propTypes = {

};
export default WxImage;