
import React, { PropTypes } from 'react';

const TabHead = ({title}) => (
    <div className={styles.sort}>
        <div onClick = {showToast}>水质<div className={styles.triangle}></div></div>
        <div onClick = {showToast}>距离<div className={styles.triangle}></div></div>
        <div onClick = {showToast} className={styles.active}>人气<div className={styles.triangle}></div></div>
    </div>
)
export default TabHead;

