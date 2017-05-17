import React from 'react';
import { connect } from 'dva';
import LayoutWithTabBar from './home/HomeTabBar';

const Playground = ({ location }) => (<LayoutWithTabBar location={location} />);

function mapStateToProps({ pools }) {
  return { pools };
}

export default connect(mapStateToProps)(Playground);
