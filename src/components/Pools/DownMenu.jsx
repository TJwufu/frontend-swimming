import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Popup, List, Button, InputItem, SearchBar, Icon } from 'antd-mobile';
import styles from './DownMenu.less';


class PopupContent extends React.Component {
  state = {
    sel: this.props.pVal == 'Query'?this.props.pools.sereviceTypeStr:'',
  };
  onResetClick = () =>{
	  this.setState({sel:''});
  };
  onSelQuery = (sel) => {
	  var selStr = this.state.sel;
	  if(selStr.indexOf(sel) > -1){
		  selStr = selStr.replace(sel+';','');
	  }else{
		  selStr = this.state.sel + sel +';';
	  }
	  //console.info(selStr);
      this.setState({sel:selStr});
  };
  onSel = (type,sel) => {
	this.setState({ sel });
    this.props.onClose();
    if(type == 'swimType'){
    	this.props.pools.swimTypeOne = sel;
    }else if(type == 'area'){
    	this.props.pools.areaRegion = sel;
    }else if(type == 'sorting'){
    	this.props.pools.orderFlag = sel;
    }else if(type == 'query'){
    	this.props.pools.sereviceTypeStr = sel;
    }
    this.props.dispatch({
        type: 'pools/query',
	    payload: {
	        pageSize: this.props.pools.pageSize,
	        swimTypeOne: this.props.pools.swimTypeOne,
	        areaRegion: this.props.pools.areaRegion,
	        sereviceTypeStr: this.props.pools.sereviceTypeStr,
	        spNameOrAddress: this.props.pools.spNameOrAddress,
	        hadMore: true,
	        isSwitch: true,
	        orderFlag: this.props.pools.orderFlag,
	    }
      });
  };
  downMenuContent =() =>{
	if(this.props.pVal == 'SwimType'){
		return (
				<List>
		        <List.Item activeStyle={{fontSize:'0.20rem'}} thumb="" extra={this.props.pools.swimTypeOne == "" || this.props.pools.swimTypeOne == null?"✅":""} onClick={() => { this.onSel('swimType',''); }}>全部</List.Item>
		        <List.Item thumb="" extra={this.props.pools.swimTypeOne == "001"?"✅":""} onClick={() => { this.onSel('swimType','001'); }}>室内游泳馆</List.Item>
		        <List.Item thumb="" extra={this.props.pools.swimTypeOne == "002"?"✅":""} onClick={() => { this.onSel('swimType','002'); }}>室外游泳馆</List.Item>
		        <List.Item thumb="" extra={this.props.pools.swimTypeOne == "003"?"✅":""} onClick={() => { this.onSel('swimType','003'); }}>水上世界</List.Item>
		      </List>
		);
	}else if(this.props.pVal == 'Sorting'){
		return (
			<List>
		        <List.Item thumb="" extra={this.props.pools.orderFlag == "" || this.props.pools.orderFlag == null?"✅":""} onClick={() => { this.onSel('sorting',''); }}>默认排序</List.Item>
		        <List.Item thumb="" extra={this.props.pools.orderFlag == "1"?"✅":""} onClick={() => { this.onSel('sorting','1'); }}>离我最近</List.Item>
		        <List.Item thumb="" extra={this.props.pools.orderFlag == "5"?"✅":""} onClick={() => { this.onSel('sorting','5'); }}>人气最高</List.Item>
		      </List>
		);
	}else if(this.props.pVal == 'Area'){
		return (
			  <List className={styles.popupList}>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "" || this.props.pools.areaRegion == null?"✅":""}  onClick={() => { this.onSel('area',''); }}>全部区域</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "浦东新区"?"✅":""} onClick={() => { this.onSel('area','浦东新区'); }}>浦东新区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "黄浦区"?"✅":""} onClick={() => { this.onSel('area','黄浦区'); }}>黄浦区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "徐汇区"?"✅":""} onClick={() => { this.onSel('area','徐汇区'); }}>徐汇区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "长宁区"?"✅":""} onClick={() => { this.onSel('area','长宁区'); }}>长宁区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "静安区"?"✅":""} onClick={() => { this.onSel('area','静安区'); }}>静安区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "普陀区"?"✅":""} onClick={() => { this.onSel('area','普陀区'); }}>普陀区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "虹口区"?"✅":""} onClick={() => { this.onSel('area','虹口区'); }}>虹口区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "杨浦区"?"✅":""} onClick={() => { this.onSel('area','杨浦区'); }}>杨浦区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "闵行区"?"✅":""} onClick={() => { this.onSel('area','闵行区'); }}>闵行区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "宝山区"?"✅":""} onClick={() => { this.onSel('area','宝山区'); }}>宝山区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "嘉定区"?"✅":""} onClick={() => { this.onSel('area','嘉定区'); }}>嘉定区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "金山区"?"✅":""} onClick={() => { this.onSel('area','金山区'); }}>金山区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "松江区"?"✅":""} onClick={() => { this.onSel('area','松江区'); }}>松江区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "青浦区"?"✅":""} onClick={() => { this.onSel('area','青浦区'); }}>青浦区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "奉贤区"?"✅":""} onClick={() => { this.onSel('area','奉贤区'); }}>奉贤区</List.Item>
		        <List.Item thumb="" extra={this.props.pools.areaRegion == "崇明区"?"✅":""} onClick={() => { this.onSel('area','崇明区'); }}>崇明区</List.Item>
		      </List>
		);
	}else if(this.props.pVal == 'Query'){
		return (
		     <ul style={{ padding: '0.18rem 0.3rem', listStyle: 'none',fontSize:'0.30rem' }}>
		        <li>更多</li>
		        <li style={{ marginTop: '0.18rem' }}>
	        	<Button inline className={styles.butClass + " " + (this.state.sel !=null && this.state.sel.indexOf("005;")>-1?styles.butCheckClass:"")} onClick={() => this.onSelQuery('005')} >泳具售卖</Button>
	        	<Button inline className={styles.butClass + " " + (this.state.sel !=null && this.state.sel.indexOf("002;")>-1?styles.butCheckClass:"")} onClick={() => this.onSelQuery('002')} >儿童池	</Button>
	        	<Button inline className={styles.butClass + " " + (this.state.sel !=null && this.state.sel.indexOf("001;")>-1?styles.butCheckClass:"")} onClick={() => this.onSelQuery('001')} >有Wi-Fi</Button>
	        	<Button inline className={styles.butClass + " " + (this.state.sel !=null && this.state.sel.indexOf("006;")>-1?styles.butCheckClass:"")} onClick={() => this.onSelQuery('006')} >可停车</Button>
		        </li>
		        <li style={{ marginTop: '0.35rem',textAlign:'center' }}>
		          <Button onClick={() => this.onResetClick()} inline style={{fontSize: '0.35rem'}}>重置</Button>
		          <Button type="primary" onClick={() => this.onSel('query', this.state.sel)} inline style={{ marginLeft: '0.55rem', fontSize: '0.35rem'}}>提交</Button>
		        </li>
		      </ul>
			);
		}
  };
  render() {
    return (
      <div className={styles.topDiv}>
      	{this.downMenuContent()}
      </div>
    );
  }
}

