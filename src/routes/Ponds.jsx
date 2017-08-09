import { List, TextareaItem, NavBar, Icon, Button, WhiteSpace, Flex } from 'antd-mobile';
import React  from 'react';
import { connect } from 'dva';
import {hashHistory} from 'dva/router';
import styles from './Ponds.less';

const Ponds = ({dispatch, pools}) => {
  const {currentItem} = pools;
  if(currentItem == null){
	  return (<div>场所暂未录入信息，请您知晓！</div>);
  }
  const {ponds} = currentItem;
  return (
    <div className={styles.normal}>
    {/*导航栏*/}
    <NavBar
      iconName="left"
      leftContent=''
      style={{ backgroundColor: '#108ee9' }}
      mode="dark"
      onLeftClick={() => {
        hashHistory.goBack();
      }}
      rightContent={[<Icon type="export" key={currentItem.id} />]}
    >泳池详情</NavBar>

      { (ponds == null || ponds.length == 0)?(<span>该场所暂未录入泳池信息，请您知晓！</span>):(
		<div className={styles.flexContainer}>
          {
        	ponds.map((ele, index) => {
              {
                return (
                	<div className={styles.pondBody}  key={ele.id}>
                	  <div className={styles.subTitle}>{ele.pondType}({ele.isStandard ?'标准':'非标准'})</div>
                	  <Flex>
	                    <Flex.Item>长(m)：{ele.length}</Flex.Item>
	                    <Flex.Item>宽(m)：{ele.width}</Flex.Item>
	                    <Flex.Item>面积(㎡)：{ele.area}</Flex.Item>
	                  </Flex>
	                  <WhiteSpace />
                	  <Flex>
	                    <Flex.Item>浅水区深度(m)：{ele.shallowWaterDepth}</Flex.Item>
	                    <Flex.Item>深水区深度(m)：{ele.deepWaterDepth}</Flex.Item>
	                    <Flex.Item></Flex.Item>
	                  </Flex>
		              <WhiteSpace size="lg" />
	                </div>
                )
              	
              }
    	      
    	    })
    	  }
        </div>
      )}
    </div>
  )
};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(Ponds);

