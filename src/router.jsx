import React, { PropTypes } from 'react';
import { Router, Route, Redirect } from 'dva/router';
import Pools from './routes/Pools';
import PoolPage from './routes/PoolPage';
import Playground from './routes/Playground';
import NotFound from './routes/NotFound';
import Info from './routes/Info';
import PhotoAlbum from './routes/photoAlbum';
import Profile from './routes/Profile';
import LifeSaver from './routes/LifeSaver';
import Tickets from './routes/Tickets';
import CoachPage from './routes/CoachPage';
import NewsDetails from './routes/NewsDetails';
import Preferential from './routes/Preferential';
import HomeTabBar from './routes/home/HomeTabBar';
import WaterQuality from './routes/WaterQuality';
import Feedback from './routes/Feedback';
import PersonalInfo from './routes/personal/PersonalInfo';
import HealthCard from './routes/health/HealthCard';
import HealthApply from './routes/health/HealthApply';
import Sweep from './routes/health/Sweep';
import Notice from './routes/health/Notice';
import Map from './routes/Map';
import URI from 'urijs';
import confidential from './conf/Confidential';
import wx from './routes/wx';
import Ponds from './routes/Ponds';
import Comment from './routes/Comment';
import CommentPage from './routes/CommentPage';

import Login from './routes/login/Login';
import DateReport from './routes/report/DateReport';
import SwimList from './routes/report/SwimList';
import SwimReport from './routes/report/SwimReport';
import TrainReport from './routes/report/TrainReport';


function generateGetCodeUrl(redirectURL) {

  return new URI("https://open.weixin.qq.com/connect/oauth2/authorize")
    .addQuery("appid", confidential.APP_ID)
    .addQuery("redirect_uri", redirectURL)
    .addQuery("response_type", "code")
    .addQuery("scope", "snsapi_userinfo")
    .addQuery("response_type", "code")
    .hash("wechat_redirect")
    .toString();
};

export default ({ history,app }) => {

  function wechatAuth(nextState, replace, next) {

    const uri = new URI(document.location.href);
    const query = uri.query(true);
    const {code} = query;
    if(code) {
      //通过code获取用户信息
      //fetchTokenByCode(code);
      window.app._store.dispatch({
          type: 'pools/fetchTokenByCode',
          payload: { code: code}
      });
      next();
    } else {
      console.info("generateGetCodeUrl(document.location.href):",generateGetCodeUrl(document.location.href));
      document.location = generateGetCodeUrl(document.location.href);
    }
  }


  return (
    <Router history={history}  onUpdate={() => window.scrollTo(0, 0)}>
      <Redirect from="/" to="/wx"  />

      {/*<Route path="/wx" component={wx} onEnter={wechatAuth}/>*/}
      <Route path="/wx" component={wx} onEnter={wechatAuth}/>
      <Route path="/home" component={HomeTabBar} />
      {/*<Route path="/pools" component={HomeTabBar} />*/}

      <Route path="/pools" component={HomeTabBar} />
      
      <Route path="/pools/:poolId" component={PoolPage} />
        <Route path="/discount" component={Preferential} />
        <Route path="/mine" component={Playground}/>
        <Route path="/playground" component={Playground} />
        <Route path="/info" component={Info} />
        <Route path="/photoAlbum" component={PhotoAlbum} />
        <Route path="/photoAlbum/:poolId" component={PhotoAlbum} />
        <Route path="/profile" component={Profile} />
        <Route path="/lifesaver" component={LifeSaver} />
        <Route path="/coach" component={CoachPage} />
        <Route path="/ticket" component={Tickets} />
        <Route path="/ticket/:poolId" component={Tickets} />
        <Route path="/news" component={NewsDetails} />
        <Route path="/news/:newsId" component={NewsDetails} />
        <Route path="/wq" component={WaterQuality} />
        <Route path="/fb" component={Feedback} />
        <Route path="/personalInfo" component={PersonalInfo} />
        <Route path="/healthCard" component={HealthCard} />
        <Route path="/healthApply" component={HealthApply} />
        <Route path="/sweep" component={Sweep} />
        <Route path="/notice" component={Notice} />
        <Route path="/map" component={Map} />
        <Route path="/ponds" component={Ponds} />
    	  <Route path="/comment" component={Comment} />
        <Route path="/commentPage" component={CommentPage} />
        
        <Route path="/login" component={Login} />
        <Route path="/dateReport" component={DateReport} />
        <Route path="/swimList" component={SwimList} />
        <Route path="/swimReport/:date" component={SwimReport} />
        <Route path="/trainReport" component={TrainReport} />
      
        <Route path="*" component={NotFound} />
        
    </Router>
  );
};
