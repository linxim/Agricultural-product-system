'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ShoppingSchema = new Schema({
    // 商品id
    id: { type: String },
    // 用户名字
    username: { type: String },
    // 商品名
    name: { type: String },
    // 商品图片
    Img: { type: String },
    // 收货地址
    address: { type: String },
    // 数量
    number: { type: Number },
    // 单价
    UnitPrice: { type: Number },
    // 总价格
    Price: { type: Number },
    // 当前状态
    state: { type: String },
    // 状态码
    status: { type: Number, default: 1 },
    // 订单时间
    date: { type: Date, default: Date.now },
  });
  return mongoose.model('Shopping', ShoppingSchema);
};
