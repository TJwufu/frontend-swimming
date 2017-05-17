import React, { PropTypes } from 'react';
import styles from './TabPane.less';

const TabPane = ({ handleClick, infoType}) => {
  return (
    <nav className={styles.item}>
      <ul>
        <li className={infoType == 'all'?styles.active:''} onClick={handleClick.bind(this, { infoType: "all" })}>全部</li>
        <li className={infoType == '01'?styles.active:''} onClick={handleClick.bind(this, { infoType: "01" })}>通知</li>
        <li className={infoType == '02'?styles.active:''} onClick={handleClick.bind(this, { infoType: "02" })}>新闻</li>
        <li className={infoType == '03'?styles.active:''} onClick={handleClick.bind(this, { infoType: "03" })}>告示</li>
      </ul>
    </nav>
  )
};

export default TabPane;
