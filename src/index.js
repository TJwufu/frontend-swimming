import dva from 'dva';
import createLoading from 'dva-loading';
import pools from './models/pools';
import reports from './models/reports';
import global from './models/global';
import infos from './models/infos';
import wechatInfo from './models/wechatInfo';
// import coaches from './models/coaches';
import router from './router';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(global);
app.model(pools);
app.model(reports);
app.model(infos);
// app.model(coaches);
window.app = app;

app.model(wechatInfo);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
