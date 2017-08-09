import React, {
  Component,
  PropTypes,
} from 'react';
import {Button, List, Flex ,WhiteSpace} from 'antd-mobile';
import { Link } from 'dva/router';
import styles from './CommentList.less';
import StarIcons from '../Common/StarIcons';

const CommentList = ({ dataList, swimPoolId }) => {
  const Item = List.Item;
  return (
    <div className={styles.CommentLists}>
      <List className={styles.CommentLists_list}>
        <Item className={styles.Stitle}>
          <div className={styles.cor_blue}></div>
          <div className={styles.cor_blue_word}>评论</div>
          <div className={styles.cor_blue_right}><Link to={`comment`}><Button  type="primary" inline size="small">点评</Button></Link></div>
        </Item>
        {
          dataList.map((ele, index) => (
        		  <Item multipleLine align="top" wrap key={ele.id}>
                  <div className={styles.contain}>
                    <div className={styles.image}>
                      <img src={ele.headimgurl == '' ?'http://img.release.1yd.me/Fnq3JmmOan-yAHtJHk-n9-o3Qqbr': ele.headimgurl}/>
                    </div>
                    <div className={styles.star}>
                      <div>
                        <div className={styles.times}>
                          <Flex>
                        	<div className={styles.item_title}>{ele.nickname}</div>
                        	<div className={styles.item_date}>{ele.createdTime}</div>
                          </Flex>
                        </div>
                        <div className={styles.times}>打分 <StarIcons currentStarNumber={ele.totalScore} maxStarNumber="5"/></div>
                      </div>
          		      <WhiteSpace size="lg" />
                      <div>
        	              <div className={styles.word}>
        	                <div className={styles.item_sub_title}>{ele.content}</div>
        	              </div>
                      </div>
                    </div>
                  </div>
                </Item>
      	  ))
        }
      </List>
    </div>
  );
};

CommentList.propTypes = {};
CommentList.defaultProps = {};

export default CommentList;
