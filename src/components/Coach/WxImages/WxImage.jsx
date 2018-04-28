import React, { Component, PropTypes } from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
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
    Toast.loading('正在加载...', 1.5, () => {
      this.setState({ visible: true }, () => {
        document.getElementsByClassName('react-viewer-mask')[0].style.cssText = 'background:#333 !important'
        let addClass = document.getElementsByClassName('react-viewer-close')[0]
        document.querySelectorAll('.react-viewer-icon').forEach(div => {
          div.style.cssText = 'font-size:.35rem !important'
        })
        document.querySelectorAll('.react-viewer-btn').forEach(div => {
          div.style.cssText = 'width:.6rem !important; height:.6rem !important; background:none !important'
        })
        document.getElementsByClassName('react-viewer-footer')[0].style.cssText = 'bottom:5% !important'
        document.getElementsByClassName('react-viewer-toolbar')[0].style.cssText = 'height:.6rem !important'
        document.getElementById('root').style.cssText = 'overflow:hidden !important'
        document.body.style.cssText = 'padding-right:0 !important';
        addClass.style.cssText = 'width: .6rem !important; height:.6rem !important; top:.5rem !important; right:.5rem !important; background:none !important;'
      })
    });

  }
  render() {
    return (
      <span>
        <a href="javascript:void(0);" style={{ color: 'blue' }} onClick={this.handleChange.bind(this)}>查看</a>
        <Viewer
          visible={this.state.visible}
          onClose={() => { this.setState({ visible: false }); document.getElementById('root').style.overflow = 'auto' }}
          images={[{ src: this.props.dataSrc }]}
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