'use strict';
const Service = require('egg').Service;

class OrderService extends Service {
  // 用户列表
  async find(data) {
    const { ctx } = this;
    return ctx.model.Commodity.find({ Commoditytype: data.Commoditytype }).then(res => {
      return res;
    }).catch(error => {
      console.log(error);
      return {
        code: -1,
        msg: '查找失败',
      };
    });
  }
}
module.exports = OrderService;
