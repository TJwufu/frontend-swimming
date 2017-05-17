/**
 * Created by ryan on 2017/1/9.
 */
import React, {PropTypes} from 'react';
import SignUp from '../signup';
import {List, ListView, ActivityIndicator} from 'antd-mobile';
import styles from './CoachTrain.less'

const TrainItem = ({itemData, sectionId, rowId}) => {
  const Item = List.Item;
  const Brief = Item.Brief;

  return (
    <Item extra={<SignUp count={itemData.interest_count}/>} multipleLine wrap>
      <div className={styles.item_title}>{itemData.train_name}</div>
      <Brief>

        <div className={styles.item_sub_title}>{itemData.description}
          <span style={{color: 'red'}}> ￥{itemData.train_price}/人</span>
        </div>
      </Brief>
    </Item>
  );
};

TrainItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  sectionId: PropTypes.string,
  rowId: PropTypes.string
};

export default  ({dispatch, trainData}) => {
  const {trainListDataList, pageNo, pageSize, loading} = trainData;

  const ds = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });
  const renderRow = (itemData, sectionId, rowId) => (
    <TrainItem itemData={itemData}/>);

  // const renderFooter = () => (<div style={{padding: 5, textAlign: 'center'}}>
  //   {loading ? '加载中...' : '加载完成'}</div>);

  const onEndReached = (event) => {};

  const renderContent = () => trainListDataList.length == 0 ?
    (<div style={{width: '100%', height: '2rem', textAlign: 'center', marginTop: '2rem', fontSize: '32px'}}>
      暂时没有数据</div>) :
    (<ListView style={{overflow: 'none'}}
               dataSource={ds.cloneWithRows(trainListDataList)}
               renderSeparator={(sectionID, rowID) => (
                 <div key={`${sectionID}-${rowID}`}/>
               )}
               renderHeader={() => <div >培训班</div>}
               renderRow={renderRow}
               scrollRenderAheadDistance={900}
               onEndReachedThreshold={10}
               scrollEventThrottle={20}
      />
    );

  const renderLoading = () => (<ActivityIndicator toast text="正在加载"/>);
  return loading ? renderLoading() : renderContent();
};
