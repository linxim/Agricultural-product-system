'use strict';
const Service = require('egg').Service;

class ShopingService extends Service {
  // 购物车列表
  async list(data) {
    const { ctx } = this;
    return ctx.model.Shopping.find({ username: data.username, status: 1 }).then(res => {
      return res;
    }).catch(error => {
      console.log(error);
      return {
        code: -1,
        msg: '购物车为空',
      };
    });
  }
  // 购物车删除
  async delete(data) {
    const { ctx } = this;
    const res = ctx.model.Shopping.updateOne({ _id: data._id }, { $set: { status: 0 } }).then(() => {
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
  // 购物车信息修改
  async update(data) {
    const { ctx } = this;
    const res = ctx.model.Shopping.updateOne({ _id: data._id },
      { $set: {
        address: data.address,
        number: data.number,
        Price: data.Price,
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
  // 购物车添加
  async add(data) {
    const { ctx } = this;
    return ctx.model.Shopping.create(data).then(() => {
      return {
        code: 1,
        msg: '添加成功！',
      };
    }).catch(error => {
      console.log(error);
      return {
        code: 0,
        msg: '添加失败！',
      };
    });
  }
}
module.exports = ShopingService;
