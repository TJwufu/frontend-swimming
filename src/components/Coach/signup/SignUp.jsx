/**
 * Created by ryan on 2017/1/9.
 * 报名 button
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import style from './SignUp.less'

import {Toast} from 'antd-mobile';
const showToast = () => {
  Toast.info('暂未开放！');
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
    };
  }

  render() {
    return (
      <div className={style.container}  onClick={showToast}>
        <div className={style.peixun}>
          <div className={style.xingqu}>
            <div>
              感兴趣
            </div>
            <div>
              {this.state.count}
            </div>
          </div>
          <div className={style.baoming}>
            <div>
              报名
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  count: Number
};
SignUp.defaultProps = {
  count: 0
};

export default SignUp;
