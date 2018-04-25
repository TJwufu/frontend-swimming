import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import React from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './Login.less';
import request from '../../utils/request';
import qs from 'qs';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    handleSubmit = (e) => {
        Toast.loading('登录中...', 2)
        const baseURL = 'http://auth.yudingnet.com'
        var loginMes = {
            grant_type: 'password',
            username: this.refs.name.value,
            password: this.refs.pass.value,
            client_secret: 'e2bb72c7e2794781865be949064afd8e',
            client_id: 'b10d5084f75a4fd7a070d0667f91b151'
        }
        request(`${baseURL}/v3/oauth/token?${qs.stringify(loginMes)}`,{
            method: 'POST'
        }).then((res)=>{
            if(res.data.success == 'F'){
                Toast.info('用户名密码错误');
                return;
            }
            console.log(res)
            sessionStorage.setItem('token',res.data.data.access_token);
            hashHistory.push('/dateReport')
        });
    }
    render() {
        return (
            <div className={styles.content}>
                <div className={styles.logo}>
                    <img src="http://img.release.1yd.me/shyy.png" alt="" className={styles.headImg} />
                </div>
                <ul className={styles.ul}>
                    <li>
                        <img src="http://img.release.1yd.me/phone.png" alt=""/>
                        <input ref="name" type="text" placeholder="请输入登录账号"/>  
                    </li>
                    <li>
                        <img src="http://img.release.1yd.me/lock.png" alt=""/>
                        <input ref="pass" type="password" placeholder="请输入登录密码"/></li>
                </ul>
                <div className={styles.login}>
                    <button onClick={this.handleSubmit}>登录</button>
                </div>
            </div>
        )  
    }
}

export default Login;