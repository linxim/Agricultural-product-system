'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  // 订单列表
  async find() {
    const { ctx } = this;
    const res = await ctx.service.page.find(ctx.request.body);
    ctx.response.body = res;
  }
}

module.exports = OrderController;
