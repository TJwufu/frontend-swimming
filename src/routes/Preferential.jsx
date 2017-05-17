import {
  TabBar,
  NavBar,
  Tabs,
  WhiteSpace,
  Toast,
  RefreshControl,
  ListView
} from 'antd-mobile';
import React, {PropTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
import styles from './Preferential.less';

const TabPane = Tabs.TabPane;

function callback(key) {
  Toast.loading('加载中...', 1, () => {
  });
}
const Preferential = ({location, dispatch, pools, loading}) => {

  const {promotions} = pools;
  let dataList = promotions.dataList == null?[]:promotions.dataList;
  return (
    <div className={styles.prefer_container}  style={{paddingTop:'.9rem',paddingBottom:'1.1rem'}}>
      <Tabs defaultActiveKey="001" onChange={callback}>
        <TabPane tab="室内游泳馆" key="001">
          <div className={styles.preferitem}>
            <div className={styles.preferitem_cell}>
            {
              dataList.map((ele, index) => {
            	if(ele.swimTypeOne == '001'){
                  return(
                	    <div className={styles.preferitem_box}  key={ele.id}>
                          <div className={styles.preferitem_photo}>
                            <Link to={`/ticket/${ele.id}`}><img src={ele.spAvatar}/></Link>
                          </div>
                          <div className={styles.preferitem_box_votes}>
                            <div >{ele.spName}</div>
                            <div >票数充足</div>
                          </div>
                         </div>
                  )
            	}
              })
            }
            </div>
          </div>
        </TabPane>
        <TabPane tab="室外游泳池" key="002">
          <div className={styles.preferitem}>
            <div className={styles.preferitem_cell}>
            {
                dataList.map((ele, index) => {
              	if(ele.swimTypeOne == '002'){
                    return(
                  	    <div className={styles.preferitem_box} key={ele.id}>
                            <div className={styles.preferitem_photo}>
                              <Link to={`/ticket/${ele.id}`}><img src={ele.spAvatar}/></Link>
                            </div>
                            <div className={styles.preferitem_box_votes}>
                              <div >{ele.spName}</div>
                              <div >票数充足</div>
                            </div>
                        </div>
                    )
              	}
                })
              }
            </div>
          </div>
        </TabPane>
        <TabPane tab="水上世界" key="003">
          <div className={styles.preferitem}>
            <div className={styles.preferitem_cell}>
            {
                dataList.map((ele, index) => {
              	if(ele.swimTypeOne == '003'){
                    return(
                  	    <div className={styles.preferitem_box} key={ele.id}>
                            <div className={styles.preferitem_photo}>
                              <Link to={`/ticket/${ele.id}`}><img src={ele.spAvatar}/></Link>
                            </div>
                            <div className={styles.preferitem_box_votes}>
                              <div >{ele.spName}</div>
                              <div >票数充足</div>
                            </div>
                           </div>
                    )
              	}
                })
              }
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>

  );
};
Preferential.propTypes = {
  dispatch: React.PropTypes.func,
  pools: React.PropTypes.object,
  location: React.PropTypes.object
};

const mapStateToProps = state => ({pools: state.pools, loading: state.loading.global});
export default connect(mapStateToProps)(Preferential);
