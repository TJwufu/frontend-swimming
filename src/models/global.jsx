export default {
  namespace: 'global',
  state: {
    currentTabBarIndex : 1,
    navTitle : "首页"
  },
  subscriptions: {},
  effects: {},
  reducers: {
    changeTabBarIndex(state, action) {
      return { ...state, ...action.payload };
    }
  }
}