const DownMenu = ({ pools,dispatch,type}) => {
  const onMaskClose = () => {
    //console.log('onMaskClose');
    // also support Promise
    // return new Promise((resolve) => {
    //   console.log('1000ms 后关闭');
    //   setTimeout(resolve, 1000);
    // });
  };
  const onClick = (_val,e) => {
	//{type}= _val;
    //e.preventDefault(); // 修复 Android 上点击穿透
    Popup.show(<PopupContent dispatch={dispatch} pools={pools}  pVal={_val} onClose={() => Popup.hide()} />, { onMaskClose });
  };
  // newInstance() {
  //  const ins = Popup.newInstance();
  //  ins.show(<Button onClick={() => ins.hide()}>关闭</Button>);
  // },
  const qAreaRegion = pools.areaRegion !=null && pools.areaRegion!='' ? pools.areaRegion: '区域';
  var qSwimTypeOne = pools.swimTypeOne;
  if(qSwimTypeOne == '001'){
	  qSwimTypeOne = '室内游泳馆';
  }else if(qSwimTypeOne == '002'){
	  qSwimTypeOne = '室外游泳馆';
  }else if(qSwimTypeOne == '003'){
	  qSwimTypeOne = '水上世界';
  }else{
	  qSwimTypeOne = '场所类型';
  }
  var qOrderFlag = pools.orderFlag;
  if(qOrderFlag == '1'){
	  qOrderFlag = '离我最近';
  }else if(qOrderFlag == '5'){
	  qOrderFlag = '人气最高';
  }else{
	  qOrderFlag = '默认排序';
  }
  return (
    <div style={{ padding: '0.05rem' }}>
      <div className={styles.head}>
	    <div className={styles.active} onClick={onClick.bind(this,"Area")}><span>{qAreaRegion} <Icon style={{marginLeft:'0.10rem',color:'#DCDCDC'}} type="down" size="xs" /></span></div>
	  	<div className={styles.active} onClick={onClick.bind(this,"SwimType")}><span>{qSwimTypeOne} <Icon style={{marginLeft:'0.10rem',color:'#DCDCDC'}} type="down" size="xs" /></span></div>
	  	<div className={styles.active} onClick={onClick.bind(this,"Sorting")}><span>{qOrderFlag} <Icon style={{marginLeft:'0.10rem',color:'#DCDCDC'}} type="down" size="xs" /></span></div>
	  	<div className={styles.active} onClick={onClick.bind(this,"Query")}><span>筛选 <Icon style={{marginLeft:'0.10rem',color:'#DCDCDC'}} type="down" size="xs" /></span></div>
	  </div>
    </div>
  );
};

DownMenu.propTypes = {
  type: React.PropTypes.object,
};
const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(DownMenu);