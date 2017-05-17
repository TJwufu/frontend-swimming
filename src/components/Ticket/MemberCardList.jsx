import React, {
  Component,
  PropTypes,
} from 'react';
import styles from './MemberCardList.less';
import ReactSwipe from 'react-swipes';

const renderContent = () => (
  <div></div>
);
class MemberCardList extends Component {
  render() {
    let opt = {
      distance: 140, // 每次移动的距离，卡片的真实宽度
      swTouchend: (ev) => {
        let data = {
          moved: ev.moved,
          originalPoint: ev.originalPoint,
          newPoint: ev.newPoint,
          cancelled: ev.cancelled
        }
      }
    }
    const memberCards = this.props.memberCards == null?[]:this.props.memberCards;
    
    return (
      <section className={styles.MemberTop}>
        <div className={styles.viewport}>
          <ReactSwipe className={styles.top_img_container} options={opt}>
            {
              memberCards.map((ele, index) => (
        	    <img className={styles.top_img} src={ele.imageUrl}  key={ele.id}/>
        	  ))
            }
          </ReactSwipe>
        </div>
        {renderContent(1)}
      </section>
    );
  }
}

MemberCardList.propTypes = {};
MemberCardList.defaultProps = {};

export default MemberCardList;
