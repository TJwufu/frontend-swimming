import React, {
  Component,
  PropTypes,
} from 'react';
import {List} from 'antd-mobile';
import styles from './CommentList.less';
import StarIcons from '../Common/StarIcons';

const CommentList = () => {
  const Item = List.Item;
  return (
    <div className={styles.CommentLists}>
      <List className={styles.CommentLists_list}>
        <Item className={styles.Stitle}>
          <div className={styles.cor_blue}></div>
          评论
        </Item>
        <Item multipleLine align="top" wrap>
          <div className={styles.contain}>
            <div className={styles.image}>
              <img src={'http://img.release.1yd.me/Fnq3JmmOan-yAHtJHk-n9-o3Qqbr'}/>
            </div>
            <div className={styles.word}>
              <div className={styles.item_title}>小杨</div>
              <div className={styles.item_sub_title}>不错哦，水质很干净</div>
            </div>
            <div className={styles.star}>
              <div className={styles.times}>2017-01-10</div>
              <StarIcons currentStarNumber="3" maxStarNumber="5"/>
            </div>
          </div>
        </Item>

        <Item multipleLine align="top" wrap>
          <div className={styles.contain}>
            <div className={styles.image}>
              <img src={'http://img.release.1yd.me/Fnq3JmmOan-yAHtJHk-n9-o3Qqbr'}/>
            </div>
            <div className={styles.word}>
              <div className={styles.item_title}>小王</div>
              <div className={styles.item_sub_title}>这是我有生最好的一次游泳体验</div>
            </div>
            <div className={styles.star}>
              <div className={styles.times}>2017-01-20</div>
              <StarIcons currentStarNumber="5" maxStarNumber="5"/>
            </div>
          </div>
        </Item>

      </List>
    </div>
  );
};

CommentList.propTypes = {};
CommentList.defaultProps = {};

export default CommentList;
