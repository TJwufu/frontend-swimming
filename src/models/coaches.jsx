import {parse} from 'qs';
import pathToRegexp from 'path-to-regexp';
import {fetchCoach, fetchTrainList} from '../services/coachService';

const local_data = {
  'data': {
    'dataList': [
      {
        'interest_count': '12',
        'train_name': '游泳培训班',
        'description': '4-6人',
        'train_price': 100,
      },
      {
        'interest_count': '12',
        'train_name': '游泳培训班2',
        'description': '4-6人',
        'train_price': 200,
      },
      {
        'interest_count': '12',
        'train_name': '游泳培训班x',
        'description': '2-6人',
        'train_price': 10,
      },
      {
        'interest_count': '12',
        'train_name': '培训',
        'description': '6-10人',
        'train_price': 100,
      },
    ],
    pageNo: 1,
    pageSize: 10,
    pageCount: 1,
    totalCount: 1
  }
};

export default {
  namespace: 'coaches',
  state: {
    coachData: {
      coachesInfoDataList: [],
    },
    trainData: {
      trainListDataList: [],
      loading: true,
      hadMore: true,
      pageNo: 0,
      pageSize: 20,
      total: 0,
      totalPage: 0,
      totalCount: 0
    }
  },
  subscriptions: {
    // 培训列表
    trainList({dispatch, history}) {
      return history.listen(({pathname}) => {
        const match = pathToRegexp('/coach').exec(pathname);
        if (match) {
          dispatch({
            type: 'queryTrains',
            payload: {
              swimPoolId: 'swimPoolId',
            }
          });
        }
      });
    }
  },
  effects: {
    * queryTrains({payload: payload}, {call, put}) {
      // yield put({ // 默认为loading状态
      //   type: 'showTrainsLoading'
      // });
      const {err, data} = yield call(fetchTrainList, payload.swimPoolId);
      if (err) {// 如果接口status != 200，则用local_data假数据
        yield put({
          type: 'showTrains',
          payload: local_data
        });
      } else if (data && data.data) {
        yield put({
          type: 'showTrains',
          payload: data.data
        });
      } else {
        yield put({
          type: 'showTrains', // 如果array length==0
        });
      }
    }
  },
  reducers: {
    showCoaches(state, action) {
      const dataSource = action.payload.data;
      return {...state, ...dataSource};
    },
    showTrains(state, action) {
      let result = action.payload.data;
      let dataSource = [];
      if (result && result.dataList.length > 0) {
        dataSource = state.trainData.trainListDataList.concat(result.dataList);
      }
      return {...state, trainData: {...state.trainData, trainListDataList: dataSource, loading: false}};
    },
    // showTrainsLoading(state) {
    //   return {...state, trainData: {...state.trainData, loading: true}};
    // },
  }
}
