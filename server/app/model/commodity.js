'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const commoditySchema = new Schema({
    // 商品名称
    name: { type: String },
    // 厂家地址
    address: { type: String },
    // 图片
    picture: { type: Object },
    // 数量
    number: { type: Number },
    // 净含量
    NetContent: { type: Number },
    // 单价
    Price: { type: String },
    // 商品类型
    Commoditytype: { type: String },
    // 厂家联系方式
    Phonenumber: { type: String },
    // 销售类型
    Salestype: { type: String },
    // 保质期
    quality: { type: String },
    // 状态码
    status: { type: Number, default: 1 },
    // 时间
    date: { type: Date, default: Date.now },
  });
  return mongoose.model('commodity', commoditySchema, 'commoditys');
};
