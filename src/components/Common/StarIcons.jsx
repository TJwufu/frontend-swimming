/* eslint import/extensions: 0*/
import { Icon } from 'antd-mobile';
import React, { PropTypes } from 'react';
import styles from './StarIcons.less';

const StarIcons = ({ currentStarNumber, maxStarNumber }) => {
  const icons = [];
  for (let index = 0; index < maxStarNumber; index++) {
    if (index < currentStarNumber) {
      icons.push(<Icon className={styles.icon} type="star" key={index} />);
    } else {
      icons.push(<Icon className={styles.icon_empty} type="star-o" key={index} />);
    }
  }
  return (<span>{icons}</span>);
};

export default StarIcons;
