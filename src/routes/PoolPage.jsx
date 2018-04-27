/* eslint import/extensions: 0 */
import { WhiteSpace, WingBlank, Button, List, Icon, Flex, Tag, NavBar, Modal } from 'antd-mobile';
import { connect } from 'dva';
import { Link } from 'dva/router';
import React, { PropTypes } from 'react';
import { hashHistory } from 'dva/router';
import StarIcons from '../components/Common/StarIcons';
import LayoutWithTabBar from './home/HomeTabBar';
import styles from './PoolPage.less';
import { Portal } from 'react-portal';
import { WxImage, CoachTrain } from '../components/Coach'
const Item = List.Item;
const PoolPage = ({ location, pools, loading }) => {
  const { currentItem } = pools;
  const { waterQualityDetail } = currentItem;
  /**const iconServices = 
  {
    "001": "https://oiu4ewuqq.qnssl.com/wifi.png",
  	"002": "https://oiu4ewuqq.qnssl.com/baby_pool.png",
  	"003": "https://oiu4ewuqq.qnssl.com/sauna.png",
  	"004": "https://oiu4ewuqq.qnssl.com/tennis.png",
  	"005": "https://oiu4ewuqq.qnssl.com/shampoo.png",
  	"006": "https://oiu4ewuqq.qnssl.com/inco/parking.png",
  };**/
  const iconServices =
    {
      "001": "http://img.release.1yd.me/FkAl2MhlRLqSs0VPYO6HnBgeAnLP",
      "002": "http://img.release.1yd.me/Fsd450Bzxv22y1pJh2uNS7gL9lM1",
      "003": "http://img.release.1yd.me/FhvHlB7nlUSGjWY2hezQB3VhMs15",
      "004": "http://img.release.1yd.me/FoxdLP8Dx2UV3kzCmHvLRMTl1_Nj",
      "005": "http://img.release.1yd.me/Fll6OFOZTcegtcw9_SJ8DIAYVWKg",
      "006": "http://img.release.1yd.me/FjEWADuYCM2DNh0XuA--DwdlMJU-",
    };

  // 拨打电话
  function callPhone(_phone) {
    return document.location = ('tel:' + _phone);
  }

  return (
    <div className={styles.normal}>
      <NavBar
        style={{ backgroundColor: '#108ee9', position: 'fixed', width: '100%', top: '0px', zIndex: 9 }}
        mode="dark"
        onLeftClick={() => {
          //hashHistory.replace('/pools');
          hashHistory.goBack();
        }}
      >
        场所详情
      </NavBar>
      <List className={styles.list} style={{ paddingTop: '.8rem' }}>
        <Link to={`/photoAlbum/${currentItem.id}`}>
          <img className={styles.photo} src={currentItem.spAvatar} alt="游泳池照片" />
        </Link>
        <div className={styles.address_line}>
          <div className={styles.address_item}>
            <div className={styles.seventhRow}>
              <div className={styles.seventhRow_title}>{currentItem.spName !== null && currentItem.spName.length > 15 ? `${currentItem.spName.slice(0, 15)}...` : currentItem.spName}</div>
              {currentItem.idleStatus === 1 && (<span className={styles.free}>空闲</span>)}
              {currentItem.idleStatus === 2 && (<span className={styles.tofullstrength}>接近满员</span>)}
              {currentItem.idleStatus === 3 && (<span className={styles.fullstrength}>满员</span>)}
            </div>
            <div className={styles.address_area}>地址：
             <span className={styles.address_area_label}>{currentItem.address !== null && currentItem.address.length > 18 ? `${currentItem.address.slice(0, 18)}...` : currentItem.address}</span>
              <Link to={`map`}><a src="#" style={{ fontSize: '.25rem' }}>点击查看</a></Link>

            </div>
            {currentItem.principal == null || currentItem.principal == '' ? null : <div className={styles.address_item_div}>负责人：<span>{currentItem.principal}</span></div>}
            {currentItem.phone == null || currentItem.phone == '' ? null : <div className={styles.address_item_div} onClick={callPhone.bind(this, currentItem.phone)}>电话：<span style={{ color: 'blue' }}>{currentItem.phone}</span></div>}
            {currentItem.completionDate == null || currentItem.completionDate == '' ? null : <div className={styles.address_item_div}>建成年月：<span>{currentItem.completionDate}</span></div>}
            {currentItem.openObject == null || currentItem.openObject == '' ? null : <div className={styles.address_item_div}>开放性质：<span>{currentItem.openObject}</span></div>}
            {currentItem.remark == null || currentItem.remark == '' ? null : <div className={styles.address_item_div}>开放时间：<span>{currentItem.remark}</span></div>}
            {currentItem.travelInformation == null || currentItem.travelInformation == '' ? null : <div className={styles.address_item_div}>交通信息：<span>{currentItem.travelInformation}</span></div>}
            {currentItem.waterAcreage == null || currentItem.waterAcreage == '' ? null : <div className={styles.address_item_div}>水域面积(㎡)：<span>{currentItem.waterAcreage}</span><Link to={`ponds`}><span style={{ fontSize: '0.23rem', marginLeft: '0.1rem' }}>(查看详情)</span></Link></div>}
            {currentItem.licenseUrl !== '' ? null : <div className={styles.address_item_div}>高危许可证：<span><WxImage dataSrc={currentItem.spAvatar} /></span>
            </div>}
          </div>
        </div>
        {/*
        <Item style={{ borderBottom: '1px solid #ddd' }}>
          <Flex direction="row" justify="between" className={styles.mark}>
            <Flex.Item>评分 : <Link to={`commentPage`}><StarIcons currentStarNumber={currentItem.score} maxStarNumber="5" /></Link></Flex.Item>
            <Icon type="phone" className={styles.phone_style}  onClick={callPhone.bind(this,currentItem.phone)}/>
          </Flex>
        </Item>
        */}
        {/* <Item style={{ borderBottom: '1px solid #ddd' }}>
          <Flex direction="row" justify="between" className={styles.mark}>
            <Flex.Item>网友点评({currentItem.comments == null ? 0 : currentItem.comments.length}) </Flex.Item>
            <Link to={`commentPage`}>
              <Icon type="right" className={styles.right_icon_style} />
            </Link>
          </Flex>
        </Item> */}
        {
          currentItem.comments == null ? null : currentItem.comments.map((ele, index) => {
            return index > 1 ? null : (<Item multipleLine align="top" wrap key={ele.id}>
              <div className={styles.contain}>
                <div className={styles.image}>
                  <img src={ele.headimgurl == '' ? 'http://img.release.1yd.me/Fnq3JmmOan-yAHtJHk-n9-o3Qqbr' : ele.headimgurl} />
                </div>
                <div className={styles.star}>
                  <div>
                    <div className={styles.times}>
                      <Flex>
                        <div className={styles.item_title}>{ele.nickname}</div>
                        <div className={styles.item_date}>{ele.createdTime}</div>
                      </Flex>
                    </div>
                    <div className={styles.times}>打分 <StarIcons currentStarNumber={ele.totalScore} maxStarNumber="5" /></div>
                  </div>
                  <WhiteSpace size="lg" />
                  <div>
                    <div className={styles.word}>
                      <div className={styles.item_sub_title}>{ele.content}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Item>)
          })
        }
        <Flex className={styles.mark}>
          <span className={styles.service_line}>
            服务 :
          </span>
          <Flex.Item flex="5">
            {
              currentItem.serviceTypes.map((ele, index) => {
                {
                  return ele == '002' || ele == '003' || ele == '004' || iconServices[ele] == null ? null : (<img className={styles.icon_line} src={iconServices[ele]} alt={ele} key={ele} />)

                }

              })
            }
          </Flex.Item>
        </Flex>
        <div className={styles.tag_container}>
          <Tag selected>
            <Link to={`/photoAlbum/${currentItem.id}`}>
              相册
            </Link>
          </Tag>
          <Tag selected>
            <Link to={`LifeSaver`}>
              救生员
            </Link>
          </Tag>
          <Tag selected>
            <Link to={`coach`}>
              教练员
            </Link>
          </Tag>
        </div>
        <div style={{ height: '0.3rem', background: '#f5f5f9', borderBottom: '1px solid #ddd' }} />
        <Item>
          <Flex style={{ color: '#666' }}>
            <Flex.Item><span>水质 :</span>
              {(waterQualityDetail == null || waterQualityDetail.assess == null || waterQualityDetail.assess == '') ? '暂无数据' :
                (<Link to={`wq`}><span className={styles.water_quality}>{waterQualityDetail.assess}</span></Link>)
              }
            </Flex.Item>
            <Flex.Item><span>水温 :</span>
              {(waterQualityDetail == null || waterQualityDetail.temperature == null || waterQualityDetail.temperature == '') ? '暂无数据' :
                (<span className={styles.water_temp}>{waterQualityDetail.temperature} &#8451;</span>)
              }
            </Flex.Item>
          </Flex>
        </Item>
      </List>
      <div className={styles.button_container}>
        <WhiteSpace size="xs" />
        <WingBlank size="md">
          <Link to={`ticket`}>
            <Button className="btn" type="primary" size="large">选择票券</Button>
          </Link>
        </WingBlank>
      </div>
    </div>
  )
};

PoolPage.propTypes = {

};

const mapStateToProps = state => ({ pools: state.pools, loading: state.loading.global });
export default connect(mapStateToProps)(PoolPage);
