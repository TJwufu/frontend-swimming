/* eslint import/extensions: 0 */
import React, {PropTypes} from 'react';
import { NavBar,Tabs,Toast } from 'antd-mobile';
import LazyLoad from 'react-lazyload';
import {connect} from 'dva';
import { hashHistory } from 'dva/router';
import style from './photoAlbum.less';

const TabPane = Tabs.TabPane;

function callback(key) {
  Toast.loading('加载中...', 1, () => {
  });
}

const photo = ({location, dispatch, pools}) => {
  //let arr = photoAlbums.data == null ? []:photoAlbums.data;
	let arr = pools.currentItem.albums == null ? []:pools.currentItem.albums;
  return (
    <div>
    <NavBar
    leftContent=''
    style={{backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 10 }}
    mode="dark"
    onLeftClick={() => {
      hashHistory.goBack();
    }}
  >
    相册
  </NavBar>
    <div style={{paddingTop:'.9rem',paddingBottom:'1.1rem'}}>
    <Tabs defaultActiveKey="00" onChange={callback}>
    <TabPane tab="全部" key="00">
	    <section className={style.item}>
	      {
	    	arr.map((ele, index) => {
	            return(
	            		<figure key={index} className={style.picture}>
	    	            <LazyLoad height={400}>
	    	              <img src={ele.imageUrl} alt="phote"/>
	    	            </LazyLoad>
	    	          </figure>
	            )
	        })
	      }
	    </section>
	  </TabPane>
      <TabPane tab="外景" key="01">
  	    <section className={style.item} >
          {
        	arr.map((ele, index) => {
          	if(ele.tag == '01'){
                return(
                		<figure key={index} className={style.picture}>
        	            <LazyLoad height={400}>
        	              <img src={ele.imageUrl} alt="phote"/>
        	            </LazyLoad>
        	          </figure>
                )
          	}
            })
          }
        </section>
      </TabPane>
      <TabPane tab="大厅" key="02">
	    <section className={style.item} >
	        {
	      	arr.map((ele, index) => {
	        	if(ele.tag == '02'){
	              return(
	              		<figure key={index} className={style.picture}>
	      	            <LazyLoad height={400}>
	      	              <img src={ele.imageUrl} alt="phote"/>
	      	            </LazyLoad>
	      	          </figure>
	              )
	        	}
	          })
	        }
	      </section>
      </TabPane>
      <TabPane tab="泳池" key="03">
	    <section className={style.item} >
	        {
	      	arr.map((ele, index) => {
	        	if(ele.tag == '03'){
	              return(
	              		<figure key={index} className={style.picture}>
	      	            <LazyLoad height={400}>
	      	              <img src={ele.imageUrl} alt="phote"/>
	      	            </LazyLoad>
	      	          </figure>
	              )
	        	}
	          })
	        }
	      </section>
      </TabPane>
      <TabPane tab="更衣室" key="04">
	    <section className={style.item} >
	        {
	      	arr.map((ele, index) => {
	        	if(ele.tag == '04'){
	              return(
	              		<figure key={index} className={style.picture}>
	      	            <LazyLoad height={400}>
	      	              <img src={ele.imageUrl} alt="phote"/>
	      	            </LazyLoad>
	      	          </figure>
	              )
	        	}
	          })
	        }
	      </section>
      </TabPane>
      <TabPane tab="厕卫" key="05">
	    <section className={style.item} >
	        {
	      	arr.map((ele, index) => {
	        	if(ele.tag == '05'){
	              return(
	              		<figure key={index} className={style.picture}>
	      	            <LazyLoad height={400}>
	      	              <img src={ele.imageUrl} alt="phote"/>
	      	            </LazyLoad>
	      	          </figure>
	              )
	        	}
	          })
	        }
	      </section>
      </TabPane>
      <TabPane tab="其他" key="06">
	    <section className={style.item} >
	      {
	    	arr.map((ele, index) => {
	      	if(ele.tag == '06'){
	            return(
	            		<figure key={index} className={style.picture}>
	    	            <LazyLoad height={400}>
	    	              <img src={ele.imageUrl} alt="phote"/>
	    	            </LazyLoad>
	    	          </figure>
	            )
	      	}
	        })
	      }
	    </section>
    </TabPane>
    </Tabs>
  </div>
    </div>
  )
};

photo.propTypes = {};

const mapStateToProps = ({pools}) => ({pools});
export default connect(mapStateToProps)(photo);
