import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import StarIcons from '../Common/StarIcons';
import styles from './PoolItem.less';

const PoolItem = ({ rowData, sectionId, rowId }) => (
  <div className={styles.item} key={rowId}>
    <Link to={`/pools/${rowData.id}`}>
      <div className={styles.image}>
        <img style={{ height: '1.2rem', width: '100%' }} src={rowData.spAvatar !== '' ? rowData.spAvatar : 'http://img.release.1yd.me/Fnq3JmmOan-yAHtJHk-n9-o3Qqbr'} alt={rowData.spAvatar} />
      </div>
      <div className={styles.infomation}>
        <div className={styles.content}>
          <div className={styles.firstRow}>{rowData.spName!=null && rowData.spName.length > 13? `${rowData.spName.slice(0,13)}...` : rowData.spName}</div>
          {/* 取消水质展示
          <div className={styles.forthRow}><span>水质：</span><span className={styles.forthSpan}>优</span></div>
          */}
        </div>
        <div className={styles.content}>
          <div className={styles.secondRow}>{rowData.address!=null && rowData.address.length > 15? `${rowData.address.slice(0,15)}...` : rowData.address}</div>
          {/* 场内人数位置调整
          <div className={styles.sixthRow}><span>场内人数：</span><span className={styles.sixthSpan}>低</span></div>
          */}
        </div>
        {/*
        <div className={styles.content}>
          <div className={styles.sixthRow}><span>场内人数：</span><span className={styles.sixthSpan1}>暂无数据</span></div>
        </div>
        */}
        <div className={styles.content}>
          <div className={styles.thirdRow}><StarIcons currentStarNumber={rowData.score} maxStarNumber="5" /></div>
          <div className={styles.fifthRow}>{rowData.distance}</div>
        </div>
      </div>
    </Link>
  </div>
);

PoolItem.propTypes = {
  rowData: PropTypes.object.isRequired,
  sectionId: PropTypes.string.isRequired,
  rowId: PropTypes.string.isRequired
};

export default PoolItem;
