/* eslint import/extensions: 0 */
import React, { PropTypes } from 'react';
import { connect } from 'dva';
import InfoItem from '../components/info/InfoItem';


const Info = ({ location, dispatch, infos }) => {
  const handleClick = (state) => {
    const { infoType } = state;
    dispatch({
      type: 'infos/fetchInfo',
      infoType: infoType
    });
  }

  const values = { dataSource:infos.dataSource , infoType: infos.infoType};
  return (
    <div style={{paddingTop: '0.8rem'}}>
      <InfoItem {...values} handleClick={handleClick} />
    </div>
  )
};

Info.propTypes = {

};

const mapStateToProps = ({ infos }) => ({ infos });
export default connect(mapStateToProps)(Info);
