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
import Map from './routes/Map';
import URI from 'urijs'
import confidential from './conf/Confidential'
import YSMonitor from './routes/YSMonitor'


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

  function  fetchToken(code) {
    console.log("调用 fetchToken");
    app._store.dispatch({
      type: 'wechatInfo/fetchTokenByCode',
      payload: {
        appid : confidential.APP_ID,
        secret: confidential.APP_SECRET,
        code: code,
        grant_type: 'authorization_code'
      }
    });
    console.log("调用 fetchToken end");

  }

  function wechatAuth(nextState, replace, next) {

    const uri = new URI(document.location.href);
    const query = uri.query(true);
    const {code} = query;
    console.log('first code----->'+code);

    if(code) {
      fetchToken(code);
      console.log('last code----->'+code);
      next();
    } else {
      var loc = generateGetCodeUrl(document.location.href)
      console.log('generateGetCodeUrl code----->'+loc);
      document.location = generateGetCodeUrl(document.location.href);
    }
  }



  return (
    <Router history={history}>
      <Redirect from="/" to="/pools" />

        <Route path="/home" component={HomeTabBar} />
        {/*<Route path="/pools" component={HomeTabBar}  onEnter={wechatAuth}/>*/}
      <Route path="/pools" component={HomeTabBar}/>

      <Route path="/pools/:poolId" component={PoolPage} />
        <Route path="/discount" component={Preferential} />
        <Route path="/mine" component={Playground} />
        <Route path="/playground" component={Playground} />
        <Route path="/info" component={Info} />
        <Route path="/photoAlbum" component={PhotoAlbum} />
        <Route path="/photoAlbum/:poolId" component={PhotoAlbum} />
        <Route path="/profile" component={Profile} />
        <Route path="/lifesaver" component={LifeSaver} />
        <Route path="/profile" component={Profile} />
        <Route path="/coach" component={CoachPage} />
        <Route path="/ticket" component={Tickets} />
        <Route path="/ticket/:poolId" component={Tickets} />
        <Route path="/news" component={NewsDetails} />
        <Route path="/news/:newsId" component={NewsDetails} />
        <Route path="/wq" component={WaterQuality} />
        <Route path="/fb" component={Feedback} />
        <Route path="/personalInfo" component={PersonalInfo} />
        <Route path="/map" component={Map} />
        <Route path="/ys" component={YSMonitor} />

        <Route path="*" component={NotFound} />
    </Router>

  );
};







