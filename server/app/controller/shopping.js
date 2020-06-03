'use strict';

const Controller = require('egg').Controller;

class shoopingController extends Controller {
  // 购物车列表
  async list() {
    const { ctx } = this;
    const res = await ctx.service.shopping.list(ctx.request.body);
    ctx.response.body = res;
  }
  // 删除购物车
  async delete() {
    const { ctx } = this;
    const res = await ctx.service.shopping.delete(ctx.request.body);
    ctx.response.body = res;
  }
  // 修改购物车
  async update() {
    const { ctx } = this;
    const res = await ctx.service.shopping.update(ctx.request.body);
    ctx.response.body = res;
  }
  // 添加购物车
  async add() {
    const { ctx } = this;
    const res = await ctx.service.shopping.add(ctx.request.body);
    ctx.response.body = res;
  }
}

module.exports = shoopingController;
