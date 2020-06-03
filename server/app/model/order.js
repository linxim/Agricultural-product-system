'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const OrderSchema = new Schema({
    // 订单人
    OrderPerson: { type: String },
    // 商品图片
    Img: { type: String },
    // 商品名称
    name: { type: String },
    // 收货地址
    address: { type: String },
    // 数量
    number: { type: Number },
    // 单价
    UnitPrice: { type: Number },
    // 总价格
    Price: { type: Number },
    // 厂家联系方式
    Phonenumber: { type: String },
    // 当前状态
    state: { type: String, default: ' 待发货' },
    // 状态码
    status: { type: Number, default: 1 },
    // 订单时间
    date: { type: Date, default: Date.now },
  });
  return mongoose.model('order', OrderSchema);
};
