'use strict';
const Service = require('egg').Service;

class OrderService extends Service {
  // 订单列表
  async list() {
    const { ctx } = this;
    return ctx.model.Order.find({ status: 1 }).then(res => {
      return res;
    }).catch(error => {
      console.log(error);
      return {
        code: -1,
        msg: '查找失败',
      };
    });
  }
  // 订单删除
  async delete(data) {
    const { ctx } = this;
    const res = ctx.model.Order.updateOne({ _id: data.id }, { $set: { status: 0 } }).then(() => {
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
  // 订单信息修改
  async update(data) {
    const { ctx } = this;
    const res = ctx.model.Order.updateOne({ _id: data.id },
      { $set: {
        OrderPerson: data.OrderPerson,
        name: data.name,
        address: data.address,
        number: data.number,
        UnitPrice: data.UnitPrice,
        Price: data.Price,
        Phonenumber: data.Phonenumber,
        state: data.state,
      } }).then(() => {
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
  // 订单添加
  async add(data) {
    const { ctx } = this;
    const add = ctx.model.Order.create(data).then(() => {
      return {
        code: 1,
        msg: '购买成功！',
      };
    }).catch(error => {
      console.log(error);
      return {
        code: 0,
        msg: '购买失败！',
      };
    });
    return add;
  }
  async userlist(data) {
    const { ctx } = this;
    return ctx.model.Order.find({ OrderPerson: data.OrderPerson, status: 1 }).then(res => {
      return res;
    }).catch(error => {
      console.log(error);
      return {
        code: -1,
        msg: '查找失败',
      };
    });
  }
  // 订单状态查询
  async type(data) {
    console.log(data);
    const { ctx } = this;
    return ctx.model.Order.find({ OrderPerson: data.username, state: data.state, status: 1 }).then(res => {
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
