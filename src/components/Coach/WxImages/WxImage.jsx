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
        document.getElementsByClassName('react-viewer-mask')[0].style.background = '#333'
        let addClass = document.getElementsByClassName('react-viewer-close')[0]
        document.querySelectorAll('.react-viewer-icon').forEach(div => {
          div.style.fontSize = '.35rem'
        })
        document.querySelectorAll('.react-viewer-btn').forEach(div => {
          div.style.width = '.6rem'
          div.style.height = '.6rem'
          div.style.background = 'none'
        })
        document.getElementsByClassName('react-viewer-footer')[0].style.bottom = '5%'
        document.getElementsByClassName('react-viewer-toolbar')[0].style.height = '0.6rem'
        document.getElementById('root').style.overflow = 'hidden'
        document.body.style.paddingRight = '0';
        addClass.style.width = '.6rem'
        addClass.style.height = '.6rem'
        addClass.style.top = '.5rem'
        addClass.style.right = '.5rem'
        addClass.style.background = 'none'
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