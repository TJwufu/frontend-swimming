/* eslint import/extensions: 0, no-dupe-keys: 0, no-mixed-operators: 0*/
import { ListView } from 'antd-mobile';
import React, { PropTypes } from 'react';
import PoolItem from './PoolItem';

const PoolList = ({ dataSource, loading, onEndReached }) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const renderRow = (rowData, sectionId, rowId) => (<PoolItem rowData={rowData} sectionId={sectionId} rowId={rowId} />);
  //列表Footer
  const renderFooter = () => (<div style={{ padding: 5, textAlign: 'center' }}>
    {loading ? '加载中...' : ''}</div>);
  return (
    <ListView
      dataSource={ds.cloneWithRows(dataSource)}
      renderSeparator={(sectionID, rowID) => (
        // <div key={`${sectionID}-${rowID}`} style={{ height: '0.25rem', backgroundColor: '#f5f5f9' }} />
        <div key={`${sectionID}-${rowID}`} />
      )}
      renderRow={renderRow}
      renderFooter={renderFooter}
      scrollRenderAheadDistance={500}
      onEndReached={onEndReached}
      onEndReachedThreshold={100}
      initialListSize={5}
      scrollEventThrottle={20}
    />
  );
};

PoolList.propTypes = {
  loading: PropTypes.bool.isRequired,
};


export default PoolList;
