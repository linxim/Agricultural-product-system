'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
  // 订单列表
  async list() {
    const { ctx } = this;
    const res = await ctx.service.order.list(ctx.request.body);
    ctx.response.body = res;
  }
  // 删除订单
  async delete() {
    const { ctx } = this;
    const res = await ctx.service.order.delete(ctx.request.body);
    ctx.response.body = res;
  }
  // 修改订单
  async update() {
    const { ctx } = this;
    const res = await ctx.service.order.update(ctx.request.body);
    ctx.response.body = res;
  }
  // 添加订单
  async add() {
    const { ctx } = this;
    const res = await ctx.service.order.add(ctx.request.body);
    ctx.response.body = res;
  }
  async userlist() {
    const { ctx } = this;
    const res = await ctx.service.order.userlist(ctx.request.body);
    ctx.response.body = res;
  }
  async type() {
    const { ctx } = this;
    const res = await ctx.service.order.type(ctx.request.body);
    ctx.response.body = res;
  }
}

module.exports = OrderController;
