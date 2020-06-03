'use strict';

const Controller = require('egg').Controller;

class administratorController extends Controller {
  // 登录接口
  async login() {
    const { ctx } = this;
    const res = await ctx.service.administrator.login(ctx.request.body);
    ctx.response.body = res;
  }
  // 注册接口
  async reg() {
    const { ctx } = this;
    const res = await ctx.service.administrator.reg(ctx.request.body);
    ctx.response.body = res;
  }
  // 信息修改
  async update() {
    const { ctx } = this;
    const res = await ctx.service.administrator.update(ctx.request.body);
    ctx.response.body = res;
  }
}

module.exports = administratorController;
