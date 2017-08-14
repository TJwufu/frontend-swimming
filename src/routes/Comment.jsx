import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Toast, List, TextareaItem, Button, InputItem, SearchBar, Icon, WhiteSpace, Flex  } from 'antd-mobile';
import {hashHistory} from 'dva/router';
import styles from './Comment.less';
import StarIcons from '../components/Common/StarIcons';


class CommentContent extends React.Component {
  state = {
		    totalScore: 0,
		    szScore: 0,
		    hjScore: 0,
		    hsScore: 0,
		    content: '',
  };
  textareaItemChange = (_val,event) => {
	  this.setState({content: _val});
  };
  onSel = (type,_val) => {
	if(type == 'totalScore'){
		this.setState({ "totalScore": _val });
	}else if(type == 'szScore'){
		this.setState({ "szScore": _val });
	}else if(type == 'hjScore'){
		this.setState({ "hjScore": _val });
	}else if(type == 'hsScore'){
		this.setState({ "hsScore": _val });
	}
  };
  onSubmit = () => {
	  var payload = {
			  swimPoolId: this.props.pools.currentItem.id,
			  openid: window.app._models[1].state.userInfo.openid,
			  nickname: window.app._models[1].state.userInfo.nickname,
			  headimgurl: window.app._models[1].state.userInfo.headimgurl,
			  totalScore: this.state.totalScore,
			  szScore: this.state.szScore,
			  hjScore: this.state.hjScore,
			  hsScore: this.state.hsScore,
			  content: this.state.content,
	    };
	  //console.info(payload);
	  this.props.dispatch({
	        type: 'pools/userCommentSubmit',
		    payload: payload
	      });
	  Toast.success('发表成功!!!', 1);
	  //hashHistory.replace('/pools/'+ this.props.pools.currentItem.id);
	  hashHistory.push('/pools/'+ this.props.pools.currentItem.id);
  };
  ContentBody =() =>{
	  return (<div className={styles.body}>

			  <div className={styles.headd}>
		    	<Flex>
			      <div style={{fontSize: "0.30rem",width: "20%"}} onClick={ () => { hashHistory.goBack();}}>取消</div>
			      <div style={{fontSize: "0.38rem",width: "60%",textAlign: "center"}}>{this.props.pools.currentItem.spName}</div>
			      <div style={{textAlign: "right",width: "20%"}}><Button type="primary" inline size="small" onClick={() => { this.onSubmit(); }} >发表</Button></div>
			    </Flex>
			  </div>
	         <WhiteSpace size="lg" />
		    <hr />
	        <WhiteSpace size="lg" />
		    <Flex>
		      <div className={styles.divLeft}>总体</div>
		      <div className={styles.divCenter} style={{fontWeight: "bold"}}>
			  	<Icon className={this.state.totalScore > 0?styles.icon:styles.icon_empty} type={this.state.totalScore > 0?"star":"star-o"} key={1} onClick={() => { this.onSel('totalScore','1'); }} />
				<Icon className={this.state.totalScore > 1?styles.icon:styles.icon_empty} type={this.state.totalScore > 1?"star":"star-o"} key={2} onClick={() => { this.onSel('totalScore','2'); }} />
				<Icon className={this.state.totalScore > 2?styles.icon:styles.icon_empty} type={this.state.totalScore > 2?"star":"star-o"} key={3} onClick={() => { this.onSel('totalScore','3'); }} />
				<Icon className={this.state.totalScore > 3?styles.icon:styles.icon_empty} type={this.state.totalScore > 3?"star":"star-o"} key={4} onClick={() => { this.onSel('totalScore','4'); }} />
				<Icon className={this.state.totalScore > 4?styles.icon:styles.icon_empty} type={this.state.totalScore > 4?"star":"star-o"} key={5} onClick={() => { this.onSel('totalScore','5'); }} />
		      </div>
		      <div className={styles.divRight}>{this.state.totalScore} 星</div>
		    </Flex>
            <WhiteSpace size="lg" />
		    <hr />
            <WhiteSpace size="lg" />
		    <Flex>
		      <div className={styles.divLeft}>水质</div>
		      <div className={styles.divCenter}>
			  	<Icon className={this.state.szScore > 0?styles.icon:styles.icon_empty} type={this.state.szScore > 0?"star":"star-o"} key={1} onClick={() => { this.onSel('szScore','1'); }} />
				<Icon className={this.state.szScore > 1?styles.icon:styles.icon_empty} type={this.state.szScore > 1?"star":"star-o"} key={2} onClick={() => { this.onSel('szScore','2'); }} />
				<Icon className={this.state.szScore > 2?styles.icon:styles.icon_empty} type={this.state.szScore > 2?"star":"star-o"} key={3} onClick={() => { this.onSel('szScore','3'); }} />
				<Icon className={this.state.szScore > 3?styles.icon:styles.icon_empty} type={this.state.szScore > 3?"star":"star-o"} key={4} onClick={() => { this.onSel('szScore','4'); }} />
				<Icon className={this.state.szScore > 4?styles.icon:styles.icon_empty} type={this.state.szScore > 4?"star":"star-o"} key={5} onClick={() => { this.onSel('szScore','5'); }} />
		      </div>
		      <div className={styles.divRight}>{this.state.szScore}星</div>
		    </Flex>
            <WhiteSpace size="lg" />
		    <Flex>
			    <div className={styles.divLeft}>环境</div>
			      <div className={styles.divCenter}>
				  	<Icon className={this.state.hjScore > 0?styles.icon:styles.icon_empty} type={this.state.hjScore > 0?"star":"star-o"} key={1} onClick={() => { this.onSel('hjScore','1'); }} />
					<Icon className={this.state.hjScore > 1?styles.icon:styles.icon_empty} type={this.state.hjScore > 1?"star":"star-o"} key={2} onClick={() => { this.onSel('hjScore','2'); }} />
					<Icon className={this.state.hjScore > 2?styles.icon:styles.icon_empty} type={this.state.hjScore > 2?"star":"star-o"} key={3} onClick={() => { this.onSel('hjScore','3'); }} />
					<Icon className={this.state.hjScore > 3?styles.icon:styles.icon_empty} type={this.state.hjScore > 3?"star":"star-o"} key={4} onClick={() => { this.onSel('hjScore','4'); }} />
					<Icon className={this.state.hjScore > 4?styles.icon:styles.icon_empty} type={this.state.hjScore > 4?"star":"star-o"} key={5} onClick={() => { this.onSel('hjScore','5'); }} />
			      </div>
		      <div className={styles.divRight}>{this.state.hjScore}星</div>
		    </Flex>
		    <WhiteSpace size="lg" />
		    <Flex>
		      <div className={styles.divLeft}>划算</div>
		      <div className={styles.divCenter}>
			  	<Icon className={this.state.hsScore > 0?styles.icon:styles.icon_empty} type={this.state.hsScore > 0?"star":"star-o"} key={1} onClick={() => { this.onSel('hsScore','1'); }} />
				<Icon className={this.state.hsScore > 1?styles.icon:styles.icon_empty} type={this.state.hsScore > 1?"star":"star-o"} key={2} onClick={() => { this.onSel('hsScore','2'); }} />
				<Icon className={this.state.hsScore > 2?styles.icon:styles.icon_empty} type={this.state.hsScore > 2?"star":"star-o"} key={3} onClick={() => { this.onSel('hsScore','3'); }} />
				<Icon className={this.state.hsScore > 3?styles.icon:styles.icon_empty} type={this.state.hsScore > 3?"star":"star-o"} key={4} onClick={() => { this.onSel('hsScore','4'); }} />
				<Icon className={this.state.hsScore > 4?styles.icon:styles.icon_empty} type={this.state.hsScore > 4?"star":"star-o"} key={5} onClick={() => { this.onSel('hsScore','5'); }} />
		      </div>
		      <div className={styles.divRight}>{this.state.hsScore}星</div>
		    </Flex>
		    <WhiteSpace size="lg" />
		    <hr />
		    <div >
		    	<TextareaItem
		            autoHeight
		            placeholder={"亲，请留下您尊贵的评价..."}
		    	    rows={5}
		            labelNumber={5}
		    	    onChange={value => this.textareaItemChange(value)}
		          />
		    </div>
	  </div>);
  };
  render() {
    return (
      <div className={styles.topDiv}>
      	{this.ContentBody()}
      </div>
    );
  }
}

const Comment = ({ pools,dispatch,type}) => {
  
  return (
    <div style={{ padding: '0.05rem' }}>
	  <CommentContent  dispatch={dispatch} pools={pools}  />
    </div>
  );
};

Comment.propTypes = {
  type: React.PropTypes.object,
};
const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(Comment);