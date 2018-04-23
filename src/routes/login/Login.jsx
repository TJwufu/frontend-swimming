import React from 'react';
import { connect } from 'dva';
import styles from './Login.less';

const Login = ({ pools, loading }) => {
    return (
        <div className={styles.content}>
            <div className={styles.logo}>
                <img src="http://img.release.1yd.me/shyy.png" alt="" className={styles.headImg} />
            </div>
            <ul className={styles.ul}>
                <li>
                    <img src="http://img.release.1yd.me/phone.png" alt=""/>
                    <input type="text" placeholder="请输入登录账号"/>  
                </li>
                <li>
                    <img src="http://img.release.1yd.me/lock.png" alt=""/>
                    <input type="password" placeholder="请输入登录密码"/></li>
            </ul>
            <div className={styles.login}>
                <button>登录</button>
            </div>
        </div>
    )  
}
Login.propTypes = {

};
const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(Login);