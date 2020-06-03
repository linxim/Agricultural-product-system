'use strict';
const Controller = require('egg').Controller;
class ComodityControler extends Controller {
  async upimg() {
    const { ctx } = this;
    const res = await ctx.service.commodity.upimg(ctx.request);
    ctx.response.body = res;
  }
  async add() {
    const { ctx } = this;
    const res = await ctx.service.commodity.add(ctx.request.body);
    ctx.response.body = res;
  }
  async list() {
    const { ctx } = this;
    const res = await ctx.service.commodity.list(ctx.request.body);
    ctx.response.body = res;
  }
  async delete() {
    const { ctx } = this;
    const res = await ctx.service.commodity.delete(ctx.request.body);
    ctx.response.body = res;
  }
  async update() {
    const { ctx } = this;
    const res = await ctx.service.commodity.update(ctx.request.body);
    ctx.response.body = res;
  }
  async Stock() {
    const { ctx } = this;
    const res = await ctx.service.commodity.Stock(ctx.request.body);
    ctx.response.body = res;
  }
}
module.exports = ComodityControler;
