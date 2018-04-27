import React, { Component, PropTypes } from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import WxImageViewer from 'react-wx-images-viewer';
class WxImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imags: [props.dataSrc],
      index: 0,
      isOpen: false
    };
  }
  onClose = () => {
    this.setState({
      isOpen: false
    })
  }

  openViewer(index) {
    console.log(this)
    this.setState({
      index,
      isOpen: true
    })
  }

  render() {
    const {
      imags,
      index,
      isOpen
    } = this.state;

    return (
      <div className="app">
        <div className="img-list">
          <button onClick={this.openViewer.bind(this, 0)}>点击打开图片</button>
          <div className="img">
            <img src={this.state.imags[0]} alt="" onClick={this.openViewer.bind(this)} width="100%" height="auto" />
          </div>

        </div>
        {
          isOpen ? <WxImageViewer onClose={this.onClose} urls={this.state.imags} index={index} /> : ""
        }
      </div>
    )
  }
}
WxImage.propTypes = {

};
export default WxImage;