import { Toast, WhiteSpace, List, Checkbox, Flex, WingBlank, Button } from 'antd-mobile';
import React from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './Login.less';
import request from '../../utils/request';
import qs from 'qs';

const AgreeItem = Checkbox.AgreeItem;
class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            setData: true
        };
    }
    componentWillMount(){
		
	}
    handleSubmit = (e) => {
        Toast.loading('登录中...', 2)
        const baseURL = LOGIN
        var loginMes = {
            grant_type: 'password',
            username: this.refs.name.value,
            password: this.refs.pass.value,
            client_secret: 'e2bb72c7e2794781865be949064afd8e',
            client_id: 'b10d5084f75a4fd7a070d0667f91b151'
        }
        if(this.state.setData){
            localStorage.setItem('swimUserName',this.refs.name.value);
            localStorage.setItem('swimUserPass',this.refs.pass.value);
        }else{
            localStorage.removeItem('swimUserName')
            localStorage.removeItem('swimUserPass')
        }
        request(`${baseURL}/v3/oauth/token?${qs.stringify(loginMes)}`,{
            method: 'POST'
        }).then((res)=>{
            if(res.data.success == 'F'){
                Toast.info('用户名密码错误');
                return;
            }
            sessionStorage.setItem('token',res.data.data.access_token);
            sessionStorage.setItem('adminToken',res.data.data.access_token);
            if(this.props.location.query.toPage){
                hashHistory.push(this.props.location.query.toPage);
            }else{
                hashHistory.push('/dateReport');
            }
        });
    }
    onChange = (e) => {
        if(e.target.checked){
            this.setState({
                setData: true
            });
        }else{
            this.setState({
                setData: false
            });
        }
    }
    render() {
        if(localStorage.getItem('swimUserName')){
            var name = localStorage.getItem('swimUserName')
            var password = localStorage.getItem('swimUserPass')
        }
        return (
            <div className={styles.content}>
                <div className={styles.logo}>
                    <img src="http://img.release.1yd.me/shyy.png" alt="" className={styles.headImg} />
                </div>
                <ul className={styles.ul}>
                    <li>
                        <img src="http://img.release.1yd.me/phone.png" alt=""/>
                        <input ref="name" type="text" defaultValue={name} placeholder="请输入登录账号"/>  
                    </li>
                    <li>
                        <img src="http://img.release.1yd.me/lock.png" alt=""/>
                        <input ref="pass" type="password" defaultValue={password} placeholder="请输入登录密码"/>
                    </li>
                </ul>
                <div className={styles.pad50}>
                    <Flex>
                        <Flex.Item>
                            <AgreeItem data-seed="logId" defaultChecked onChange={e => this.onChange(e)}>
                                记住密码
                            </AgreeItem>
                        </Flex.Item>
                    </Flex>
                </div>
                
                <div className={styles.login}>
                    <button onClick={this.handleSubmit}>登录</button>
                </div>
            </div>
        )  
    }
}

export default Login;