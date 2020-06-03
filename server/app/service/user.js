'use strict';
const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

class UserService extends Service {
  // 用户登录
  async login(data) {
    const { ctx } = this;
    const res = await ctx.model.User.find({
      username: data.username,
      status: 1,
    }, { _id: 1, username: 1, passwd: 1, cname: 1, address: 1, headerimg: 1 }).then(res => {
      if (!res.length) {
        return {
          code: -1,
          msg: '账号不存在',
        };
      } else if (res[0].passwd !== data.passwd) {
        return {
          code: -2,
          msg: '密码不正确',
        };
      } else if (res[0].passwd === data.passwd) {
        return {
          code: 1,
          msg: '登录成功',
          array: res,
        };
      }
    });
    return res;
  }
  // 用户注册
  async reg(data) {
    const { ctx } = this;
    console.log(data);
    const res = await ctx.model.User.find({
      username: data.username,
      passwd: data.passwd,
      status: 1,
    });
    if (res.length) {
      return {
        code: 0,
        msg: '账号已存在',
      };
    } else if (res.length === 0) {
      // eslint-disable-next-line no-unused-vars
      return ctx.model.User.create(data).then(res => {
        return {
          code: 1,
          msg: '注册成功',
        };
      // eslint-disable-next-line no-unused-vars
      }).catch(error => {
        return {
          code: 0,
          msg: '注册失败',
        };
      });
    }
  }
  // 用户列表
  async list() {
    const { ctx } = this;
    return ctx.model.User.find({ status: 1 }).then(res => {
      return res;
    }).catch(error => {
      console.log(error);
      return {
        code: -1,
        msg: '查找失败',
      };
    });
  }
  // 头像上传
  async upheadimg(data) {
    const dest = '/public/upload/headerimg/';
    const file = data.files[0];
    const to = path.dirname(__dirname) + dest + path.basename(file.filepath);
    await fs.copyFileSync(file.filepath, to);
    fs.unlinkSync(file.filepath);
    const cluster = this.app.config.cluster.listen;
    return `http://localhost:${cluster.port}${dest}${path.basename(file.filepath)}`;
  }
  // 用户删除
  async delete(data) {
    const { ctx } = this;
    const res = ctx.model.User.updateOne({ _id: data.id }, { $set: { status: 0 } }).then(() => {
      return {
        msg: '删除成功',
        code: 1,
      };
    }).catch(error => {
      console.log(error);
      return {
        msg: '删除失败',
        code: 0,
      };
    });
    return res;
  }
  // 用户信息修改
  async update(data) {
    console.log(data);
    const { ctx } = this;
    const res = ctx.model.User.updateMany({ _id: data.id },
      { $set: {
        username: data.username,
        passwd: data.passwd,
        address: data.address,
        cname: data.cname,
        telephone: data.telephone,
        headerimg: data.headerimg,
      } }).then(res => {
      console.log(res);
      return {
        msg: '修改成功',
        code: 1,
      };
    }).catch(error => {
      console.log(error);
      return {
        msg: '修改失败',
        code: 0,
      };
    });
    return res;
  }
  // 用户自己登录之后查看自己订单
  async orderlist(data) {
    const { ctx } = this;
    const res = ctx.model.Order.find({
      OrderPerson: data.username,
      status: 1 }).then(res => {
      return res;
    }).catch(error => {
      console.log(error);
      return {
        code: -1,
        msg: '查找失败',
      };
    });
    return res;
  }
  async find(data) {
    const { ctx } = this;
    return ctx.model.User.find({ _id: data.id, status: 1 }).then(res => {
      console.log(res);
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
module.exports = UserService;
