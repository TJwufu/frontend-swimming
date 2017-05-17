'use strict';

const qs = require('qs');
const mockjs = require('mockjs');

// 数据持久
let poolListData = {};
if (!global.poolListData) {
  const data = mockjs.mock({
    'data|50': [{
      'id|+1': 1,
      name: '@cname',
      img:'http://img.xskhome.com/pic/2016/news/20160524/191010_3721317444.png',
      'price|11-99': 1,
      'distance|11-99': 1,
      'rating|1-5':1,
      'status|1-2':1,
      address: '@region'
    }],
    page: {
      total: 50,
      current: 1
    }
  });
  poolListData = data;
  global.poolListData = poolListData;
} else {
  poolListData = global.poolListData;
}

module.exports = {

  'GET /api/pools' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.pageNo || 1;

    let data;
    let newPage;
    let newData = poolListData.data.concat();
    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(page.keyword) > -1;
      });

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      newPage = {
        current: currentPage * 1,
        total: d.length
      };
    } else {
      data = poolListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      poolListData.page.current = currentPage * 1;
      newPage = {
        current: poolListData.page.current,
        total: poolListData.page.total
      };
    }

    setTimeout(function () {
      res.json({
        success: true,
        data,
        page: newPage
      });
    },500);
  }

};
