import { Tabs, WhiteSpace } from 'antd-mobile';
import React, { PropTypes } from 'react';
import InfoList from './InfoList';
import TabPane from './TabPane';
import styles from './InfoItem.less';


const InfoItem = ({ dispatch, handleClick, ...datas }) => {
  const { dataSource,infoType } = { ...datas };
  return (
    <section>
      <TabPane infoType = {infoType} handleClick={handleClick} />
      <InfoList dataSource = {dataSource} />
    </section>
  )
};

export default InfoItem;
