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


export default ({ history }) => {
  return (
    <Router history={history}>
      <Redirect from="/" to="/pools" />
      <Route path="/home" component={HomeTabBar} />
      <Route path="/pools" component={HomeTabBar} />
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

      <Route path="*" component={NotFound} />
    </Router>
  );
};
