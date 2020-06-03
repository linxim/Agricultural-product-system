'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录接口
  async login() {
    const { ctx } = this;
    const res = await ctx.service.user.login(ctx.request.body);
    ctx.response.body = res;
  }
  // 注册接口
  async reg() {
    const { ctx } = this;
    const res = await ctx.service.user.reg(ctx.request.body);
    ctx.response.body = res;
  }
  // 用户列表
  async list() {
    const { ctx } = this;
    const res = await ctx.service.user.list(ctx.request.body);
    ctx.response.body = res;
  }
  // 用户头像上传
  async upheadimg() {
    const { ctx } = this;
    const res = await ctx.service.user.upheadimg(ctx.request);
    ctx.response.body = res;
  }
  // 用户删除
  async delete() {
    const { ctx } = this;
    const res = await ctx.service.user.delete(ctx.request.body);
    ctx.response.body = res;
  }
  async update() {
    const { ctx } = this;
    const res = await ctx.service.user.update(ctx.request.body);
    ctx.response.body = res;
  }
  async orderlist() {
    const { ctx } = this;
    const res = await ctx.service.user.orderlist(ctx.request.body);
    ctx.response.body = res;
  }
  async find() {
    const { ctx } = this;
    const res = await ctx.service.user.find(ctx.request.body);
    ctx.response.body = res;
  }
}

module.exports = UserController;
