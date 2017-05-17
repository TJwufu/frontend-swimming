import dva from 'dva';
import createLoading from 'dva-loading';
import pools from './models/pools';
import global from './models/global';
import infos from './models/infos';
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
app.model(infos);
// app.model(coaches);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
