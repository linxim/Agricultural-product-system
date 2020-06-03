'use strict';
const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
class administratorService extends Service {
  // 登录
  async login(data) {
    console.log(data.passwd);
    const { ctx } = this;
    const res = await ctx.model.Administrator.find({
      username: data.username,
    }, { _id: 1, username: 1, headerimg: 1, telephone: 1, passwd: 1 }).then(res => {
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
  // 注册
  async reg(data) {
    const { ctx } = this;
    const res = await ctx.model.Administrator.find({
      username: data.username,
      passwd: data.passwd,
    });
    if (res.length) {
      return {
        code: 0,
        msg: '账号已存在',
      };
    } else if (res.length === 0) {
      // eslint-disable-next-line no-unused-vars
      return ctx.model.Administrator.create(data).then(res => {
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
  // 头像上传
  async headerimg(data) {
    const dest = '/public/upload/headerimg';
    const file = data.file[0];
    const to = path.dirname(__dirname) + dest + path.basename(file.filepath);
    await fs.copyFileSync(file.filepath, to);
    fs.unlinkSync(file.filepath);
    const cluster = this.app.config.cluster.listen;
    return `http://localhost:${cluster.port}${dest}${path.basename(file.filepath)}`;
  }
  // 信息修改
  async update(data) {
    const { ctx } = this;
    const res = ctx.model.Administrator.updateOne({ _id: data.id },
      {
        $set: {
          username: data.username,
          telephone: data.telephone,
          headerimg: data.headerimg,
        },
      }).then(() => {
      return {
        msg: '修改成功',
        code: 1,
      };
    }).catch(() => {
      return {
        msg: '修改失败',
        code: 0,
      };
    });
    return res;
  }
}
module.exports = administratorService;
