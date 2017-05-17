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
      </List>
    </div>
  );
};

CommentList.propTypes = {};
CommentList.defaultProps = {};

export default CommentList;
