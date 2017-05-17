import React, {
  Component,
  PropTypes,
} from 'react';
import {Toast} from 'antd-mobile';
import styles from './TicketList.less';
import ReactSwipe from 'react-swipes';
const showToast = () => {
  Toast.info('恭喜领取成功:)');
}
const renderContent = () => (
  <div></div>
);

class TicketList extends Component {
  render() {
    let opt = {
      distance: 90, // 每次移动的距离，卡片的真实宽度
      swTouchend: (ev) => {
        let data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        }
      }
    }
    const coupons = this.props.coupons == null?[]:this.props.coupons;
    return (
      <section className={styles.TicketTop}>
        <div className={styles.viewport}>
          <ReactSwipe className={styles.top_img_container} options={opt}>
           {
        	  coupons.map((ele, index) => (
        	    <img className={styles.top_img} src={ele.imageUrl}  onClick = {showToast}  key={ele.id}/>
        	  ))
            }
          </ReactSwipe>
        </div>
      </section>
    );
  }
}

TicketList.propTypes = {};
TicketList.defaultProps = {};

export default TicketList;
